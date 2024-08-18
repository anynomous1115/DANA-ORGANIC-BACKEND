const { default: mongoose } = require("mongoose");
const Customer = require("../../models/customers.model");
const Location = require("../../models/locations.model");
const OrderProduct = require("../../models/orders-products.model");
const Order = require("../../models/orders.model");
const PaymentMethod = require("../../models/paymentMethods.model");
const Product = require("../../models/products.model");

const getAllOrdersService = async (page, limit) => {
  const startIndex = (page - 1) * limit;
  const orders = await Order.find().skip(startIndex).limit(limit).exec();
  if (orders.length === 0) {
    throw { message: "Orders not found!", code: 404 };
  }
  const data = await Promise.all(
    orders.map(async (order) => {
      const { customerId, locationId, paymentMethodId } = order;
      const customer = await Customer.findById(customerId);
      const location = await Location.findById(locationId);
      const paymentMethod = await PaymentMethod.findById(paymentMethodId);
      const orderProducts = await OrderProduct.find({ orderId: order._id });
      const products = orderProducts.map(async (orderProduct) => {
        const { productId } = orderProduct;
        const product = await Product.findById(productId);
        return {
          ...product.toObject(),
        };
      });
      return {
        ...order.toObject(),
        customer: {
          fullname: customer.fullname,
          email: customer.email,
          phone: customer.phone,
        },
        location: {
          address: location.address,
        },
        paymentMethod: paymentMethod,
        orderProducts: orderProducts,
        productName: products.productName,
      };
    })
  );
  return data;
};

const getOrderByIdService = async (id) => {
  const order = await Order.findById(id).exec();
  if (!order) {
    throw { message: "Order not found!", code: 404 };
  }

  const { customerId, locationId, paymentMethodId } = order;

  const [customer, location, paymentMethod, orderProducts] = await Promise.all([
    Customer.findById(customerId),
    Location.findById(locationId),
    PaymentMethod.findById(paymentMethodId),
    OrderProduct.find({ orderId: order._id }),
  ]);

  const productPromises = orderProducts.map(async (orderProduct) => {
    const { productId } = orderProduct;
    const product = await Product.findById(productId);
    return {
      ...product.toObject(),
    };
  });
  const products = await Promise.all(productPromises);

  return {
    ...order.toObject(),
    customer: {
      fullname: customer.fullname,
      email: customer.email,
      phone: customer.phone,
    },
    location: {
      address: location.address,
    },
    paymentMethod,
    orderProducts,
    products,
  };
};


const updateOrderStatusService = async (id, status) => {
  const newOrderStatus = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!newOrderStatus) {
    throw { message: "Order not found!", code: 404 };
  }
  return newOrderStatus;
};

module.exports = {
  getAllOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
};

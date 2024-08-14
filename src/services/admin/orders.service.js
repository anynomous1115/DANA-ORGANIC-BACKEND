const { default: mongoose } = require("mongoose");
const Customer = require("../../models/customers.model");
const Location = require("../../models/locations.model");
const OrderProduct = require("../../models/orders-products.model");
const Order = require("../../models/orders.model");
const PaymentMethod = require("../../models/paymentMethods.model");
const Product = require("../../models/products.model");
const { accessKey, secretKey, partnerCode } = require("../../configs/momo");
const crypto = require("crypto");
const axios = require("axios");
const config = require("../../configs/momo");
const configMomo = require("../../configs/momo");
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
  return order;
};

const updateOrderService = async (id, order) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    {
      $set: {
        subTotal: order.subTotal,
        note: order.note,
      },
    },
    {
      new: true,
    }
  );
  if (!updatedOrder) {
    throw { message: "Order not found!", code: 404 };
  }
  return updatedOrder;
};

const updateOrderStatusService = async (id, status) => {
  const updatedOrder = await Order.findByIdAndUpdate(
    id,
    { status },
    { new: true }
  );
  if (!updatedOrder) {
    throw { message: "Order not found!", code: 404 };
  }
  return updatedOrder;
};

// const deleteOrderService = async (id) => {
//   const deletedOrder = await Order.findByIdAndDelete(id);
//   if (!deletedOrder) {
//     throw { message: "Order not found!", code: 404 };
//   }
//   const objectId = new mongoose.Types.ObjectId(id);
//   const orderProducts = await OrderProduct.find({
//     orderId: id,
//   });
//   if (orderProducts.length > 0) {
//     await OrderProduct.deleteMany({ orderId: objectId });
//   }
//   return deletedOrder;
// };

// payOrderService

module.exports = {
  getAllOrdersService,
  getOrderByIdService,

  updateOrderService,
  // deleteOrderService,
  updateOrderStatusService,
};

const configMomo = require("../../configs/momo");
const Cart = require("../../models/carts.model");
const Customer = require("../../models/customers.model");
const Location = require("../../models/locations.model");
const OrderProduct = require("../../models/orders-products.model");
const Order = require("../../models/orders.model");
const PaymentMethod = require("../../models/paymentMethods.model");
const ProductCart = require("../../models/products-carts.model");
const Product = require("../../models/products.model");
const axios = require("axios");
const crypto = require("crypto");

const getInfoOrderService = async (customerId) => {
  const cart = await Cart.findOne({ customerId: customerId });
  const infoCustomer = await Customer.findById(customerId).select("-password");
  const location = await Location.findById(customerId);
  const productCarts = await ProductCart.find({ cartId: cart._id });
  const paymentMethod = await PaymentMethod.find();
  let subTotal = 0;
  await Promise.all(
    productCarts.map(async (productCart) => {
      subTotal += productCart.price * productCart.quantity;
    })
  );
  const productsCarts = await Promise.all(
    productCarts.map(async (productCart) => {
      const product = await Product.findById(productCart.productId);
      return {
        productName: product.productName,
        productPrice: product.price,
        productQuantity: productCart.quantity,
        productId: product._id,
        totalPrice: productCart.price * productCart.quantity,
      };
    })
  );

  return {
    infoCustomer,
    location,
    paymentMethod,
    subTotal,
    productsCarts,
  };
};

const createOrderService = async (order, customerId) => {
  const { subTotal, note, address, paymentMethodId } = order;
  console.log(subTotal);

  const newOrder = new Order();
  const location = await Location.create({
    customerId: customerId,
    address: address,
  });
  console.log(paymentMethodId);

  newOrder.customerId = customerId;
  newOrder.locationId = location._id;
  newOrder.paymentMethodId = paymentMethodId;
  newOrder.subTotal = subTotal;
  newOrder.note = note;

  await newOrder.save();

  const cart = await Cart.findOne({ customerId: customerId });
  const productCarts = await ProductCart.find({ cartId: cart._id });
  await Promise.all(
    productCarts.map(async (productCart) => {
      const { productId, quantity } = productCart;
      // get product
      const product = await Product.findById(productId);
      const orderProduct = new OrderProduct();
      orderProduct.orderId = newOrder._id;
      orderProduct.productId = productId;
      orderProduct.quantity = quantity;
      // totalPrice
      orderProduct.totalPrice = quantity * product.price;
      await orderProduct.save();
    })
  );
  await ProductCart.deleteMany({ cartId: cart._id });
  return newOrder;
};

const payOrderService = async (orderId) => {
  const order = await Order.findById(orderId);
  const { subTotal } = order;
  let amount = subTotal;
  console.log(amount);

  let accessKey = "F8BBA842ECF85";
  let secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  let partnerCode = "MOMO";
  let ipnUrl = `https://f5fd-14-191-113-247.ngrok-free.app/v1/orders/momo/callback`;
  let app_trans_id = partnerCode + new Date().getTime();
  let redirectUrl = `http://localhost:3000/order/payment?orderId=${orderId}&orderIdpayment=${app_trans_id}`;
  let orderInfo = `Oganic for the order ${app_trans_id} with MoMo`;
  let requestId = app_trans_id;
  let requestType = "payWithMethod";
  let extraData = "";
  let orderGroupId = "";
  let autoCapture = true;
  let lang = "vi";

  let createOrder = await Order.findOne({ _id: orderId });

  if (createOrder) {
    createOrder.id_payment = app_trans_id;
    await createOrder.save();
  }

  let rawSignature =
    "accessKey=" +
    accessKey +
    "&amount=" +
    amount +
    "&extraData=" +
    extraData +
    "&ipnUrl=" +
    ipnUrl +
    "&orderId=" +
    app_trans_id +
    "&orderInfo=" +
    orderInfo +
    "&partnerCode=" +
    partnerCode +
    "&redirectUrl=" +
    redirectUrl +
    "&requestId=" +
    requestId +
    "&requestType=" +
    requestType;

  //signature
  let signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  //json object send to MoMo endpoint
  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    partnerName: "Test",
    storeId: "MomoTestStore",
    requestId: requestId,
    amount: amount,
    orderId: app_trans_id,
    orderInfo: orderInfo,
    redirectUrl: redirectUrl,
    ipnUrl: ipnUrl,
    lang: lang,
    requestType: requestType,
    autoCapture: autoCapture,
    extraData: extraData,
    orderGroupId: orderGroupId,
    signature: signature,
  });

  // options for axios
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/create",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": Buffer.byteLength(requestBody),
    },
    data: requestBody,
  };
  let result;
  try {
    result = await axios(options);
    return result.data;
  } catch (error) {
    return error.message;
  }
};

const payOrderServiceCallback = async (data) => {
  console.log(data);

  const createOrder = await Order.findOne({
    id_payment: data.orderIdpayment,
  });
  if (createOrder) {
    createOrder.status = 2;
    await createOrder.save();
  }
  return data;
};
const payOrderServiceCheck = async (orderId) => {
  let partnerCode = "MOMO";
  let accessKey = configMomo.accessKey;
  let secretKey = configMomo.secretKey;
  const rawSignature = `accessKey=${accessKey}&orderId=${orderId}&partnerCode=${partnerCode}&requestId=${orderId}`;

  const signature = crypto
    .createHmac("sha256", secretKey)
    .update(rawSignature)
    .digest("hex");

  const requestBody = JSON.stringify({
    partnerCode: partnerCode,
    requestId: orderId,
    orderId: orderId,
    signature: signature,
    lang: "vi",
  });

  // options for axios
  const options = {
    method: "POST",
    url: "https://test-payment.momo.vn/v2/gateway/api/query",
    headers: {
      "Content-Type": "application/json",
    },
    data: requestBody,
  };

  const result = await axios(options);
  return result.data;
};
module.exports = {
  createOrderService,
  payOrderService,
  payOrderServiceCallback,
  payOrderServiceCheck,
  getInfoOrderService,
};

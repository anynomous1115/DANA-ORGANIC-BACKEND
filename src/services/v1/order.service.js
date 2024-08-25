const OrderProduct = require("../../models/orders-products.model");
const Order = require("../../models/orders.model");
const PaymentMethod = require("../../models/paymentMethods.model");
const Product = require("../../models/products.model");
const axios = require("axios");
const createOrderService = async (order) => {
  const {
    orderItems,
    subTotal,
    note,
    customerId,
    locationId,
    paymentMethodId,
    status,
    paymentStatus,
  } = order;
  const newOrder = new Order();

  // get location by name
  const paymentMethod = await PaymentMethod.findOne({
    nameMethod: paymentMethodId,
  });

  newOrder.customerId = customerId;
  console.log(1234);

  newOrder.locationId = locationId;
  newOrder.paymentMethodId = paymentMethod._id;
  newOrder.subTotal = subTotal;
  newOrder.status = status;
  newOrder.note = note;
  newOrder.paymentStatus = paymentStatus;

  await newOrder.save();

  await Promise.all(
    orderItems.map(async (orderItem) => {
      const { productId, quantity } = orderItem;
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

  return newOrder;
};

const payOrderService = async (amount, orderId, paymentMethod) => {
  let accessKey = "F8BBA842ECF85";
  let secretKey = "K951B6PE1waDMi640xX08PD3vg6EkVlz";
  let partnerCode = "MOMO";
  let ipnUrl = `https://f5fd-14-191-113-247.ngrok-free.app/v1/orders/momo/callback`;
  let app_trans_id = partnerCode + new Date().getTime();
  let redirectUrl = `http://localhost:3000/order/payment?orderId=${app_trans_id}&paymentMethod=${paymentMethod}&orderIdpayment=${app_trans_id}`;
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
  if (data.resultCode === 0) {
    const createOrder = await Order.findOne({
      id_payment: data.orderId,
    });
    if (createOrder) {
      createOrder.paymentStatus = "success";
      createOrder.status = true;
      await createOrder.save();
    }
  } else {
    const createOrder = await Order.findOne({
      $where: { id_payment: data.orderId },
    });
    if (createOrder) {
      createOrder.paymentStatus = "fail";
      await createOrder.save();
    }
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
};

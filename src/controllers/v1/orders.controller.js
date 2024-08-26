const { successHandler, errorHandler } = require("../../helper/response");
const {
  createOrderService,
  payOrderService,
  payOrderServiceCallback,
  payOrderServiceCheck,
  getInfoOrderService,
} = require("../../services/v1/order.service");

const getInfoOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const infoOrder = await getInfoOrderService(_id);
    successHandler(res, infoOrder, "Order fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const createOrder = async (req, res) => {
  try {
    const { _id } = req.user;
    const order = req.body;
    const createdOrder = await createOrderService(order, _id);
    successHandler(res, createdOrder, "Order created successfully!", 201);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

const paymenMomo = async (req, res) => {
  try {
    const { orderId } = req.body;
    const updatedOrder = await payOrderService(orderId);
    successHandler(
      res,
      updatedOrder,
      "Order status updated successfully!",
      200
    );
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};
const paymentCallback = async (req, res) => {
  try {
    await payOrderServiceCallback(req.body);
    res.send("Payment received successfully !");
  } catch (error) {
    errorHandler(res, error);
  }
};
const paymentCheck = async (req, res) => {
  try {
    const { orderId } = req.body;
    console.log(orderId);
    const data = await payOrderServiceCheck(orderId);
    console.log(data);
    successHandler(res, data, "Order status updated successfully", 200);
  } catch (error) {
    console.log(error);
    errorHandler(res, error);
  }
};

module.exports = {
  createOrder,
  paymenMomo,
  paymentCallback,
  paymentCheck,
  getInfoOrder,
  // deleteOrder,
};

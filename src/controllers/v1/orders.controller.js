const { successHandler, errorHandler } = require("../../helper/response");
const {
  createOrderService,
  payOrderService,
  payOrderServiceCallback,
  payOrderServiceCheck,
} = require("../../services/v1/order.service");

const createOrder = async (req, res) => {
  try {
    const order = req.body;
    const createdOrder = await createOrderService(order);
    successHandler(res, createdOrder, "Order created successfully!", 201);
  } catch (error) {
    errorHandler(res, error);
  }
};

const paymenMomo = async (req, res) => {
  try {
    const { amount, paymentMethod, orderId } = req.body;
    if (amount < 1) {
      throw { message: "Amount must be greater than 0", code: 400 };
    }
    const updatedOrder = await payOrderService(amount, orderId, paymentMethod);
    successHandler(
      res,
      updatedOrder,
      "Order status updated successfully!",
      200
    );
  } catch (error) {
    errorHandler(res, error);
  }
};
const paymentCallback = async (req, res) => {
  try {
    console.log("callback");
    await payOrderServiceCallback(req.body);
    res.send("Payment received successfully !");
  } catch (error) {
    errorHandler(res, error);
  }
};
const paymentCheck = async (req, res) => {
  try {
    const { orderId } = req.body;
    const data = await payOrderServiceCheck(orderId);
    successHandler(res, data, "Order status updated successfully", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  createOrder,
  paymenMomo,
  paymentCallback,
  paymentCheck,
  // deleteOrder,
};

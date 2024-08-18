const { successHandler, errorHandler } = require("../../helper/response");
const {
  getAllOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
} = require("../../services/admin/orders.service");
const { paginate } = require("../../utils/pagination");

const getAllOrders = async (req, res) => {
  try {
    const paginate = await paginate(req);
    const orders = await getAllOrdersService(
      paginate.startIndex,
      paginate.limit
    );
    successHandler(res, orders, "Orders fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getOrderById = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = await getOrderByIdService(orderId);
    successHandler(res, order, "Order fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const orderId = req.params.id;
    const order = req.body;
    const updatedOrder = await updateOrderStatusService(orderId, order);
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

module.exports = {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
};

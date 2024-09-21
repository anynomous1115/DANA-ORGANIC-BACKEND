const { successHandler, errorHandler } = require("../../helper/response");
const {
  getAllOrdersService,
  getOrderByIdService,
  updateOrderStatusService,
} = require("../../services/admin/orders.service");
const { paginateUtil } = require("../../utils/pagination");

const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const { data, totalCount } = await getAllOrdersService(page, limit);
    console.log(data);
    const paginate = await paginateUtil(req, totalCount);
    successHandler(
      res,
      {
        paginate,
        data,
      },
      "Orders fetched successfully!",
      200
    );
  } catch (error) {
    console.log(error);
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

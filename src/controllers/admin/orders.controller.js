const { successHandler, errorHandler } = require("../../helper/response");
const {
  getAllOrdersService,
  getOrderByIdService,
  updateOrderService,
  updateOrderStatusService,
  deleteOrderService,
} = require("../../services/admin/orders.service");

const getAllOrders = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const orders = await getAllOrdersService(page, limit);
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

// const createOrder = async (req, res) => {
//   try {
//     const order = req.body;
//     const createdOrder = await createOrderService(order);
//     successHandler(res, createdOrder, "Order created successfully!", 201);
//   } catch (error) {
//     errorHandler(res, error);
//   }
// };

// const updateOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const order = req.body;
//     const updatedOrder = await updateOrderService(orderId, order);
//     successHandler(res, updatedOrder, "Order updated successfully!", 200);
//   } catch (error) {
//     errorHandler(res, error);
//   }
// };

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

// const deleteOrder = async (req, res) => {
//   try {
//     const orderId = req.params.id;
//     const deletedOrder = await deleteOrderService(orderId);
//     successHandler(res, deletedOrder, "Order deleted successfully!", 200);
//   } catch (error) {
//     errorHandler(res, error);
//   }
// };

module.exports = {
  getAllOrders,
  getOrderById,
  // createOrder,
  // updateOrder,
  updateOrderStatus,
  // deleteOrder,
};

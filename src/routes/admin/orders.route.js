const express = require("express");
const {
  getAllOrders,
  getOrderById,
  // createOrder,
  // deleteOrder,
  updateOrderStatus,
  // updateOrder,
} = require("../../controllers/admin/orders.controller");
const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
// router.post("/", createOrder);
// router.put("/:id", updateOrder);
router.put("/:id/status", updateOrderStatus);
// router.delete("/:id", deleteOrder);

module.exports = router;

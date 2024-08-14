const express = require("express");
const {
  getAllOrders,
  getOrderById,

  // deleteOrder,
  updateOrderStatus,
  paymenMomo,
  paymentCallback,
  paymentCheck,
  createOrder,
  // updateOrder,
} = require("../../controllers/admin/orders.controller");
const router = express.Router();

router.get("/", getAllOrders);
router.get("/:id", getOrderById);
router.post("/", createOrder);
// router.put("/:id", updateOrder);
router.put("/:id/status", updateOrderStatus);
// router.delete("/:id", deleteOrder);
router.post("/momo", paymenMomo);
router.post("/momo/callback", paymentCallback);
router.post("/momo/check", paymentCheck);
module.exports = router;

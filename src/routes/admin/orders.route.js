const express = require("express");
const {
  getAllOrders,
  getOrderById,
  updateOrderStatus,
} = require("../../controllers/admin/orders.controller");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const router = express.Router();

router.get("/",checkAuth, authorize(role.admin), getAllOrders);
router.get("/:id",checkAuth, authorize(role.admin), getOrderById);
router.put("/:id/status",checkAuth, authorize(role.admin), updateOrderStatus);

module.exports = router;

const express = require("express");
const {
  paymenMomo,
  createOrder,
  paymentCallback,
  paymentCheck,
  getInfoOrder,
} = require("../../controllers/v1/orders.controller");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");

const router = express.Router();

router.get("/", checkAuth, authorize(role.customer), getInfoOrder);
router.post("/", checkAuth, authorize(role.customer), createOrder);
router.post("/momo", checkAuth, authorize(role.customer), paymenMomo);
router.post(
  "/momo/callback",
  checkAuth,
  authorize(role.customer),
  paymentCallback
);
router.post("/momo/check", checkAuth, authorize(role.customer), paymentCheck);
module.exports = router;

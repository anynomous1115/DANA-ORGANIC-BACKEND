const express = require("express");
 const { paymenMomo, createOrder, paymentCallback, paymentCheck } = require("../../controllers/v1/orders.controller");
  
const router = express.Router();

router.post("/", createOrder);
router.post("/momo", paymenMomo);
router.post("/momo/callback", paymentCallback);
router.post("/momo/check", paymentCheck);
module.exports = router;

const express = require("express");
const router = express.Router();
const authRoute = require("./auth.route");
const ordersRoute = require("./orders.route");

router.use("/auth", authRoute);
router.use("/orders", ordersRoute);


module.exports = router;

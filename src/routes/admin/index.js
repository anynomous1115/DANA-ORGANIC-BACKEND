const express = require("express");
const router = express.Router();
const productsRoute = require("./products.route");
const authRoute = require("./auth.route");

router.use("/auth", authRoute);
router.use("/products", productsRoute);

module.exports = router;

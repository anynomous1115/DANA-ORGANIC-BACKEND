const express = require("express");
const router = express.Router();
const productsRoute = require("./products.route");
const authRoute = require("./auth.route");
const categoriesRoute = require("./categories.route");

router.use("/auth", authRoute);
router.use("/products", productsRoute);
router.use("/categories", categoriesRoute);

module.exports = router;

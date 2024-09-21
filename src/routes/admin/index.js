const express = require("express");
const router = express.Router();
const productsRoute = require("./products.route");
const authRoute = require("./auth.route");
const categoriesRoute = require("./categories.route");
const customersRoute = require("./customers.route");
const ordersRoute = require("./orders.route");
const postRoute = require("./posts.route");
const analyticsRoute = require("./analytics.route");
// const uploadRoute = require("./images.route");

router.use("/auth", authRoute);
router.use("/products", productsRoute);
router.use("/categories", categoriesRoute);
router.use("/customers", customersRoute);
router.use("/orders", ordersRoute);
router.use("/posts", postRoute);
router.use("/analytics", analyticsRoute);
// router.use("/images", uploadRoute);

module.exports = router;

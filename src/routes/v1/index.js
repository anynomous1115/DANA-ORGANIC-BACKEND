const express = require("express");
const router = express.Router();
const authRoute = require("./auth.route");
const ordersRoute = require("./orders.route");
const profileRoute = require("./profile.route");
const productsRoute = require("./products.route");
const categoriesRoute = require("./categories.route");
const postsRoute = require("./posts.route");
const commentsRoute = require("./comments.route");
const feedbacksRoute = require("./feedbacks.route");
const cartsRoute = require("./carts.route");

router.use("/auth", authRoute);
router.use("/orders", ordersRoute);
router.use("/profile", profileRoute);
router.use("/products", productsRoute);
router.use("/categories", categoriesRoute);
router.use("/posts", postsRoute);
router.use("/comments", commentsRoute);
router.use("/feedbacks", feedbacksRoute);
router.use("/carts", cartsRoute);

module.exports = router;

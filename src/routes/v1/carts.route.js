const express = require("express");
const {
  getCarts,
  createProductInCart,
  updateProductInCart,
  deleteProductInCart,
} = require("../../controllers/v1/carts.controller");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");

const router = express.Router();

router.get("/", checkAuth, authorize(role.customer), getCarts);
router.post(
  "/add-to-cart",
  checkAuth,
  authorize(role.customer),
  createProductInCart
);
router.put(
  "/update/:id",
  checkAuth,
  authorize(role.customer),
  updateProductInCart
);
router.delete(
  "/delete/:id",
  checkAuth,
  authorize(role.customer),
  deleteProductInCart
);

module.exports = router;

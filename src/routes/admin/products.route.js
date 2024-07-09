const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/admin/products.controller");
const { authenToken } = require("../../middlewares/authenToken");
const validator = require("../../middlewares/validations");
const {
  productsValidation,
} = require("../../validations/admin/products.validation");
const router = express.Router();

router.get("/", authenToken, getAllProducts);
router.get("/:id", authenToken, getProduct);
router.post("/", authenToken, validator(productsValidation), createProduct);
router.put("/:id", authenToken, validator(productsValidation), updateProduct);
router.delete("/:id", authenToken, deleteProduct);

module.exports = router;

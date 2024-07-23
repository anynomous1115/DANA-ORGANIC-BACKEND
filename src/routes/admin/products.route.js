const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/admin/products.controller");
const validator = require("../../middlewares/validations");
const {
  productsValidation,
} = require("../../validations/admin/products.validation");
const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", validator(productsValidation), createProduct);
router.put("/:id", validator(productsValidation), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

const express = require("express");
const {
  getAllCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../../controllers/admin/categories.controller");
const validator = require("../../middlewares/validations");
const {
  categoriesValidation,
} = require("../../validations/admin/categories.validation");
const router = express.Router();

router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.post("/", validator(categoriesValidation), createCategory);
router.put("/:id", validator(categoriesValidation), updateCategory);
router.delete("/:id", deleteCategory);

module.exports = router;

const express = require("express");
const { authenToken } = require("../../middlewares/authenToken");
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

router.get("/", authenToken, getAllCategories);
router.get("/:id", authenToken, getCategory);
router.post("/", authenToken, validator(categoriesValidation), createCategory);
router.put(
  "/:id",
  authenToken,
  validator(categoriesValidation),
  updateCategory
);
router.delete("/:id", authenToken, deleteCategory);

module.exports = router;

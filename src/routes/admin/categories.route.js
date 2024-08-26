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
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const router = express.Router();

router.get("/", checkAuth, authorize(role.admin), getAllCategories);
router.get("/:id", checkAuth, authorize(role.admin), getCategory);
router.post(
  "/",
  checkAuth,
  authorize(role.admin),
  validator(categoriesValidation),
  createCategory
);
router.put("/:id", checkAuth, authorize(role.admin), updateCategory);
router.delete("/:id", checkAuth, authorize(role.admin), deleteCategory);

module.exports = router;

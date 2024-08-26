const express = require("express");
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../../controllers/admin/products.controller");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const router = express.Router();

router.get("/", checkAuth, authorize(role.admin), getAllProducts);
router.get("/:id", checkAuth, authorize(role.admin), getProduct);
router.post("/", checkAuth, authorize(role.admin), createProduct);
router.put("/:id", checkAuth, authorize(role.admin), updateProduct);
router.delete("/:id", checkAuth, authorize(role.admin), deleteProduct);

module.exports = router;

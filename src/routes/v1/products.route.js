const express = require("express");
const {
  getLatestProducts,
  getAllProducts,
  getProductById,
  getSimilarProducts,
  getRecommendedProducts,
} = require("../../controllers/v1/products.controller");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const router = express.Router();

router.get(
  "/latest-products",
  getLatestProducts
);
router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/:id/similar", getSimilarProducts);

router.get(
  "/:id/recommended",
  getRecommendedProducts
);

module.exports = router;

const express = require("express");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const {
  getAllCategories,
} = require("../../controllers/v1/categories.controller");
const router = express.Router();

router.get("/", getAllCategories);

module.exports = router;

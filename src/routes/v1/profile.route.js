const express = require("express");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const {
  getProfileByCustomer,
  updateProfileByCustomer,
} = require("../../controllers/v1/profile.controller");
const router = express.Router();

router.get("/", checkAuth, authorize(role.customer), getProfileByCustomer);
router.put(
  "/update-profile",
  checkAuth,
  authorize(role.customer),
  updateProfileByCustomer
);

module.exports = router;

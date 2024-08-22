const express = require("express");
const {
  register,
  login,
  logout,
  checkUserLogin,
  resetPassword,
} = require("../../controllers/v1/auth.controller");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const validator = require("../../middlewares/validations");
const {
  registerValidation,
  loginValidation,
} = require("../../validations/auth.validation");
const role = require("../../utils/role");

const router = express.Router();

router.post("/register", validator(registerValidation), register);
router.post("/login", validator(loginValidation), login);
router.post("/logout", checkAuth, authorize(role.customer), logout);
router.post("/forgot-password");
router.post("/reset-password",checkAuth, authorize(role.customer),resetPassword);
router.get("/me", checkAuth, authorize(role.customer), checkUserLogin);

module.exports = router;

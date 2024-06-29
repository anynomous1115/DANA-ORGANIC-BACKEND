const express = require("express");
const {
  register,
  login,
  logout,
  checkUserLogin,
} = require("../../controllers/v1/auth.controller");
const { authenToken } = require("../../middlewares/authenToken");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authenToken, logout);
router.post("/forgot-password");
router.post("/reset-password");
router.get("/me", authenToken, checkUserLogin);

module.exports = router;

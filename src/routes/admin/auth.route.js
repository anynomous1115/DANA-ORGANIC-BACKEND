const express = require("express");
const { authenToken } = require("../../middlewares/authenToken");
const { loginAdmin } = require("../../controllers/admin/auth.controller");
const router = express.Router();

router.post("/login", authenToken, loginAdmin);

module.exports = router;

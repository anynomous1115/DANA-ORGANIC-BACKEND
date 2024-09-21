const express = require("express");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const { getAnalytic } = require("../../controllers/admin/analytic.controller");
const router = express.Router();

router.get("/", checkAuth, authorize(role.admin),getAnalytic);

module.exports = router;

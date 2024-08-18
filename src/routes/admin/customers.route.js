const express = require("express");
const {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  disableCustomer,
} = require("../../controllers/admin/customers.controller");
const validator = require("../../middlewares/validations");
const {
  customerValidation,
} = require("../../validations/admin/customer.validation");
const { checkAuth, authorize } = require("../../middlewares/authenToken");
const role = require("../../utils/role");
const Router = express.Router();

Router.get("/", checkAuth, authorize(role.admin), getAllCustomers);
Router.get("/:id", checkAuth, authorize(role.admin), getCustomer);
Router.post(
  "/",
  checkAuth,
  authorize(role.admin),
  validator(customerValidation),
  createCustomer
);
Router.put(
  "/:id",
  checkAuth,
  authorize(role.admin),
  validator(customerValidation),
  updateCustomer
);
Router.put("/:id/disable", checkAuth, authorize(role.admin), disableCustomer);

module.exports = Router;

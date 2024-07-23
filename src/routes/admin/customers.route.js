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
const Router = express.Router();

Router.get("/", getAllCustomers);
Router.get("/:id", getCustomer);
Router.post("/", validator(customerValidation), createCustomer);
Router.put("/:id", validator(customerValidation), updateCustomer);
Router.put("/:id/disable", disableCustomer);

module.exports = Router;

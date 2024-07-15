const express = require("express");
const {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  disableCustomer,
} = require("../../controllers/admin/customers.controller");
const Router = express.Router();

Router.get("/", getAllCustomers);
Router.get("/:id", getCustomer);
Router.post("/", createCustomer);
Router.put("/:id", updateCustomer);
Router.put("/:id/disable", disableCustomer);

module.exports = Router;

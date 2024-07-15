const Customer = require("../../models/customers.model");

const getAllCustomersService = async (page, limit) => {
  const startIndex = (page - 1) * limit;
  const customers = await Customer.find().skip(startIndex).limit(limit);
  if (customers.length === 0) {
    throw { message: "Customers not found!", code: 404 };
  }
  return customers;
};

const getCustomerService = async (id) => {
  const customer = await Customer.findById(id).exec();
  if (!customer) {
    throw { message: "Customer not found!", code: 404 };
  }
  return customer;
};

const createCustomerService = async (customer) => {
  const customerExist = await Customer.findOne({
    email: customer.email,
  }).exec();
  if (customerExist) {
    throw { message: "Customer already exists!", code: 400 };
  }

  const newCustomer = new Customer(customer);
  return await newCustomer.save();
};

const updateCustomerService = async (id, customer) => {
  const customerExist = await Customer.findById(id).exec();
  if (!customerExist) {
    throw { message: "Customer not found!", code: 404 };
  }

  const emailExist = await Customer.findOne({
    email: customer.email,
  }).exec();
  if (emailExist) {
    throw { message: "Email already exists!", code: 400 };
  }

  const updatedCustomer = await Customer.findByIdAndUpdate(id, customer, {
    new: true,
  });
  return updatedCustomer;
};

const disableCustomerService = async (id) => {
  const customerExist = await Customer.findById(id).exec();
  if (!customerExist) {
    throw { message: "Customer not found!", code: 404 };
  }
  const disabledCustomer = await Customer.findByIdAndUpdate(id, {
    disable: true,
  });
  return disabledCustomer;
};

module.exports = {
  getAllCustomersService,
  getCustomerService,
  createCustomerService,
  updateCustomerService,
  disableCustomerService,
};

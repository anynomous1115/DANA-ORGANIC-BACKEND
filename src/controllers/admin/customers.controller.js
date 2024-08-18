const { errorHandler, successHandler } = require("../../helper/response");
const {
  getAllCustomersService,
  getCustomerService,
  createCustomerService,
  updateCustomerService,
  disableCustomerService,
} = require("../../services/admin/customer.service");
const { paginate } = require("../../utils/pagination");

const getAllCustomers = async (req, res) => {
  try {
    const paginate = await paginate(req);
    const customers = await getAllCustomersService(
      paginate.startIndex,
      paginate.limit
    );
    successHandler(res, customers, "Customers fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const getCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await getCustomerService(customerId);
    successHandler(res, customer, "Customer fetched successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const createCustomer = async (req, res) => {
  try {
    const customer = req.body;
    const newCustomer = await createCustomerService(customer);
    successHandler(res, newCustomer, "Customer created successfully!", 201);
  } catch (error) {
    errorHandler(res, error);
  }
};

const updateCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = req.body;
    const updatedCustomer = await updateCustomerService(customerId, customer);
    successHandler(res, updatedCustomer, "Customer updated successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

const disableCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await disableCustomerService(customerId);
    successHandler(res, { customer }, "Customer disabled successfully!", 200);
  } catch (error) {
    errorHandler(res, error);
  }
};

module.exports = {
  getAllCustomers,
  getCustomer,
  createCustomer,
  updateCustomer,
  disableCustomer,
};

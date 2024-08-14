const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../../models/customers.model");

const registerServic = async (customerBody) => {
  const { fullname, email, password, phone, Dob } = customerBody;
  const isExistingCustomer = await Customer.findOne({ email });

  if (isExistingCustomer) {
    throw { message: "Customer already exists!", code: 409 };
  }
  const newCustomer = await Customer.create({
    fullname,
    email,
    password,
    phone,
    Dob,
  });

  return newCustomer;
};

const loginService = async (email, password) => {
  const customer = await Customer.findOne({ email });
  const isPassword = await customer.comparePassword(password);
  if (!customer || !isPassword) {
    throw { message: "Email or password is incorrect !", code: 401 };
  }
  const ageToken = 3600;
  const accessToken = jwt.sign(
    { _id: customer._id }, //data input
    process.env.ACCESS_TOKEN_SECRET, //secret key-
    { expiresIn: "1h" } //expired time
  );
  return {
    accessToken,
    ageToken,
  };
};

const checkUserLoginService = async (accessTokenVerify) => {
  const { _id } = accessTokenVerify;
  const isExistingUser = await Customer.findOne({ _id });

  return isExistingUser;
};

module.exports = {
  registerServic,
  loginService,
  checkUserLoginService,
};

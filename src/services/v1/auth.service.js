const bcrypt = require("bcrypt");
const Customer = require("../../models/customers.model");
const Token = require("../../models/token.model");
const {
  generateAccessToken,
  deleteToken,
  createToken,
} = require("../../repositories/token.repository");
const { ageToken } = require("../../utils/ageToken");

const registerServic = async (customerBody) => {
  const { fullname, email, password, phone, Dob } = customerBody;

  const isExistingCustomer = await Customer.findOne({ email });

  if (isExistingCustomer) {
    throw { message: "Customer already exists!", code: 409 };
  }

  const isExistingPhone = await Customer.findOne({ phone });
  if (isExistingPhone) {
    throw { message: "Phone number already exists!", code: 409 };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newCustomer = await Customer.create({
    fullname,
    email,
    password: hashedPassword,
    phone,
    Dob,
    role: "customer",
  });

  return newCustomer;
};

const loginService = async (email, password) => {
  const customer = await Customer.findOne({ email });
  if (!customer) {
    throw { message: "Email or password is incorrect !", code: 401 };
  }
  if (customer.disable === true) {
    throw { message: "Your account has been disabled", code: 401 };
  }
  const isPassword = await bcrypt.compare(password, customer.password);

  if (!isPassword) {
    throw { message: "Email or password is incorrect !", code: 401 };
  }
  const accessToken = generateAccessToken(
    customer._id,
    customer.role,
    ageToken
  );

  await createToken(customer._id, accessToken, ageToken);

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

const logoutService = async (customerId, accessToken) => {
  const token = await Token.findOne({ accessToken });
  if (!token) {
    throw { message: "Token not found", code: 404 };
  }
  await deleteToken(token._id);
};

const resetPasswordService = async (_id, password, newPassword) => {
  const customer = await Customer.findOne({ _id });
  if (!customer) {
    throw { message: "Customer not found", code: 404 };
  }
  const isPassword = await bcrypt.compare(password, customer.password);
  if (!isPassword) {
    throw { message: "Password is incorrect", code: 401 };
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(newPassword, salt);
  customer.password = hashedPassword;
  await customer.save();
  return customer;
};

module.exports = {
  registerServic,
  loginService,
  checkUserLoginService,
  logoutService,
  resetPasswordService,
};

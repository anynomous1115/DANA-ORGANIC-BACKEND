const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Customer = require("../../models/customers.model");
const Token = require("../../models/token.model");

const registerServic = async (customerBody) => {
  const { fullname, email, password, phone, Dob } = customerBody;

  const isExistingCustomer = await Customer.findOne({ email });

  if (isExistingCustomer) {
    throw { message: "Customer already exists!", code: 409 };
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
  console.log(customer.password);

  const isPassword = await bcrypt.compare(password, customer.password);

  if (!isPassword) {
    throw { message: "Email or password is incorrect !", code: 401 };
  }
  const ageToken = 3600;
  const accessToken = jwt.sign(
    { _id: customer._id, role: customer.role }, //data input
    process.env.ACCESS_TOKEN_SECRET, //secret key-
    { expiresIn: "1h" } //expired time
  );

  await Token.create({
    authId: customer._id,
    accessToken,
    expiresAtOfToken: new Date(Date.now() + ageToken * 1000),
  });

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

const logoutService = async (accessToken) => {
  const token = await Token.findOne({ accessToken });
  
  if (!token) {
    throw { message: "Token not found", code: 404 };
  }
  await Token.deleteOne({ accessToken });
};

const tokenService = async (accessToken) => {
  const token = await Token.findOne({ accessToken });
  if (!token) {
    throw { message: "Token not found", code: 404 };
  }
  return token;
};

module.exports = {
  registerServic,
  loginService,
  checkUserLoginService,
  logoutService,
  tokenService,
};

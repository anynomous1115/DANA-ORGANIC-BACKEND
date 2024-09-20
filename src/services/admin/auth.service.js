const bcrypt = require("bcrypt");
const Admin = require("../../models/admin.model");
const {
  createToken,
  generateAccessToken,
  deleteToken,
} = require("../../repositories/token.repository");
const { ageToken } = require("../../utils/ageToken");
const Token = require("../../models/token.model");

const loginAdminService = async (email, password) => {
  console.log(email, password);
  const admin = await Admin.findOne({ email: email }).exec();
  if (!admin) {
    console.error("No admin found with this email.");
    throw { message: "Email or password is incorrect !", code: 401 };
  }

  console.log("admin:", admin);
  console.log("password:", password);

  const isPassword = await bcrypt.compare(password, admin.password);

  console.log("isPassword:", isPassword);
  if (!isPassword) {
    throw { message: "Email or password is incorrect !", code: 401 };
  }
  const accessToken = generateAccessToken(admin._id, admin.role, ageToken);

  await createToken(admin._id, accessToken, ageToken);

  return {
    accessToken,
    ageToken,
  };
};

const logoutAdimService = async (authId, accessToken) => {
  const token = await Token.findOne({ accessToken });
  if (!token) {
    throw { message: "Token not found", code: 404 };
  }
  console.log(token);

  const tokenDeleted = await deleteToken(token._id);
  return tokenDeleted;
};

module.exports = {
  loginAdminService,
  logoutAdimService,
};

const Token = require("../models/token.model");
const jwt = require("jsonwebtoken");

const getToken = async (authId) => {
  const token = await Token.findOne({ authId });
  if (!token) {
    return null;
  }
  if (token.expiresAtOfToken <= new Date()) {
    await deleteToken(token._id);
    return null;
  }
  return token;
};

const generateAccessToken = (authId, role, expiresIn) => {
  return jwt.sign({ _id: authId, role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn,
  });
};

const createToken = async (authId, accessToken, ageToken) => {
  const newToken = await Token.create({
    authId: authId,
    accessToken,
    expiresAtOfToken: new Date(Date.now() + ageToken * 1000),
  });
  return newToken;
};

const deleteToken = async (data) => {
  await Token.deleteOne({ _id: data });
  return;
};

module.exports = {
  getToken,
  generateAccessToken,
  createToken,
  deleteToken,
};

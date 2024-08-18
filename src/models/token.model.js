const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  authId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  accessToken: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAtOfToken: {
    type: Date,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;

const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
  authId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  refreshToken: {
    type: String,
    required: true,
    unique: true,
  },
  accessToken: {
    type: String,
    required: true,
    unique: true,
  },
  expiresAtOfRefreshToken: {
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

refreshTokenSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const Token = mongoose.model("token", tokenSchema);

module.exports = Token;

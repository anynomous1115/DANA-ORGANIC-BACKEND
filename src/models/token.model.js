const mongoose = require("mongoose");

const cron = require("node-cron");

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

cron.schedule("* * * * *", async () => {
  try {
    const expiredTokens = await Token.find({
      expiresAtOfToken: { $lt: new Date() },
    });

    if (expiredTokens.length > 0) {
      const result = await Token.deleteMany({
        _id: { $in: expiredTokens.map((token) => token._id) },
      });

      console.log(`Removed ${result.deletedCount} expired tokens`);
    } else {
      console.log("No expired tokens found");
    }
  } catch (error) {
    console.error("Error removing expired tokens:", error);
  }
});

module.exports = Token;

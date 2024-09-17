const mongoose = require("mongoose");
const localDB =
    process.env.MONGODB_CONNECT_STRING_LOCAL ||
    `mongodb://localhost:27017/DANA-ORGANIC`;

const connectDB = async () => {
  try {
    await mongoose.connect(localDB);
    console.log("Connect successful to Database!!!");
  } catch (error) {
    console.error("Error connect:", error.message);
    process.exit(1);
  }
};
module.exports = { connectDB };

const mongoose = require("mongoose");

const isValidObjectId = (id) => {
  try {
    return mongoose.Types.ObjectId(id);
  } catch (error) {
    console.error("Error converting ID to ObjectID:", error);
    return null;
  }
};

module.exports = {
  isValidObjectId,
};
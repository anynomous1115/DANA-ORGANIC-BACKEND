const mongoose = require("mongoose");

const LocationSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  customerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "customers",
    required: true,
  },
});

const Location = mongoose.model("locations", LocationSchema);
module.exports = Location;

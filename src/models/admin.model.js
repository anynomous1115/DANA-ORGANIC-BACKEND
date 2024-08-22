const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Define the Customer schema
const AdminSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    validate: {
      validator: function (v) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: true,
    enum: ["admin"],
    default: "admin",
  },
});

AdminSchema.index({ email: 1 }, { unique: true });

const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;

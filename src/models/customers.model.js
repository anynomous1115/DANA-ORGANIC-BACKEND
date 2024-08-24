const mongoose = require("mongoose");

// Define the Customer schema
const CustomerSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\d{10}$/.test(v);
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
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
      trim: true,
      minlength: 8,
      validate(value) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
    },
    Dob: {
      type: Date,
      required: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["customer"],
      default: "customer",
    },
  },
  {
    timestamps: true,
  }
);

// Create a unique index on the email field
CustomerSchema.index({ email: 1, phone: 1 }, { unique: true });
// Create the Customer model
const Customer = mongoose.model("customers", CustomerSchema);

module.exports = Customer;

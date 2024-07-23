const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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

    }
  },
  {
    timestamps: true,
  }
);

// Create a unique index on the email field
CustomerSchema.index({ email: 1 }, { unique: true });

// Hash the password before saving
CustomerSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Add a method to compare passwords
CustomerSchema.methods.comparePassword = async function (candidatePassword) {
  const customer = this;
  const isCheck = await bcrypt.compare(candidatePassword, customer.password);
  return isCheck;
};

// Create the Customer model
const Customer = mongoose.model("customers", CustomerSchema);

module.exports = Customer;

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
    select: false, // Exclude the password field from queries
  },
  role: {
    type: String,
    required: true,
    enum: ["admin", "superadmin"],
    default: "admin",
  },
});

// Create a unique index on the email field
AdminSchema.index({ email: 1 }, { unique: true });

// // Hash the password before saving
// AdminSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

// // Add a method to compare passwords
// AdminSchema.methods.comparePassword = async function (candidatePassword) {
//   return await bcrypt.compare(candidatePassword, this.password);
// };

// Create the Customer model
const Admin = mongoose.model("admin", AdminSchema);

module.exports = Admin;

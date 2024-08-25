const { en } = require("@faker-js/faker");
const mongoose = require("mongoose");

const imagesSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },
  entity_type: {
    type: String,
    required: true,
    enum: ["product", "category", "feedback", "comment", "post"],
  },
  entity_id: {
    type: String,
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

const Image = mongoose.model("images", imagesSchema);
module.exports = Image;

const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: String,
    required: true,
  },
  bestPrice: {
    type: Number,
    required: true,
  },
  images: {
    type: Array,
    required: true,
  },
  topChocolates: {
    type: Boolean,
    default: "true",
  },
  date: {
    type: Number,
  },
});

module.exports = mongoose.model("product", productSchema);

const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
    default: Date.now,
  },
  rating: {
    type: Number,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;

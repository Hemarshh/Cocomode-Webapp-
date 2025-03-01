const express = require("express");
const reviewRouter = express.Router();

const {
  getReviews,
  deleteReview,
} = require("../controllers/reviewController.js");

// GET all reviews for a product
reviewRouter.get("/", getReviews);
reviewRouter.delete("/:commentId", deleteReview);

module.exports = reviewRouter;

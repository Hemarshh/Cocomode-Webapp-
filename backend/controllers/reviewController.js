const reviewsModel = require("../models/reviewsModel");

const getReviews = async (req, res) => {
  try {
    const fetchReviews = await reviewsModel.find();
    // console.log(fetchReviews);

    res.status(200).json({ success: true, reviews: fetchReviews });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};
const deleteReview = async (req, res) => {
  try {
    const id = req.params.commentId;
    const deleteComment = await reviewsModel.findByIdAndDelete(id);
    // console.log(deleteComment);

    res.json({
      success: true,
      message: "Message Deleted Successfully.",
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

module.exports = { getReviews, deleteReview };

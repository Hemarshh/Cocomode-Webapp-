import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shopContext";
import { motion } from "framer-motion";
import { Trash2, User } from "lucide-react";
import axios from "axios";
import starFull from "../assets/starRatingfull.png";
import starUnfull from "../assets/starRatingunfull.png";
import toast from "react-hot-toast";

const SpecificChocolate = () => {
  // -------------- Context and State Initialization --------------
  const { id } = useParams();
  const { chocolates, addToCart, backendUrl, token, userDetails } =
    useContext(ShopContext);

  const [chocolateData, setChocolateData] = useState(null);
  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [singleChocolate, setSingleChocolate] = useState({});
  const [reviews, setReviews] = useState([]);
  const [visibleReviews, setVisibleReviews] = useState(3); // Initially show 3 reviews

  // ----------------- Fetch Chocolate Details ------------------
  useEffect(() => {
    const chocolate = chocolates.find((choco) => choco._id === id);
    setSingleChocolate(chocolate);

    if (chocolate) {
      setChocolateData(chocolate);
      setImages(
        Array.isArray(chocolate.images) ? chocolate.images : [chocolate.images]
      );
      setMainImage(chocolate.images[0] || "");
    }
  }, [id, chocolates]);

  // ----------------- Fetch Reviews ------------------
  useEffect(() => {
    if (!singleChocolate?._id) return;
    fetchReviews();
  }, [singleChocolate]);

  const fetchReviews = async () => {
    try {
      const productId = singleChocolate._id;
      const response = await axios.get(
        `${backendUrl}/api/product/get-reviews/${productId}`
      );
      setReviews(response.data.fetchreviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    }
  };

  // ----------------- Handle Review Submission ------------------
  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      toast.error("Please log in to submit a review.");
      return;
    }

    // Check if rating or review text is empty and return early
    if (!rating || !reviewText.trim()) {
      toast.error("Please provide both a rating and a review.");
      return; // Prevent the review submission if validation fails
    }

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/post-reviews`,
        { reviewText, rating, singleChocolate },
        { headers: { token } }
      );

      // Update the reviews in the UI
      setReviews([...reviews, response.data]);
      setRating(0); // Reset the rating
      setReviewText(""); // Reset the review text
    } catch (error) {
      console.log("Error submitting review:", error);
    }
  };

  // ----------------- Date Formatter ------------------
  const formatDate = (timestamp) => {
    if (!timestamp) return "Invalid Date";

    const parsedTimestamp = parseInt(timestamp, 10);
    if (isNaN(parsedTimestamp)) return "Invalid Date";

    const parsedDate = new Date(parsedTimestamp);
    if (isNaN(parsedDate.getTime())) return "Invalid Date";

    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return parsedDate.toLocaleDateString("en-IN", options).replace(/,/g, "");
  };

  // ----------------- Delete Review ------------------
  const deleteComment = async (_id) => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this review?"
    );
    if (!isConfirmed) return; // If user cancels, do nothing

    try {
      const deleteResponse = await axios.delete(
        `${backendUrl}/api/product/delete-reviews/${_id}`,
        { headers: { token } }
      );

      if (deleteResponse.status === 200) {
        toast.success("Review deleted successfully.");
        // Update the reviews in the UI by removing the deleted review
        setReviews((prevReviews) =>
          prevReviews.filter((review) => review._id !== _id)
        );
      }
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error("Failed to delete the review. Please try again.");
    }
  };

  console.log(userDetails);

  // ----------------- Check if Chocolate Exists ------------------
  if (!chocolateData) {
    return (
      <div className="text-center text-red-500 mt-6">No chocolate found.</div>
    );
  }

  // ----------------- Load More Reviews ------------------
  const handleLoadMore = () => {
    setVisibleReviews((prev) => prev + 3);
  };

  return (
    <div className="p-6">
      {/* Product Details Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Images */}
        <div className="flex lg:flex-col gap-2 overflow-auto lg:max-w-sm">
          {images.length > 0 ? (
            images.map((singleImg, index) => (
              <div className="h-24 w-24 lg:w-full" key={index}>
                <img
                  onClick={() => setMainImage(singleImg)}
                  className="h-full w-full object-cover rounded-lg cursor-pointer"
                  src={singleImg}
                  alt={`Chocolate ${index + 1}`}
                />
              </div>
            ))
          ) : (
            <p>No images available</p>
          )}
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 flex-1 items-start">
          {/* Main Image */}
          <div className="w-full sm:h-[470px] rounded-lg overflow-hidden lg:w-1/2 flex justify-center items-center bg-gray-100">
            <img
              className="w-full h-full object-contain rounded-lg"
              src={
                mainImage ||
                "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
              }
              alt={chocolateData.name || "Default Chocolate Image"}
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col gap-4 md:pl-6 md:pr-28">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold">
              {chocolateData.name}
            </h1>
            <div className="flex items-center gap-3">
              <p className="text-2xl sm:text-3xl font-semibold text-green-600">
                ₹{chocolateData.bestPrice}.00
              </p>
              <p className="text-md sm:text-lg line-through text-red-500">
                ₹{chocolateData.originalPrice}.00
              </p>
            </div>
            <p className="text-base sm:text-lg text-gray-700">
              {chocolateData.description}
            </p>

            {/* Quantity and Buttons */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex bg-[#d99328] rounded-md text-white">
                <button
                  className={`px-4 py-2 text-xl ${
                    quantity === 1
                      ? "disabled:cursor-not-allowed opacity-50"
                      : "cursor-pointer"
                  }`}
                  disabled={quantity === 1}
                  onClick={() => setQuantity(quantity - 1)}
                >
                  -
                </button>
                <span className="px-4 py-2 text-xl">{quantity}</span>
                <button
                  className="px-4 py-2 text-xl"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </button>
              </div>

              <motion.button
                className="w-full sm:w-1/3 bg-[#7f5036] py-3 px-4 rounded-lg text-sm transition duration-300 ease-in-out transform hover:scale-105 text-white"
                whileHover={{ scale: 1.05 }}
                onClick={() => addToCart(chocolateData, quantity)}
              >
                Add to Cart
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Review Form */}
      <div className="mt-8 bg-white rounded-xl shadow-sm p-6 border border-amber-100">
        <h2 className="text-2xl font-bold text-amber-900 mb-4">
          Write a Review
        </h2>
        <form onSubmit={handleReviewSubmit}>
          <div className="flex gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <img
                key={star}
                src={star <= rating ? starFull : starUnfull}
                alt={`Star ${star}`}
                className="w-6 h-6 cursor-pointer"
                onClick={() => setRating(star)}
              />
            ))}
          </div>
          <textarea
            className="w-full p-3 border border-amber-200 rounded-lg outline-none"
            placeholder="Write your review..."
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
          />
          <button
            type="submit"
            className="mt-4 px-6 py-3 bg-[#7f5036] text-white rounded-lg"
          >
            Submit Review
          </button>
        </form>
      </div>

      {/* Reviews Section */}
      <div className="min-h-80 bg-gradient-to-b to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full mx-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-amber-100">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-amber-900 mb-2">
                Chocolate Lovers Reviews
              </h2>
              <div className="flex items-center gap-2">
                {reviews.length > 0 ? (
                  (() => {
                    const averageRating = (
                      reviews.reduce((acc, review) => acc + review.rating, 0) /
                      reviews.length
                    ).toFixed(1);
                    return (
                      <>
                        <span className="text-lg font-semibold text-amber-900">
                          {averageRating}
                        </span>
                        <span className="text-amber-700">
                          ({reviews.length} chocolate connoisseurs)
                        </span>
                      </>
                    );
                  })()
                ) : (
                  <span className="text-lg text-amber-700">No reviews yet</span>
                )}
              </div>
            </div>

            <div className="space-y-8 w-full">
              {reviews.length > 0 ? (
                reviews.slice(0, visibleReviews).map((review) => (
                  <div
                    key={review._id}
                    className="border-b border-amber-100 pb-8 last:border-0"
                  >
                    <div className="flex items-start gap-4">
                      <User className="w-8 h-8 p-1 rounded-full object-cover ring-2 text-amber-900 ring-amber-100" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-amber-900">
                              {review.author}
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-sm text-amber-700">
                                {formatDate(review.date)}
                              </span>
                            </div>
                          </div>
                          {/* Show delete button only if the current user is the author */}
                          {console.log(userDetails._id)}
                          {review.userId === userDetails._id && (
                            <p
                              className="cursor-pointer"
                              onClick={() => deleteComment(review._id)}
                            >
                              <Trash2 />
                            </p>
                          )}
                        </div>
                        <p className="mt-3 text-amber-950">{review.content}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center text-amber-700">
                  No reviews to display.
                </div>
              )}
            </div>

            <div className="mt-8 text-center">
              {visibleReviews < reviews.length && reviews.length > 0 && (
                <button
                  className="inline-flex items-center justify-center px-6 py-3 border border-amber-200 shadow-sm text-base font-medium rounded-md text-amber-900 bg-amber-50 hover:bg-amber-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-colors"
                  onClick={handleLoadMore}
                >
                  Load More Reviews
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecificChocolate;

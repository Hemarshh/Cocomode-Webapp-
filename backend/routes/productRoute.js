const express = require("express");
const productRouter = express.Router();

// Middleware
const adminAuth = require("../middlewares/adminAuth");
const userAuth = require("../middlewares/auth");

// Controllers
const {
  addProduct,
  removeProduct,
  listProduct,
  postReviews,
  deleteReviews,
  getReviews,
} = require("../controllers/productController");

// File upload middleware
const upload = require("../middlewares/multer");

// Routes for Product Management
productRouter.post(
  "/add-product",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
    { name: "image5", maxCount: 1 },
  ]),
  adminAuth,
  addProduct
);

productRouter.delete("/remove-product/:productId", adminAuth, removeProduct);
productRouter.get("/list-product", listProduct);

// Routes for Reviews
productRouter.post("/post-reviews", userAuth, postReviews);
productRouter.delete("/delete-reviews/:reviewId", userAuth, deleteReviews);
productRouter.get("/get-reviews/:productId", getReviews);

module.exports = productRouter;

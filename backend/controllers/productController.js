const cloudinary = require("cloudinary").v2;
const productModel = require("../models/productModel");
const reviewModel = require("../models/reviewsModel");
const UserModel = require("../models/UserModel");
const nodemailer = require("nodemailer");
const Subscriber = require("../models/subscriberModel");

const addProduct = async (req, res) => {
  try {
    const { name, description, originalPrice, bestPrice, topChocolates } =
      req.body;

    const images = [
      req.files.image1 && req.files.image1[0],
      req.files.image2 && req.files.image2[0],
      req.files.image3 && req.files.image3[0],
      req.files.image4 && req.files.image4[0],
      req.files.image5 && req.files.image5[0],
    ].filter((item) => item !== undefined);

    let imagesURL = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      originalPrice: Number(originalPrice),
      bestPrice: Number(bestPrice),
      images: imagesURL,
      topChocolates: topChocolates === "true" ? "true" : "false",
      date: Date.now(),
    };

    const newProduct = new productModel(productData);
    await newProduct.save();

    const subscribers = await Subscriber.find({}, { email: 1 });
    if (subscribers.length > 0) {
      const transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        auth: {
          user: "sydnie1@ethereal.email",
          pass: "NwBb9EYeay6w7WcDdM",
        },
      });

      const emailPromises = subscribers.map((subscriber) =>
        transporter.sendMail({
          from: '"COCOMODE" <cocomode@mail.com>',
          to: subscriber.email,
          subject: `New Product Added: ${name}`,
          html: ` 
            <h1>${name}</h1>
            <p>${description}</p>
            <p><strong>Original Price:</strong> $${originalPrice}</p>
            <p><strong>Best Price:</strong> $${bestPrice}</p>
            <p>Check it out now on our website:</p>
            <a href="http://yourwebsite.com/products/${newProduct._id}" target="_blank">View Product</a>
          `,
        })
      );

      await Promise.all(emailPromises);
    }

    return res.json({
      success: true,
      message: "Product added successfully and subscribers notified!",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message,
    });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const deleteProduct = await productModel.findByIdAndDelete(productId);

    if (!deleteProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Successfully deleted the product.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred while deleting the product.",
      error: error.message,
    });
  }
};

const listProduct = async (req, res) => {
  try {
    const listChocolates = await productModel.find({});
    res.json({
      success: true,
      listChocolates,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const postReviews = async (req, res) => {
  try {
    const { userId, singleChocolate, reviewText, rating } = req.body;

    const user = await UserModel.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const newReviewData = {
      userId,
      author: user.name,
      date: Date.now(),
      rating,
      content: reviewText,
      productId: singleChocolate._id,
    };

    const newReview = new reviewModel(newReviewData);
    await newReview.save();
    res.json(newReview);
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.json({
        success: false,
        message: "ProductId is required.",
      });
    }

    const fetchreviews = await reviewModel.find({ productId });

    res.json({
      success: true,
      fetchreviews,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const deleteReviews = async (req, res) => {
  const id = req.params.reviewId;
  const { userId } = req.body;

  if (!id || !userId) {
    return res.json({
      success: false,
      message: "ReviewId and UserId both are required",
    });
  }

  try {
    const findComment = await reviewModel.findOne({ _id: id });

    if (findComment && findComment.userId.toString() === userId) {
      await reviewModel.findByIdAndDelete(id);
      return res.json({
        success: true,
        message: "Review successfully deleted",
      });
    } else {
      return res.json({
        success: false,
        message: "Review not found or user mismatch",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  addProduct,
  removeProduct,
  listProduct,
  postReviews,
  getReviews,
  deleteReviews,
};

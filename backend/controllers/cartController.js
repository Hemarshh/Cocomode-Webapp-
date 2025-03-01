const productModel = require("../models/productModel");
const UserModel = require("../models/UserModel");

const addToCart = async (req, res) => {
  try {
    const { userId, chocolateId, quantity } = req.body;

    if (!userId || !chocolateId) {
      return res.json({
        success: false,
        message: "User ID and Chocolate ID are required",
      });
    }
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const chocolate = await productModel.findById(chocolateId);

    if (!chocolate) {
      return res.status(404).json({
        success: false,
        message: "Chocolate not found",
      });
    }

    const cartData = userData.cartData;

    if (cartData[chocolateId]) {
      cartData[chocolateId] += 1;
    } else {
      cartData[chocolateId] = quantity;
    }

    userData.markModified("cartData");
    const savedata = await userData.save();

    res.json({
      success: true,
      message: "Chocolate added to cart successfully",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const UpdateCart = async (req, res) => {
  try {
    const { userId, chocolateId, change } = req.body;

    if (!userId || !chocolateId) {
      return res.json({
        success: false,
        message: "User ID and Chocolate ID are required",
      });
    }

    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const chocolate = await productModel.findById(chocolateId);
    if (!chocolate) {
      return res.status(404).json({
        success: false,
        message: "Chocolate not found",
      });
    }

    const cartData = userData.cartData;

    if (cartData[chocolateId]) {
      const newQuantity = cartData[chocolateId] + change;

      if (newQuantity > 0) {
        cartData[chocolateId] = newQuantity;
      } else {
        delete cartData[chocolateId];
      }
    } else if (change > 0) {
      cartData[chocolateId] = change;
    }

    userData.markModified("cartData");
    await userData.save();

    res.json({
      success: true,
      message:
        change > 0
          ? "Chocolate added to cart successfully"
          : "Chocolate removed from cart",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "An error occurred while updating the cart",
      error: error.message,
    });
  }
};

const getUserCartData = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await UserModel.findById(userId);

    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const minimalCardData = userData.cartData;
    res.json({
      success: true,
      minimalCardData,
    });
  } catch (error) {
    console.log(error);
  }
};

const getUserCart = async (req, res) => {
  try {
    const { userId } = req.body;

    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userData.cartData;
    const cartItems = [];

    for (const chocolateId in cartData) {
      const chocolate = await productModel.findById(chocolateId);
      if (chocolate) {
        cartItems.push({
          ...chocolate.toObject(),
          quantity: cartData[chocolateId],
        });
      }
    }
    res.json({
      success: true,
      cartData: cartItems,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const deleteUserCart = async (req, res) => {
  try {
    const { userId } = req.body;
    const { chocolateId } = req.query;

    if (!userId || !chocolateId) {
      return res.status(400).json({
        success: false,
        message: "User ID and Chocolate ID are required",
      });
    }

    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userData.cartData;
    if (cartData[chocolateId]) {
      delete cartData[chocolateId];
      userData.markModified("cartData");
      await userData.save();
    } else {
      return res.status(404).json({
        success: false,
        message: "Chocolate not found in cart",
      });
    }

    res.json({
      success: true,
      message: "Chocolate removed from cart successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  addToCart,
  UpdateCart,
  getUserCart,
  getUserCartData,
  deleteUserCart,
};

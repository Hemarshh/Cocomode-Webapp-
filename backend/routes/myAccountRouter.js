const express = require("express");
const myAccountRouter = express.Router();
const {
  getProfile,
  updateProfile,
  getOrders,
  getCart,
} = require("../controllers/myAccountController");

myAccountRouter.get("/profile", getProfile);
myAccountRouter.get("/profile/getorders", getOrders);
myAccountRouter.get("/profile/getcart", getCart);
myAccountRouter.put("/profile/updateprofile", updateProfile);

module.exports = myAccountRouter;

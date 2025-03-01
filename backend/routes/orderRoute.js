const express = require("express");
const router = express.Router();
const {
  PlaceOrder,
  PlaceOrderStripe,
  // PlaceOrderRazorpay,
  userOrders,
  allOrders,
  updateStatus,
  VerifyStripe,
  markItemPaid,
  updateOrderStatus,
} = require("../controllers/orderController");
const adminAuth = require("../middlewares/adminAuth");
const userAdmin = require("../middlewares/auth");

// Payment
router.post("/place", userAdmin, PlaceOrder);
router.post("/stripe", userAdmin, PlaceOrderStripe);
// router.post("/razorpay", userAdmin, PlaceOrderRazorpay);
router.post("/verifystripe", userAdmin, VerifyStripe);

// User
router.get("/userorders", userAdmin, userOrders);

// Admin
router.get("/list", adminAuth, allOrders);
router.post("/status", adminAuth, updateStatus);
router.put("/mark-item-paid/:orderId/:itemId", adminAuth, markItemPaid);
router.put("/update-status/:orderId", adminAuth, updateOrderStatus);

module.exports = router;

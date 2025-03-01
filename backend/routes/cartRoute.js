const express = require("express");
const {
  addToCart,
  UpdateCart,
  getUserCart,
  getUserCartData,
  deleteUserCart,
} = require("../controllers/cartController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/add", auth, addToCart);
router.post("/update", auth, UpdateCart);
router.delete("/delete", auth, deleteUserCart);
router.get("/get", auth, getUserCart);
router.get("/getdata", auth, getUserCartData);

module.exports = router;

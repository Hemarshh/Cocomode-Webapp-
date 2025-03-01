const express = require("express");
const {
  loginUser,
  registerUser,
  adminLogin,
} = require("../controllers/userController.js");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/adminlogin", adminLogin);

userRouter.get("/", (req, res) => res.send("User Routes"));

module.exports = userRouter;

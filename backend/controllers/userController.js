const UserModel = require("../models/UserModel");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User doesn't exist.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid Credentials invalid.",
      });
    }

    const token = jwt.sign(
      { _id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    const { password: _, ...userWithoutPassword } = user._doc;

    res.status(200).json({
      success: true,
      message: "Login Successful",
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exists = await UserModel.findOne({ email: email });
    if (exists) {
      return res.json({
        success: false,
        message: "User already exists",
      });
    }
    if (!validator.isEmail(email)) {
      return res.json({
        success: true,
        message: "Please enter valid email",
      });
    }
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Please enter a strong Password",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    const payload = {
      _id: user._id,
      email: user.email,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    // console.log(token);
    res.json({ success: true, message: "User Register Successfully.", token });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    // console.log(email, password);

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const payload = email + password;
      const token = jwt.sign({ payload }, process.env.JWT_SECRET, {
        expiresIn: "2m",
      });

      return res.json({
        success: true,
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Credentials.",
      });
    }
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "An error occurred during login.",
    });
  }
};

module.exports = { loginUser, registerUser, adminLogin };

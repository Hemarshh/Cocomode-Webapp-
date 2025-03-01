const jwt = require("jsonwebtoken");

const authAdmin = async (req, res, next) => {
  try {
    const { token } = req.headers;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (
      decoded.payload !==
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD
    ) {
      return res.json({
        success: false,
        message: "Not Authorized",
      });
    }

    next();
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      message: "An error occurred during login.",
    });
  }
};

module.exports = authAdmin;

const cloudinary = require("cloudinary").v2;

const cloudinaryConnection = async () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUDNAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
  console.log("Cloudinary Successfully Configured");
};

module.exports = cloudinaryConnection;

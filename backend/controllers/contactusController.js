const contactusModel = require("../models/contactusModel");

const sendUsaMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body.formData;

    contactusData = {
      name,
      email,
      message,
    };

    const newContactus = await new contactusModel(contactusData);
    await newContactus.save();

    res.json({
      success: true,
      message: "Message Sent Successfull.",
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

const fetchUsaMessage = async (req, res) => {
  try {
    const fetchMessages = await contactusModel.find();

    res.json({
      success: true,
      fetchMessages,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error,
    });
  }
};

module.exports = { sendUsaMessage, fetchUsaMessage };

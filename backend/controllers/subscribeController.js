const Subscriber = require("../models/subscriberModel"); // Ensure you create this model

const subscribeController = async (req, res) => {
  const { email } = req.body;

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ message: "Invalid email address" });
  }

  try {
    const existingSubscriber = await Subscriber.findOne({ email });
    // console.log(existingSubscriber);
    if (existingSubscriber) {
      return res.json({ message: "Email already subscribed", success: false });
    }

    // console.log("email : ", email);

    const newSubscriber = new Subscriber({ email });
    await newSubscriber.save();

    res
      .status(200)
      .json({ message: "Subscription successful!", success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = subscribeController;

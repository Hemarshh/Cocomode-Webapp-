const getProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
};
const updateProfile = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address },
      { new: true }
    );
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Update failed" });
  }
};
const getOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await orderModel.findOne({ userId });
    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const getCart = async (req, res) => {
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

module.exports = { getProfile, updateProfile, getOrders, getCart };

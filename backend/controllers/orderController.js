const orderModel = require("../models/ordersModel");
const userModel = require("../models/UserModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const PlaceOrder = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;
    if (!paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "Payment method is required.",
      });
    }

    const updatedItems = items.map((item) => ({
      ...item,
      date: Date.now(),
      paymentMethod,
      orderStatus: "Order Placed",
      payment: false,
    }));

    let isUserExists = await userModel.findById(userId);
    if (!isUserExists) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    const userName = isUserExists.name;

    let existingOrder = await orderModel.findOne({ userId });
    if (existingOrder) {
      if (
        existingOrder.address.street === address.street &&
        existingOrder.address.city === address.city &&
        existingOrder.address.state === address.state &&
        existingOrder.address.zip === address.zip
      ) {
        existingOrder.items = [...existingOrder.items, ...updatedItems];
        existingOrder.amount += amount;

        if (!existingOrder.userName) {
          existingOrder.userName = userName;
        }

        await existingOrder.save();
      } else {
        const orderData = {
          userId,
          userName,
          items: updatedItems,
          amount,
          address,
          date: Date.now(),
        };

        const newOrder = new orderModel(orderData);
        await newOrder.save();
      }
    } else {
      const orderData = {
        userId,
        userName,
        items: updatedItems,
        amount,
        address,
        date: Date.now(),
      };

      const newOrder = new orderModel(orderData);
      await newOrder.save();
    }

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    res.json({
      success: true,
      message: "Order Placed Successfully.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const PlaceOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address, paymentMethod } = req.body;
    const { origin } = req.headers;

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found." });

    const updatedItems = items.map((item) => ({
      ...item,
      date: Date.now(),
      paymentMethod,
      orderStatus: "Order Placed",
      payment: false,
    }));

    const itemIds = updatedItems.map((item) => item._id).join(",");

    const DeliveryCharge = 20;
    const line_items = [
      ...updatedItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.name,
            images: [item.images[0]],
          },
          unit_amount: item.bestPrice * 100,
        },
        quantity: item.quantity,
      })),
      {
        price_data: {
          currency: "inr",
          product_data: { name: "Delivery Charge" },
          unit_amount: DeliveryCharge * 100,
        },
        quantity: 1,
      },
    ];

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&items=${JSON.stringify(
        updatedItems
      )}&amount=${amount}&address=${address}&userId=${userId}`,
      cancel_url: `${origin}/verify?success=false&userId=${userId}`,
      line_items,
      mode: "payment",
    });

    return res.status(200).json({
      success: true,
      message: "Order placed successfully. Please proceed with payment.",
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error processing order:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const VerifyStripe = async (req, res) => {
  try {
    const { success, items, amount, address, userId } = req.query;
    if (!success || success !== "true") {
      return res.status(400).json({
        success: false,
        message: "Payment failed or invalid response from Stripe.",
      });
    }

    if (!items || !amount || !address || !userId) {
      return res.status(400).json({
        success: false,
        message: "Missing required data.",
      });
    }

    const parsedItems = JSON.parse(items);

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const newOrder = await new orderModel({
      userId,
      userName: user.name,
      items: parsedItems,
      amount,
      address,
      date: Date.now(),
      orderStatus: "Paid",
      payment: true,
    }).save();

    const updatedItems = parsedItems.map((item) => ({
      ...item,
      payment: true,
    }));

    newOrder.items = updatedItems;
    await newOrder.save();

    await userModel.findByIdAndUpdate(userId, { cartData: {} });

    return res.status(200).json({
      success: true,
      message: "Payment successful. Order placed.",
    });
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error during payment verification.",
    });
  }
};

const userOrders = async (req, res) => {
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

const allOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}).populate("userId", "name");
    res.json(orders);
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const updateStatus = async (req, res) => {
  try {
    const { orderId, itemId, orderStatus } = req.body;

    const validStatuses = ["Order Placed", "Confirmed", "Canceled"];
    if (!validStatuses.includes(orderStatus)) {
      return res.json({ success: false, message: "Invalid order status." });
    }

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.json({ success: false, message: "Order not found." });
    }

    const item = order.items.find((item) => item._id.toString() === itemId);
    if (!item) {
      return res.json({
        success: false,
        message: "Item not found in the order.",
      });
    }

    item.orderStatus = orderStatus;

    const savedOrder = await order.save();
    res.json({ success: true, message: "Item status updated successfully." });
  } catch (error) {
    console.error("Error updating status:", error);
    res.json({
      success: false,
      message: error.message || "An error occurred while updating the status.",
    });
  }
};

const markItemPaid = async (req, res) => {
  try {
    const { orderId, itemId } = req.params;

    const findOrder = await orderModel.findById(orderId);
    if (!findOrder) return res.status(404).json({ message: "Order not found" });

    const findItem = findOrder.items.find(
      (item) => item._id.toString() === itemId
    );
    if (!findItem)
      return res.status(404).json({ message: "Item not found in order" });

    // console.log("Before Update:", findItem.payment);

    findItem.payment = !findItem.payment;

    findOrder.markModified("items");

    await findOrder.save();

    // console.log("After Update:", findItem.payment);

    res.json({ message: "Item payment status updated", order: findOrder });
  } catch (error) {
    console.error("Error updating item payment status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    const order = await orderModel.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    res.json({ message: "Order status updated successfully", order });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  PlaceOrder,
  PlaceOrderStripe,
  userOrders,
  allOrders,
  updateStatus,
  VerifyStripe,
  markItemPaid,
  updateOrderStatus,
};

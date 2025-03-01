const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/mongodb");
const cloudinary = require("./config/cloudinary.js");

dotenv.config();

const app = express();

connectDB();
cloudinary();

// Middleware
const corsOptions = {
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "token"],
  credentials: true,
};
app.use(cors(corsOptions));

app.use(cors(corsOptions));

app.use(express.urlencoded({ extended: true })); // Parse URL-encoded data
app.use(express.json()); // Parse JSON data

// Root route
app.get("/", (req, res) => {
  res.send("Hello world");
});

// API routes
const userRouter = require("./routes/userRoutes.js");
app.use("/api/user", userRouter);

const productRouter = require("./routes/productRoute.js");
app.use("/api/product", productRouter);

const cartRouter = require("./routes/cartRoute.js");
app.use("/api/cart", cartRouter);

const OrderRouter = require("./routes/orderRoute.js");
app.use("/api/orders", OrderRouter);

const subscribeRoute = require("./routes/subscribeRoute.js");
app.use("/api/subscribe", subscribeRoute);

const contactusRouter = require("./routes/contactusRoute.js");
app.use("/api/contactus", contactusRouter);

const reviewRouter = require("./routes/reviewRouter.js");
app.use("/api/reviews", reviewRouter);

const myAccountRouter = require("./routes/myAccountRouter.js");
app.use("/api/my-account", myAccountRouter);

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () =>
  console.log(`Server is started successfully on port ${PORT}`)
);

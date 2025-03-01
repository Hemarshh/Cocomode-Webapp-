const express = require("express");
const subscribeRoute = express.Router();

const subscribeController = require("../controllers/subscribeController");

// POST /api/subscribe
subscribeRoute.post("/", subscribeController);

module.exports = subscribeRoute;

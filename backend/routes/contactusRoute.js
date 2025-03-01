const express = require("express");
const contactusRouter = express.Router();
const {
  sendUsaMessage,
  fetchUsaMessage,
} = require("../controllers/contactusController");

contactusRouter.post("/", sendUsaMessage);
contactusRouter.get("/", fetchUsaMessage);

module.exports = contactusRouter;

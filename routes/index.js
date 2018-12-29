const express = require("express");
const ExpressRouter = express.Router();

ExpressRouter.get("/", (req, res, next) => {
  res.render("welcome");
});

module.exports = ExpressRouter;

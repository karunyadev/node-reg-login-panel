const express = require("express");
const ExpressRouter = express.Router();
const { ensureAuthenticated } = require("../config/auth");
ExpressRouter.get("/", (req, res, next) => {
  res.render("welcome");
});
ExpressRouter.get("/dashboard", ensureAuthenticated, (req, res, next) => {
  res.render("dashboard", { name : req.user.name });
});
module.exports = ExpressRouter;

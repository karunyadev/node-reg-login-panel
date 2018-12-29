const express = require("express");
const ExpressRouter = express.Router();

//Login Page
ExpressRouter.get("/login", (req, res, next) => {
  res.render("login");
});
//Register Page
ExpressRouter.get("/register", (req, res, next) => {
  res.render("register");
});
module.exports = ExpressRouter;

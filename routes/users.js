const express = require("express");
const ExpressRouter = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
//Login Page
ExpressRouter.get("/login", (req, res, next) => {
  res.render("login");
});
//Register Page
ExpressRouter.get("/register", (req, res, next) => {
  res.render("register");
});
//Register handle
ExpressRouter.post("/register", (req, res, next) => {
  // console.log(req.body);
  const { name, email, password, password2 } = req.body;
  let errors = [];
  if (name.trim() === "" || email.trim() === "" || password.trim() === "") {
    errors.push({ msg: "Please fill in all the fields" });
  }
  if (password.trim().toLowerCase() !== password2.trim().toLowerCase()) {
    errors.push({ msg: "Passwords do not match" });
  }
  if (password.trim().length < 8) {
    errors.push({ msg: "Password must be atleast 8 characters long" });
  }
  if (errors.length > 0) {
    res.render("register", { errors: errors, name, password, password2 });
  } else {
    //Validation passed
    User.findOne({ email: email }).then(user => {
      if (user) {
        errors.push({ msg: "Email is already registered" });
        res.render("register", { errors, name, email, password, password2 });
      }
      const newUser = new User({
        name,
        email,
        password
      });
      bcrypt.genSalt(12, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          //set the password to hash
          newUser.password = hash;
          //save the user
          newUser
            .save()
            .then(user => {
              req.flash("success_msg", "You are now registered and can login");
              res.redirect("/users/login");
            })
            .catch(err => console.log(err));
        });
      });
    });
  }
});

//Login Handler
ExpressRouter.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/users/login",
    failureFlash: true
  })(req, res, next);
});

//Logout handler
ExpressRouter.get("/logout", (req, res, next) => {
  req.logout();
  req.flash("success_msg", "You are now logged out!");
  res.redirect("/users/login");
});

module.exports = ExpressRouter;

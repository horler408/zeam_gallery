const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const User = require("../models/user");
const Product = require("./../models/product");

exports.signup = (req, res) => res.render("register");
exports.signin = (req, res) => res.render("login");

exports.register = (req, res, next) => {
  const {name, email, phone, role, password, password2} = req.body
  let errors = [];

  if(!name || !email || !phone || !password || !password2) {
    errors.push("Please fill all the fields")
  }
  if(password.length < 6) {
    errors.push("Password must be atleast 6 characters long")
  }
  if(password != password2) {
    errors.push("Passwords must match")
  }

  if(errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      phone
    })
  }
  User.findOne({email: email})
  .then(user => {
    if(user) {
      return res.render("register", {msg: "User Already Exists"})
    }
    else {
      bcrypt.hash(password, 10).then((hash) => {
        const user = new User({
          _id: new mongoose.Types.ObjectId(),
          name,
          email,
          phone,
          role,
          password: hash,
        });
        user
          .save()
          .then(() => {
            res.render("login", {msg: "Your registration was successful, You can now log in"})
            // res.status(201).json({
            //   message: "User added successfully",
            // });
          })
          .catch((error) => {
            return res.status(500).json({
              error: error
            });
          });
        })
    }
  })
};

exports.login = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        req.flash("error_msg", "User Not Found!")
        return res.redirect("/api/auth/login");
        // return res.status(401).json({
        //   message: "User not found!"
        // });
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            req.flash("error_msg", "Incorrect username or password!")
            res.redirect("/api/auth/login");
            // return res.status(404).json({
            //   message: "Incorrect username or password!"
            // });
          }else {
            const token = jwt.sign({ userId: user._id }, "RANDOM_TOKEN_SECRET", {
              expiresIn: "2h",
            });
            // Product.findOne({id: req.params._id}).then(product => {
            //   res.render("details", {
            //     msg: "Successfully logged in",
            //     product,
            //     role: user.role,
            //     token: token
            //   })
            // })
            res.render("dashboard", {
              msg: "Successfully logged in",
              user: user,
              token: token
            })
            // res.status(200).json({
            //   message: "Success",
            //   token
            // })
          }
        })
        .catch((error) => {
          res.status(500).json({
            message: "Authentication Error!"
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Server Error!"
      });
    });
};

exports.users = (req, res) => {
  User.find().exec()
  .then(users => {
    res.render('users', {users})
    //res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
}

exports.deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id })
  .then(() => {
    res.status(200).json({
      message: "Deleted Successfully!"
    });
   })
  .catch(error => {
    res.status(404).json({
      error: error
    });
  })
}  


const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

exports.signup = (req, res) => res.render("register");
exports.signin = (req, res) => res.render("login");

exports.register = (req, res, next) => {
  const {name, email, phone, role, password, password2} = req.body
  let errors = [];

  if(!name || !email || !phone || !password || password2) {
    errors.push("Please all the fields")
  }
  if(password.length < 6) {
    errors.push("Password must be atleast 6 characters long")
  }
  if(password2 != password2) {
    errors.push("Passwords must match")
  }

  if(errors.length > 0) {
    res.render("register", {
      errors,
      name,
      email,
      phone,
      role
    })
  }
  bcrypt.hash(password, 10).then((hash) => {
    const user = new User({
      name,
      email,
      phone,
      role,
      password: hash,
    });
    user
      .save()
      .then(() => {
        // res.render("login", {msg: "Your registration was successful, You can now log in"})
        res.status(201).json({
          message: "User added successfully",
        });
      })
      .catch((error) => {
        res.status(500).json({
          error: error,
        });
      });
  });
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
              expiresIn: "12h",
            });
            req.flash("success_msg", "Logged in successfully")
            res.redirect("/api/product")
            
            return res.status(200).json({
              role: user.role,
              userId: user._id,
              token: token
            });
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
    res.status(200).json(users)
  })
  .catch(err => {
    res.status(500).json({
      error: err
    })
  })
}

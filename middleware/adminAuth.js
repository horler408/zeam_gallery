const jwt = require("jsonwebtoken");
const User = require("../models/user");

module.exports = (req, res, next) => {
  try {
    User.findOne({ email: req.body.email })
    .then(user => {
        if (user.role != 'admin' ) {
          req.flash("error_msg", "You are not authorised")
          res.redirect("/")
        } else {
          next();
        }
    })
  } catch {
    req.flash("error_msg", "Authentication Failed!")
    res.redirect("/api/auth/login");
  }
};

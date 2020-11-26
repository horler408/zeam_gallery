const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    req.user = decodedToken
    if (req.body.userId && req.body.userId !== userId) {
      req.flash("error_msg", "You are not authorised")
      res.redirect("/")
    } else {
      next();
    }
  } catch {
    req.flash("error_msg", "Authentication Failed!")
    res.redirect("/api/auth/login")
    // res.status(401).json({
    //   message: "Invalid request!"
    // });
  }
};

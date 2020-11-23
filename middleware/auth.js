const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
    const userId = decodedToken.userId;
    if (req.body.userId && req.body.userId !== userId) {
      req.flash("error_msg", "Unauthorized to Non admin user")
      res.redirect("/")
    } else {
      next();
    }
  } catch {
    req.flash("error_msg", "Unauthorised User, only admin is authorised to access that page")
    res.redirect("/")
    // res.status(401).json({
    //   message: "Invalid request!"
    // });
  }
};

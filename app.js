const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts')
const session = require("express-session");
const path = require("path");
const dotenv = require("dotenv");
const flash = require("connect-flash");

const stuffRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index");
const orderRoutes = require("./routes/order");

const dbConnect = require("./config/db");

const app = express();

dbConnect();
dotenv.config();

// CORS

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs');

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Static Files
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static('./public'));
//app.use(express.static('/images'));


//Express Session
app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
    })
  );

//Connect Flash
app.use(flash());

// Global variables
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    next();
  });

//Routes
app.use('/', indexRoutes)
app.use("/api/product", stuffRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);

//Error Handling
app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

// Undefined Routes
app.get("*", function(req, res) {
  //logger.info("users route");
  res.send("App works!!!!!");
})

module.exports = app;

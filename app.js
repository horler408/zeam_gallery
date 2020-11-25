const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require('express-ejs-layouts')
const session = require("express-session");
const path = require("path");
const flash = require("connect-flash");

const stuffRoutes = require("./routes/product");
const userRoutes = require("./routes/user");
const indexRoutes = require("./routes/index")

const dbConnect = require("./config/dbRemote");

const app = express();

dbConnect();

// EJS
app.use(expressLayouts)
app.set('view engine', 'ejs');

// Bode Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Static Files
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.static('./public'));

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
app.use("/api/auth", userRoutes);

module.exports = app;

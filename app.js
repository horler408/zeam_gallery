const express = require('express');
const path = require('path');

const dbConnect = require('./config/db')

const indexRoute = require('./routes/indexRoute');
const userRoute = require('./routes/userRoute')

// Init app
const app = express();

dbConnect();

// EJS
app.set('view engine', 'ejs');

// Public Folder
app.use(express.static('./public'));

// Routes
app.use('/', indexRoute);
app.use('/', userRoute);


// Server
const port = 3000;
app.listen(port, () => console.log(`Server started on port ${port}`));
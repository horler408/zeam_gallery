const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://arseling:UhXoJsWXNbNNjgGk@cluster0.nnle7.mongodb.net/<fashion-shop>?retryWrites=true&w=majority",
      { 
        useNewUrlParser: true,
        useUnifiedTopology: true, 
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
    });
};

module.exports = dbConnect;

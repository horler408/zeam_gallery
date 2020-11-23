const mongoose = require("mongoose");

//Pass: UhXoJsWXNbNNjgGk
//mongodb+srv://horler408:<password>@cluster0.nnle7.mongodb.net/<dbname>?retryWrites=true&w=majority

const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://arseling:UhXoJsWXNbNNjgGk@cluster0.nnle7.mongodb.net/<dbname>?retryWrites=true&w=majority",
      { useNewUrlParser: true }
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

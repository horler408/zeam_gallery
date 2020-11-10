const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose
    .connect(
      "mongodb+srv://horler408:" +
        process.env.MONGO_ATLAS_PW +
        "@cluster0.nnle7.mongodb.net/test?retryWrites=true&w=majority",
      { useNewUrlParser: true, useUnifiedTopology: true }
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

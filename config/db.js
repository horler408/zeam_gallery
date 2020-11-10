const mongoose = require("mongoose");

const dbConnect = () => {
  mongoose.connect("mongodb://localhost:27017/multer-upload", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });
  const db = mongoose.connection;

  db.on("error", (err) => {
    console.log(err);
  });

  db.once("open", () => {
    console.log("Database Connection Established!");
  });
}

module.exports = dbConnect;

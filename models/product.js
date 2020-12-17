const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "https://drive.google.com/file/d/17m6tt2hKqGTbKkJr4kbT_kRp9UnVVlgW/view?usp=sharing"},
  price: { type: Number, required: true },
  category: { type: String, required: true}
});

module.exports = mongoose.model("Product", productSchema);

const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, default: "https://unsplash.com/photos/k6aQzmIbR1s"},
  price: { type: Number, required: true },
  category: { type: String, required: true}
});

module.exports = mongoose.model("Product", productSchema);

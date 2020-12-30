const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String},
  price: { type: Number, required: true },
  category: { type: String, required: true},
  featured: { type: Boolean, default: false }
});

module.exports = mongoose.model("Product", productSchema);

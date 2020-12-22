const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, 
    default: "https://res.cloudinary.com/horlertech/image/upload/v1608630116/headless_native_gs8uw3.png"},
  price: { type: Number, required: true },
  category: { type: String, required: true}
});

module.exports = mongoose.model("Product", productSchema);

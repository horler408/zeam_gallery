const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    imageUrl: { type: String, required: true },
    userId: { type: String, required: true },
    price: { type: Number, required: true }
})

const User = mongoose.model("User", userSchema);

module.exports = User;
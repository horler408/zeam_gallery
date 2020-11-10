const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    myImage: {type: String, required: true}
})

const User = mongoose.model("User", userSchema);

module.exports = User;
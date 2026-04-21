const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    role: String, // donor or hospital
    bloodType: String,
    location: String,
    availability: Boolean
});

module.exports = mongoose.model("User", userSchema);
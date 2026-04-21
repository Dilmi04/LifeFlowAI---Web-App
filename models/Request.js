const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
    hospitalId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    bloodType: {
        type: String,
        required: true
    },

    unitsRequired: {
        type: Number,
        required: true
    },

    location: {
        type: String,
        required: true
    },

    urgency: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },

    status: {
        type: String,
        enum: ["pending", "fulfilled"],
        default: "pending"
    },

    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Request", requestSchema);
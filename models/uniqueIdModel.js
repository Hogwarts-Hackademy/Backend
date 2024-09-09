const mongoose = require("mongoose");

// Define the schema for the counter
const counterSchema = mongoose.Schema({
	type: { type: String, required: true, unique: true }, // 'S', 'P', or 'H'
	count: { type: Number, default: 0 }, // Counter for each type
});

// Create the model for counter
const counterCollection = mongoose.model("counters", counterSchema);

module.exports = { counterCollection };

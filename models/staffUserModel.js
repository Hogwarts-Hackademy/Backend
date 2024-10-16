const mongoose = require("mongoose");

const staffUserSchema = mongoose.Schema({
	username: { type: String, required: true },
	password: { type: String, required: true },
	role: { type: String, default: "user" },
});

const staffUserCollection = mongoose.model("staffusers", staffUserSchema);

module.exports = { staffUserCollection };

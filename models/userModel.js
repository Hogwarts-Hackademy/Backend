const mongoose = require("mongoose");
const healthSyncDB = require("../databases/healthSyncDatabase");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

const userCollection = mongoose.model("users", userSchema);

module.exports = { userCollection };

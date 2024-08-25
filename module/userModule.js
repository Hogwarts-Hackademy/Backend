const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
});

const userCollection = mongoose.model("users", userSchema);

module.exports = {
  userCollection,
  create: (field) => {
    const user = new userCollection(field);
    return user.save();
  },
};

const mongoose = require("mongoose");
const config = require("../config/config.js");

const testDB = mongoose.createConnection(config.testDbmongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

testDB.on("connected", () => {
  console.log("test Database Connected");
});

testDB.on("error", () => {
  console.log("ERROR: While Connecting test Database");
});

module.exports = testDB;

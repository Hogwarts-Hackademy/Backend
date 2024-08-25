const mongoose = require("mongoose");
const config = require("./config/config.js");

mongoose.connect(config.mongoURI);

const con = mongoose.connection;

con.on("connected", () => {
  console.log("Database Connected");
});

con.on("error", () => {
  console.log("ERROR: While Connecting Database");
});

module.exports = con;

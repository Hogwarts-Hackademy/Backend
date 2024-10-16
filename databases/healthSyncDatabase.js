const mongoose = require("mongoose");
const config = require("../config/config.js");

mongoose.connect(config.GlobalDbmongoURI);

const con = mongoose.connection;

con.on("connected", () => {
  console.log("Health-Sync Database Connected");
});

con.on("error", () => {
  console.log("ERROR: While Connecting Health-Sync Database");
});

module.exports = con;

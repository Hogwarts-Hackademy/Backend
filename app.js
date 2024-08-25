const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config.js");
const db = require("./database");

const app = express();

// CORS support
app.use(cors(config.corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Controllers
const userController = require("./controller/userController");

// Routes
app.post("/register", userController.create);
app.post("/login", userController.login);
app.get("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.redirect("/login");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Server
app.listen(config.serverPort, () => {
  console.log(`Server is running on http://localhost:${config.serverPort}`);
});

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const db = require("./database");

// express app
const app = express();

// CORS support
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
app.use(cors(corsOptions));

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
  res.cookie("token", "", { expires: new Date(0) }); // Clear token cookie
  res.redirect("/login");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Server
app.listen(5000, () => {
  console.log("Server is running on http://localhost:5000");
});

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config.js");
const globalDB = require("./databases/healthSyncDatabase.js");
const testDB = require("./databases/testDatabase.js");

//app
const app = express();

// Import routes
const hospitalProfileRoutes = require("./routes/hospitalProfileRoutes");
const userRoutes = require("./routes/userRoutes");

// Use routes
app.use("/api", hospitalProfileRoutes);
app.use("/api/users", userRoutes);

// CORS support
app.use(cors(config.corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Server
app.listen(config.serverPort, () => {
  console.log(`Server is running on http://localhost:${config.serverPort}`);
});

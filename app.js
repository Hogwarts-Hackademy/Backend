const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config.js");
const globalDB = require("./databases/healthSyncDatabase.js");

//app
const app = express();
app.use(express.json());

// Import routes
const patientRoutes = require("./routes/patientRoutes");
const staffRoutes = require("./routes/staffRoutes");
const hospitalProfileRoutes = require("./routes/hospitalProfileRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

// Routes
app.use("/api/hospital", hospitalProfileRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/user", userRoutes);
app.use("/api/staff", staffRoutes);

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

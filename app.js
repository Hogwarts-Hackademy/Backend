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
const opdQueueRoutes = require("./routes/opdQueueRoutes.js");
const prescriptionRoutes = require("./routes/prescriptionRoutes.js");

// Routes
app.use("/api/hospital", hospitalProfileRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/user", userRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/routes/opd", opdQueueRoutes);
app.use("/api/prescription", prescriptionRoutes);

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
app.listen(config.serverPort, config.serverHost, () => {
  console.log(
    `Server is running on http://${config.serverHost}:${config.serverPort}`
  );
});

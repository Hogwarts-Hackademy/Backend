const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const config = require("./config/config.js");
const cron = require("node-cron");
const globalDB = require("./databases/healthSyncDatabase.js");

//helper
const { deleteOldAppointments } = require("./helper/deleteApoinment.js");

//app
const app = express();
app.use(express.json());

// Import routes
const patientRoutes = require("./routes/patientRoutes");
const staffRoutes = require("./routes/staffRoutes");
const hospitalProfileRoutes = require("./routes/hospitalProfileRoutes.js");
const staffUserRoutes = require("./routes/staffUserRoutes.js");
const opdQueueRoutes = require("./routes/opdQueueRoutes.js");
const prescriptionRoutes = require("./routes/prescriptionRoutes.js");
const appointmentRoutes = require("./routes/appointmentRoutes.js");
const userRoutes = require("./routes/userRoutes.js");

// Routes
app.use("/api/hospital", hospitalProfileRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/staff-user", staffUserRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/routes/opd", opdQueueRoutes);
app.use("/api/prescription", prescriptionRoutes);
app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", userRoutes);

// CORS support
app.use(cors(config.corsOptions));

// Schedule the job to run at 12 AM daily
cron.schedule(
  "0 0 * * *",
  () => {
    console.log("Running daily cleanup of old appointments...");
    deleteOldAppointments();
  },
  {
    scheduled: true,
    timezone: "Asia/Kolkata", // Use the appropriate timezone
  }
);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

app.get("/", (req, res) => {
  res.render("index.ejs");
});

// Server
app.listen(config.serverPort, config.serverHost, () => {
  console.log(
    `Server is running on http://${config.serverHost}:${config.serverPort}`
  );
});

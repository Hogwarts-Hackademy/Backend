const express = require("express");
const router = express.Router();
const appointmentController = require("../controller/appointmentController");

router.post("/add", appointmentController.addAppointment);

router.get("/search", appointmentController.getAppointments);

module.exports = router;

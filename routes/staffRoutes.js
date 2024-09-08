const express = require("express");
const router = express.Router();
const staffController = require("../controller/staffController");

router.post("/add", staffController.addStaff);

router.get("/fetchone", staffController.getStaff);

router.post("/add-schedule", staffController.addSchedulingToStaff);

router.get("/fetch-schedule", staffController.getScheduling);

router.get("/search-doctor", staffController.getDoctorByFilter);

module.exports = router;

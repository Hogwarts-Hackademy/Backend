const express = require("express");
const router = express.Router();
const opdQueueController = require("../controller/opdQueueController");

router.post("/add-patient-visit", opdQueueController.addPatientVisit);

module.exports = router;

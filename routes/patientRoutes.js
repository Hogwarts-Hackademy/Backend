const express = require("express");
const router = express.Router();
const patientController = require("../controller/patientController");

router.post("/add-patients", patientController.createPatient);
router.post("/add-visit", patientController.addVisitHistory);

module.exports = router;

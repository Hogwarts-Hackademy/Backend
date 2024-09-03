const express = require("express");
const router = express.Router();
const patientController = require("../controller/patientController");

router.post("/register-patients", patientController.createPatient);

module.exports = router;

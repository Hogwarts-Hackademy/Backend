const express = require("express");
const router = express.Router();
const patientController = require("../controller/patientController");

router.post("/register", patientController.createPatient);

router.get("/fetchone", patientController.getPatient);

router.get("/fetchall", patientController.getAllPatients);

module.exports = router;

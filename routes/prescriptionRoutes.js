const express = require("express");
const router = express.Router();
const prescriptionController = require("../controller/prescriptionController");

router.post("/add-tests", prescriptionController.addTestsToPrescription);
router.post(
  "/add-medications",
  prescriptionController.addMedicationsToPrescription
);
router.post("/add-notes", prescriptionController.addNotesToPrescription);
router.get(
  "/prescription/:patientId",
  prescriptionController.getPrescriptionByPatientId
);

module.exports = router;

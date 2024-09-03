const { prescriptionCollection } = require("../models/prescriptionModel");

// Add tests to an existing prescription
module.exports.addTestsToPrescription = async (req, res) => {
  try {
    const { patientId, tests } = req.body;

    const prescription = await prescriptionCollection.findOneAndUpdate(
      { patientId },
      { $push: { tests: { $each: tests } } },
      { new: true }
    );

    if (!prescription) {
      return res
        .status(404)
        .json({ error: "Prescription not found for the patient" });
    }

    res.status(200).json({ data: prescription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add medications to an existing prescription
module.exports.addMedicationsToPrescription = async (req, res) => {
  try {
    const { patientId, medications } = req.body;

    const prescription = await prescriptionCollection.findOneAndUpdate(
      { patientId },
      { $push: { medications: { $each: medications } } },
      { new: true }
    );

    if (!prescription) {
      return res
        .status(404)
        .json({ error: "Prescription not found for the patient" });
    }

    res.status(200).json({ data: prescription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add doctor's notes to an existing prescription
module.exports.addNotesToPrescription = async (req, res) => {
  try {
    const { patientId, notes } = req.body;

    const prescription = await prescriptionCollection.findOneAndUpdate(
      { patientId },
      { $push: { doctorNotes: notes } },
      { new: true }
    );

    if (!prescription) {
      return res
        .status(404)
        .json({ error: "Prescription not found for the patient" });
    }

    res.status(200).json({ data: prescription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a specific prescription by patient ID
module.exports.getPrescriptionByPatientId = async (req, res) => {
  try {
    const { patientId } = req.params;
    const prescription = await prescriptionCollection.findOne({ patientId });

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    res.status(200).json({ data: prescription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

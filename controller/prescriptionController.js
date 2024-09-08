const { prescriptionCollection } = require("../models/prescriptionModel");
const moment = require("moment-timezone");

// Add tests to an existing prescription
// Add tests to an existing prescription using prescriptionID
module.exports.addTestsToPrescription = async (req, res) => {
  try {
    const { prescriptionID, tests } = req.body;

    const prescription = await prescriptionCollection.findOneAndUpdate(
      { prescriptionID },
      { $push: { tests: { $each: tests } } },
      { new: true }
    );

    if (!prescription) {
      return res
        .status(404)
        .json({ error: "Prescription not found with the given ID" });
    }

    res.status(200).json({ data: prescription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add medications to an existing prescription using prescriptionID
module.exports.addMedicationsToPrescription = async (req, res) => {
  try {
    const { prescriptionID, medications } = req.body;

    const prescription = await prescriptionCollection.findOneAndUpdate(
      { prescriptionID },
      { $push: { medications: { $each: medications } } },
      { new: true }
    );

    if (!prescription) {
      return res
        .status(404)
        .json({ error: "Prescription not found with the given ID" });
    }

    res.status(200).json({ data: prescription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add doctor's notes to an existing prescription using prescriptionID
module.exports.addNotesToPrescription = async (req, res) => {
  try {
    const { prescriptionID, notes } = req.body;

    const prescription = await prescriptionCollection.findOneAndUpdate(
      { prescriptionID },
      { $push: { doctorNotes: { $each: notes } } },
      { new: true }
    );

    if (!prescription) {
      return res
        .status(404)
        .json({ error: "Prescription not found with the given ID" });
    }

    res.status(200).json({ data: prescription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adjustToIST = (date) => {
  return moment(date).tz("Asia/Kolkata").format(); // Convert to IST and format as ISO string
};

// Get a specific prescription by patient ID
module.exports.getPatientVisit = async (req, res) => {
  try {
    const { prescriptionID } = req.query;

    // Fetch the prescription by prescriptionID
    const prescription = await prescriptionCollection.findOne({
      prescriptionID,
    });

    if (!prescription) {
      return res.status(404).json({ error: "Prescription not found" });
    }

    prescription.visitDate = adjustToIST(prescription.visitDate);

    res.status(200).json({ data: prescription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

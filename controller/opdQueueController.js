const { patientCollection } = require("../models/patientModel");
const { prescriptionCollection } = require("../models/prescriptionModel");

// Function to add a new patient visit and generate a token
module.exports.addPatientVisit = async (req, res) => {
  try {
    const { patientId, visitDate, department } = req.body;

    // Find the patient
    const patient = await patientCollection.findOne({ patientID: patientId });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    // Generate token based on department and queue length
    const tokenNumber = await generateTokenForDepartment(department);

    // Create a new prescription entry
    const newPrescription = {
      patientId: patient._id,
      patientName: patient.fullName,
      visitDate,
      department,
      physician: await assignPhysician(department),
      tokenNumber,
    };

    const prescription = await prescriptionCollection.createPrescription(
      newPrescription
    );

    // Add visit to patient history
    patient.visitHistory.push({
      dateOfVisit: visitDate,
      attendingPhysician: newPrescription.physician,
      prescriptions: prescription._id,
    });

    await patient.save();

    res.status(201).json({ data: prescription });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to generate a token for the department
const generateTokenForDepartment = async (department) => {
  // Logic to generate token number based on the queue length
  // This is a placeholder implementation
  const latestToken = await prescriptionCollection.findOne(
    { department },
    { sort: { tokenNumber: -1 } }
  );
  return latestToken ? latestToken.tokenNumber + 1 : 1;
};

// Function to assign a physician based on the department
const assignPhysician = async (department) => {
  // Logic to select a physician based on the department
  // This is a placeholder implementation
  return "Dr. John Doe"; // Replace with actual physician assignment logic
};

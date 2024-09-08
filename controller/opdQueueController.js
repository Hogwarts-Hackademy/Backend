const moment = require("moment-timezone");
const { patientCollection } = require("../models/patientModel");
const { prescriptionCollection } = require("../models/prescriptionModel");
const {
  departmentQueueCollection,
} = require("../models/departmentOpdQueueSchema");
const { v4: uuidv4 } = require("uuid");

// Function to generate a token for the department
const generateTokenForDepartment = async (department) => {
  // Find the department queue
  let departmentQueue = await departmentQueueCollection.findOne({ department });

  if (!departmentQueue) {
    // If no queue exists, create a new queue with the first token
    departmentQueue = new departmentQueueCollection({
      department,
      tokens: [], // Initialize with an empty array
    });
    await departmentQueue.save();
    return 1; // Return the first token
  }

  // Get the latest token number
  const latestToken =
    departmentQueue.tokens.length > 0
      ? departmentQueue.tokens[departmentQueue.tokens.length - 1]
      : { tokenNumber: 0 };

  return latestToken.tokenNumber + 1;
};

// Function to assign a physician based on the department
const assignPhysician = async (department) => {
  // Placeholder implementation
  return "Dr. John Doe"; // Replace with actual logic
};

// Function to adjust visit date to IST
const adjustToIST = (date) => {
  return moment(date).tz("Asia/Kolkata").format(); // Convert to IST and format as ISO string
};

// Function to add a new patient visit and generate a token

module.exports = {
  addPatientVisit: async (req, res) => {
    try {
      const { patientID, department } = req.body;

      const patient = await patientCollection.findOne({ patientID });
      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      const tokenNumber = await generateTokenForDepartment(department);
      const physician = await assignPhysician(department);

      const newPrescription = {
        prescriptionID: uuidv4(), // Generate a unique prescription ID
        patientId: patient._id,
        patientName: patient.fullName,
        visitDate: adjustToIST(new Date()), // Set the current date and time
        department,
        physician,
        tokenNumber,
      };

      const prescription = await prescriptionCollection.create(newPrescription);

      patient.visitHistory.push({
        dateOfVisit: newPrescription.visitDate,
        attendingPhysician: newPrescription.physician,
        prescriptions: prescription.prescriptionID,
      });

      await patient.save();

      await departmentQueueCollection.findOneAndUpdate(
        { department },
        {
          $push: {
            tokens: {
              tokenNumber,
              patientId: patient._id,
              physician,
              status: "Waiting",
            },
          },
        },
        { new: true, upsert: true }
      );

      res.status(201).json({ data: prescription });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

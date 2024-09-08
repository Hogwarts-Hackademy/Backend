const moment = require("moment-timezone");
const { patientCollection } = require("../models/patientModel");
const { prescriptionCollection } = require("../models/prescriptionModel");
const {
  departmentQueueCollection,
} = require("../models/departmentOpdQueueSchema");
const { convertToIST } = require("../functions/timestampConverter");

// Function to generate a token for the department
const generateTokenForDepartment = async (department) => {
  // Find the department queue
  let departmentQueue = await departmentQueueCollection.findOne({
    department,
  });

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
module.exports.addPatientVisit = async (req, res) => {
  try {
    const { patientID, department } = req.body;
    const visitDate = Date.now();
    const patient = await patientCollection.findOne({ patientID });
    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }
    const tokenNumber = await generateTokenForDepartment(department);
    const physician = await assignPhysician(department);

    const newPrescription = {
      patientId: patient._id,
      patientName: patient.fullName,
      visitDate,
      department,
      physician,
      tokenNumber,
    };

    const prescription = await prescriptionCollection.create(newPrescription);

    patient.visitHistory.push({
      dateOfVisit: visitDate,
      attendingPhysician: physician,
      prescriptions: prescription._id,
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

    // Manually select only the required fields for the response
    const responsePrescription = {
      ...prescription.toObject(), // Convert Mongoose document to plain JavaScript object
      visitDate: convertToIST(prescription.visitDate), // Convert to IST
    };

    res.status(201).json(responsePrescription);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Function to fetch current and next token number details
// Function to fetch the current and next token details
module.exports.fetchQueueDetails = async (req, res) => {
  try {
    const { department } = req.query;
    if (!department) {
      return res.status(400).json({ error: "Department is required" });
    }

    // Find the department queue
    const departmentQueue = await departmentQueueCollection.findOne({
      department,
    });

    if (!departmentQueue) {
      return res.status(404).json({ error: "Department not found" });
    }

    // Fetch tokens with status "In Progress"
    const inProgressToken = departmentQueue.tokens.find(
      (token) => token.status === "In Progress"
    );

    // Fetch the next token in line or the first "Waiting" token if none are "In Progress"
    let nextToken;
    if (inProgressToken) {
      nextToken = departmentQueue.tokens.find(
        (token) => token.tokenNumber === inProgressToken.tokenNumber + 1
      );
    }

    if (!nextToken) {
      nextToken = departmentQueue.tokens.find(
        (token) => token.status === "Waiting"
      );
    }

    // Prepare response data
    const response = {
      currentToken: inProgressToken || null,
      nextToken: nextToken || null,
    };

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

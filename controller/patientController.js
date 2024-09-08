const { patientCollection } = require("../models/patientModel");
const { convertToIST } = require("../functions/timestampConverter");

module.exports = {
  // Function to create a new patient
  createPatient: async (req, res) => {
    try {
      // Destructure req.body and exclude visitHistory
      const { visitHistory, ...patientData } = req.body;

      // Create the patient without visitHistory
      const patient = await patientCollection.create(patientData);

      res.status(201).json(patient);
    } catch (error) {
      if (error.code === 11000) {
        // Handle duplicate key error
        res.status(400).json({
          error: "Patient ID already exists. Please use a different ID.",
        });
      } else {
        // Handle other errors
        res.status(400).json({ error: error.message });
      }
    }
  },

  getPatient: async (req, res) => {
    const { patientID } = req.query; // Assuming patientID is passed as a route parameter

    try {
      const patient = await patientCollection.findOne({ patientID });

      if (!patient) {
        return res.status(404).json({ error: "Patient not found." });
      }

      // Remove visitHistory from the patient object
      const { visitHistory, ...patientData } = patient.toObject();

      res.status(200).json(patientData);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while fetching patient details.",
      });
    }
  },

  // Function to get all patients
  getAllPatients: async (req, res) => {
    try {
      const patients = await patientCollection.find();

      // Remove visitHistory from each patient object
      const updatedPatients = patients.map((patient) => {
        const { visitHistory, ...patientData } = patient.toObject();
        return patientData;
      });

      res.status(200).json(updatedPatients);
    } catch (error) {
      res.status(500).json({
        error: "An error occurred while fetching patient details.",
      });
    }
  },

  fetchPatientVisits: async (req, res) => {
    try {
      const { patientID } = req.query;

      if (!patientID) {
        return res.status(400).json({ error: "Patient ID is required" });
      }

      // Fetch the patient by patientID and only include visitHistory in the result
      const patient = await patientCollection.findOne(
        { patientID },
        { visitHistory: 1, _id: 0 } // Include visitHistory and exclude _id
      );

      if (!patient) {
        return res.status(404).json({ error: "Patient not found" });
      }

      // Return the visitHistory field
      res.status(200).json({ visitHistory: patient.visitHistory });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

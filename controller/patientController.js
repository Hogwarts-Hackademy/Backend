const { patientCollection } = require("../models/patientModel");

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

	// Function to add visit history to an existing patient
	addVisitHistory: async (req, res) => {
		const { patientID } = req.params; // Assuming patientID is passed as a route parameter
		const visit = req.body; // Assuming visit details are sent in the request body

		try {
			const patient = await patientCollection.findOneAndUpdate(
				{ patientID: patientID },
				{ $push: { visitHistory: visit } },
				{ new: true } // Returns the updated document
			);

			if (!patient) {
				return res.status(404).json({ error: "Patient not found" });
			}

			res.status(200).json(patient);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	getPatient: async (req, res) => {
		const { patientID } = req.query; // Assuming patientID is passed as a route parameter

		try {
			const patient = await patientCollection.findOne({ patientID });

			if (!patient) {
				return res.status(404).json({ error: "Patient not found." });
			}

			res.status(200).json(patient);
		} catch (error) {
			res.status(500).json({
				error: "An error occurred while fetching patient details.",
			});
		}
	},

	// Function to get all patients
	getAllPatients: async (req, res) => {
		try {
			const patients = await patientCollection.find({});

			res.status(200).json(patients);
		} catch (error) {
			res.status(500).json({
				error: "An error occurred while fetching patient details.",
			});
		}
	},
};

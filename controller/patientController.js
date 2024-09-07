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

			// Convert dateOfVisit in visitHistory to IST
			const updatedVisitHistory = patient.visitHistory.map((visit) => ({
				...visit.toObject(),
				dateOfVisit: convertToIST(visit.dateOfVisit),
			}));

			// Send response with updated visitHistory
			const response = {
				...patient.toObject(),
				visitHistory: updatedVisitHistory,
			};

			res.status(200).json(response);
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

			// Convert dateOfVisit in visitHistory to IST for all patients
			const updatedPatients = patients.map((patient) => {
				const updatedVisitHistory = patient.visitHistory.map(
					(visit) => ({
						...visit.toObject(),
						dateOfVisit: convertToIST(visit.dateOfVisit),
					})
				);

				return {
					...patient.toObject(),
					visitHistory: updatedVisitHistory,
				};
			});

			res.status(200).json(updatedPatients);
		} catch (error) {
			res.status(500).json({
				error: "An error occurred while fetching patient details.",
			});
		}
	},
};

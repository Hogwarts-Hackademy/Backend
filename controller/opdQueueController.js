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

		const prescription = await prescriptionCollection.create(
			newPrescription
		);

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

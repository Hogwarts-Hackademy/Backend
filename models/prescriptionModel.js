const mongoose = require("mongoose");

// Define the Prescription schema
const prescriptionSchema = new mongoose.Schema({
	prescriptionID: { type: String, required: true, unique: true }, // Custom ID field
	patientId: {
		type: String,
		ref: "Patient",
		required: true,
	},
	patientName: { type: String, required: true },
	visitDate: { type: Date, required: true },
	department: { type: String, required: true },
	physician: { type: String },
	tokenNumber: { type: Number, required: true },
	medications: [
		{
			medicationName: String,
			dosageInstructions: String,
			duration: String,
			refills: String,
		},
	],
	tests: [
		{
			testName: String,
			status: {
				type: String,
				enum: ["Ordered", "In Progress", "Completed"],
			},
			result: String,
		},
	],
	doctorNotes: [
		{
			note: String,
			date: { type: Date, default: Date.now },
		},
	],
});

// Create the Prescription model
const prescriptionCollection = mongoose.model(
	"Prescription",
	prescriptionSchema
);

module.exports = { prescriptionCollection };

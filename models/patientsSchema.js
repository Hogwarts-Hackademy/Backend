const mongoose = require("mongoose");
const healthSyncDB = require("../databases/healthSyncDatabase");

const patientSchema = mongoose.Schema({
  patientID: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  contactInformation: {
    phone: String,
    email: String,
    address: String,
  },
  nationalID: { type: String, unique: true },
  medicalHistory: {
    allergies: [String],
    pastSurgeries: [String],
    chronicConditions: [String],
    currentMedications: [String],
  },
  insuranceDetails: {
    provider: String,
    policyNumber: String,
    coverageDetails: String,
  },
  emergencyContact: {
    name: String,
    relationship: String,
    contactInformation: String,
  },
  visitHistory: [
    {
      date: Date,
      reason: String,
      attendingPhysician: String,
      diagnosticReports: [String],
      prescriptions: [String],
    },
  ],
});

const patientCollection = healthSyncDB.model("patients", patientSchema);

module.exports = {
  patientCollection,
  create: (field) => {
    const patient = new patientCollection(field);
    return patient.save();
  },
};

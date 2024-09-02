const mongoose = require("mongoose");
const healthSyncDB = require("../databases/healthSyncDatabase.js");

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
  nationalID: { type: String, required: true },
  medicalHistory: {
    allergies: [String],
    pastSurgeries: [String],
    chronicConditions: [String],
    currentMedications: [String],
  },
  insuranceDetails: {
    insuranceProvider: String,
    policyNumber: String,
    coverageDetails: String,
  },
  emergencyContact: {
    name: String,
    relationship: String,
    contactInformation: {
      phone: String,
      email: String,
    },
  },
  visitHistory: [
    {
      dateOfVisit: Date,
      reasonForVisit: String,
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

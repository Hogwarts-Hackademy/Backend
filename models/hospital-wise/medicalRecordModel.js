const mongoose = require("mongoose");
const healthSyncDB = require("../../databases/healthSyncDatabase.js");

const medicalRecordSchema = mongoose.Schema({
  recordID: { type: String, required: true, unique: true },
  patientID: { type: String, required: true },
  dateOfRecord: { type: Date, required: true },
  diagnosis: String,
  treatmentPlan: String,
  testResults: [String],
  notes: String,
});

const medicalRecordCollection = healthSyncDB.model(
  "medical_records",
  medicalRecordSchema
);

module.exports = {
  medicalRecordCollection,
  create: (field) => {
    const medicalRecord = new medicalRecordCollection(field);
    return medicalRecord.save();
  },
};

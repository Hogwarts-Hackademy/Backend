const mongoose = require("mongoose");
const healthSyncDB = require("../../databases/healthSyncDatabase.js");

const laboratorySchema = mongoose.Schema({
  labID: { type: String, required: true, unique: true },
  labName: { type: String, required: true },
  equipmentAvailable: [String],
  staffAssigned: [String],
  testTypes: [String],
  inventory: [
    {
      testID: String,
      testName: String,
      testDescription: String,
      price: Number,
    },
  ],
  patientTests: [
    {
      testID: String,
      patientID: String,
      dateOfTest: Date,
      testResults: String,
    },
  ],
});

const laboratoryCollection = healthSyncDB.model(
  "laboratories",
  laboratorySchema
);

module.exports = {
  laboratoryCollection,
  create: (field) => {
    const laboratory = new laboratoryCollection(field);
    return laboratory.save();
  },
};

const mongoose = require("mongoose");
const healthSyncDB = require("../../databases/healthSyncDatabase.js");

const bedSchema = mongoose.Schema({
  bedID: { type: String, required: true, unique: true },
  bedNumber: { type: String, required: true },
  roomNumber: { type: String, required: true },
  wardDepartment: { type: String, required: true },
  typeOfBed: { type: String, required: true },
  occupancyStatus: {
    status: { type: String, enum: ["Occupied", "Available"], required: true },
    patientAssigned: String,
    admissionDate: Date,
    expectedDischargeDate: Date,
  },
  queueManagement: [
    {
      queueNumber: Number,
      patientID: String,
      status: { type: String, enum: ["Waiting", "Admitted", "Discharged"] },
      timestamp: Date,
    },
  ],
});

const bedCollection = healthSyncDB.model("beds", bedSchema);

module.exports = {
  bedCollection,
  create: (field) => {
    const bed = new bedCollection(field);
    return bed.save();
  },
};

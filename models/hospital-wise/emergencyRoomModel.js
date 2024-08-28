const mongoose = require("mongoose");
const healthSyncDB = require("../../databases/healthSyncDatabase.js");

const emergencyRoomSchema = mongoose.Schema({
  roomID: { type: String, required: true, unique: true },
  roomNumber: { type: String, required: true },
  capacity: { type: Number, required: true },
  currentOccupancy: { type: Number, required: true },
  equipmentAvailable: [String],
  staffAssigned: [String],
  patientAssignments: [
    {
      patientID: String,
      admissionDate: Date,
      dischargeDate: Date,
      currentStatus: {
        type: String,
        enum: ["Stable", "Critical", "UnderObservation"],
      },
    },
  ],
});

const emergencyRoomCollection = healthSyncDB.model(
  "emergency_rooms",
  emergencyRoomSchema
);

module.exports = {
  emergencyRoomCollection,
  create: (field) => {
    const emergencyRoom = new emergencyRoomCollection(field);
    return emergencyRoom.save();
  },
};

const mongoose = require("mongoose");
const healthSyncDB = require("../../databases/healthSyncDatabase.js");

const appointmentSchema = mongoose.Schema({
  appointmentID: { type: String, required: true, unique: true },
  patientName: { type: String, required: true },
  doctorName: { type: String, required: true },
  dateAndTime: { type: Date, required: true },
  department: { type: String, required: true },
  purposeOfVisit: String,
  appointmentStatus: {
    type: String,
    enum: ["Scheduled", "Completed", "Cancelled"],
    required: true,
  },
  notes: String,
});

const appointmentCollection = healthSyncDB.model(
  "appointments",
  appointmentSchema
);

module.exports = {
  appointmentCollection,
  create: (field) => {
    const appointment = new appointmentCollection(field);
    return appointment.save();
  },
};

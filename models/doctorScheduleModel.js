const mongoose = require("mongoose");
const healthSyncDB = require("../databases/healthSyncDatabase");

const doctorScheduleSchema = mongoose.Schema({
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",
    required: true,
  },
  department: { type: String, required: true },
  dayOfWeek: { type: String, required: true }, // e.g., Monday, Tuesday, etc.
  startTime: { type: String, required: true }, // e.g., "09:00"
  endTime: { type: String, required: true }, // e.g., "17:00"
});

const doctorScheduleCollection = mongoose.model(
  "doctorSchedules",
  doctorScheduleSchema
);

module.exports = {
  doctorScheduleCollection,
};

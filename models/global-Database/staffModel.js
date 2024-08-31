const mongoose = require("mongoose");
const healthSyncDB = require("../../databases/healthSyncDatabase.js");

const staffSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  contactInformation: {
    phone: String,
    email: String,
    address: String,
  },
  nationalID: { type: String, required: true },
  professionalDetails: {
    jobTitle: String,
    department: String,
    specialization: String,
    yearsOfExperience: Number,
    licenseNumber: String,
  },
  scheduleShiftDetails: String,
});

const staffCollection = healthSyncDB.model("staff", staffSchema);

module.exports = {
  staffCollection,
  create: (field) => {
    const staff = new staffCollection(field);
    return staff.save();
  },
};

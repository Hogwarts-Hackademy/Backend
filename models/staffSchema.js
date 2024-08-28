const mongoose = require("mongoose");
const healthSyncDB = require("../databases/healthSyncDatabase");

const staffSchema = mongoose.Schema({
  staffID: { type: String, required: true, unique: true },
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  gender: { type: String, required: true },
  contactInformation: {
    phone: String,
    email: String,
    address: String,
  },
  nationalID: { type: String, unique: true },
  professionalDetails: {
    jobTitle: { type: String, required: true },
    department: String,
    specialization: String,
    yearsOfExperience: Number,
    licenseNumber: String,
    schedule: String,
  },
  employmentHistory: [String],
  salaryAndBenefits: String,
});

const staffCollection = healthSyncDB.model("staff", staffSchema);

module.exports = {
  staffCollection,
  create: (field) => {
    const staff = new staffCollection(field);
    return staff.save();
  },
};

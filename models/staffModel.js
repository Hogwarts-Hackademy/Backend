const mongoose = require("mongoose");
const healthSyncDB = require("../databases/healthSyncDatabase.js");

const staffSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true }, // Matches 'dob' in the form
  gender: { type: String, required: true },
  contactInformation: {
    phone: { type: String, required: true }, // Matches 'Contact No.' in the form
    address: { type: String, required: true }, // Matches 'House address' in the form
  },
  nationalID: { type: String, required: true }, // Matches 'National ID' in the form
  professionalDetails: {
    specialization: { type: String, required: true }, // Matches 'Specialization' in the form
    department: { type: String, required: true }, // Matches 'Department' in the form
    jobTitle: { type: String, required: true }, // Added for 'Staff Type' field
    yearsOfExperience: { type: Number, required: true }, // Matches 'Years of Experience' in the form
    licenseNumber: { type: String, required: true }, // Matches 'License Number' in the form
  },
  scheduleShiftDetails: { type: String },
});

const staffCollection = healthSyncDB.model("staff", staffSchema);

module.exports = {
  staffCollection,
  create: (field) => {
    const staff = new staffCollection(field);
    return staff.save();
  },
};

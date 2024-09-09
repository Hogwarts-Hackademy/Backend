const mongoose = require("mongoose");

const staffSchema = mongoose.Schema({
  staffID: { type: String, required: true, unique: true },
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
    jobTitle: { type: String, required: true },
    yearsOfExperience: { type: Number, required: true }, // Matches 'Years of Experience' in the form
    licenseNumber: { type: String }, // Matches 'License Number' in the form
  },
  hospitalID: { type: String, required: true },
  staffType: { type: String, required: true },
  scheduling: {
    workSchedule: [
      {
        day: { type: String, required: true }, // e.g., "Monday"
        timeSlots: [
          {
            startTime: { type: String, required: true }, // e.g., "09:00 AM"
            endTime: { type: String, required: true }, // e.g., "05:00 PM"
          },
        ],
      },
    ],
    vacations: [
      {
        startDate: { type: Date },
        endDate: { type: Date },
        reason: { type: String },
      },
    ],
    leaves: [
      {
        leaveDate: { type: Date },
        reason: { type: String },
      },
    ],
  },
});

const staffCollection = mongoose.model("staff", staffSchema);

module.exports = { staffCollection };

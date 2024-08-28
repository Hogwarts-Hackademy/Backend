const mongoose = require("mongoose");
const healthSyncDB = require("../databases/healthSyncDatabase.js");

const hrSchema = mongoose.Schema({
  hrID: { type: String, required: true, unique: true },
  employeeID: { type: String, required: true },
  fullName: { type: String, required: true },
  department: { type: String, required: true },
  position: { type: String, required: true },
  hireDate: { type: Date, required: true },
  salary: Number,
  benefits: [String],
  performanceReviews: [
    {
      reviewDate: Date,
      performanceRating: String,
      comments: String,
    },
  ],
  trainingHistory: [
    {
      trainingName: String,
      dateOfTraining: Date,
      provider: String,
      completionStatus: String,
    },
  ],
});

const hrCollection = healthSyncDB.model("hr", hrSchema);

module.exports = {
  hrCollection,
  create: (field) => {
    const hr = new hrCollection(field);
    return hr.save();
  },
};

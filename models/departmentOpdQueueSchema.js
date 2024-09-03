const mongoose = require("mongoose");

const departmentQueueSchema = mongoose.Schema({
  department: { type: String, required: true },
  tokens: [
    {
      tokenNumber: { type: Number, required: true },
      patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "patients",
        required: true,
      },
      physician: {
        type: String, // Change this to ObjectId when you have a physician model
        required: true,
      },
      status: {
        type: String,
        enum: ["Waiting", "In Progress", "Completed"],
        default: "Waiting",
      },
    },
  ],
});

const departmentQueueCollection = mongoose.model(
  "departmentQueues",
  departmentQueueSchema
);

module.exports = {
  departmentQueueCollection,
};

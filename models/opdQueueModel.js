const mongoose = require("mongoose");
const healthSyncDB = require("../databases/healthSyncDatabase");

const opdQueueSchema = mongoose.Schema({
  department: { type: String, required: true },
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "patients",
    required: true,
  },
  tokenNumber: { type: Number, required: true },
  physician: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "doctors",
    required: true,
  },
  status: {
    type: String,
    enum: ["Waiting", "In Progress", "Completed"],
    default: "Waiting",
  },
});

const opdQueueCollection = mongoose.model("opdQueues", opdQueueSchema);

module.exports = {
  opdQueueCollection,
};

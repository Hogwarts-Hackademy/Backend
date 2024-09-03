import { Schema, model } from "mongoose";
import healthSyncDB from "../databases/healthSyncDatabase";

const queueSchema = Schema({
  department: { type: String, required: true },
  date: { type: Date, required: true },
  patients: [
    {
      patientId: {
        type: Schema.Types.ObjectId,
        ref: "patients",
        required: true,
      },
      token: { type: Number, required: true },
      status: {
        type: String,
        enum: ["Waiting", "In Progress", "Completed"],
        required: true,
      },
    },
  ],
});

const queueCollection = model("queues", queueSchema);

export default {
  queueCollection,
  addToQueue: (department, patientId) => {
    const date = new Date();
    return queueCollection.findOneAndUpdate(
      { department, date: date.toISOString().split("T")[0] },
      {
        $push: {
          patients: {
            patientId,
            token: { $inc: { "patients.token": 1 } },
            status: "Waiting",
          },
        },
      },
      { new: true, upsert: true }
    );
  },
};

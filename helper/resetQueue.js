const {
  departmentQueueCollection,
} = require("../models/departmentOpdQueueSchema");

// Function to reset all department queues
const resetQueues = async () => {
  try {
    await departmentQueueCollection.updateMany(
      {},
      { $set: { tokens: [] } } // Clear the tokens array
    );
    console.log("All department queues have been reset.");
  } catch (error) {
    console.error("Error resetting department queues:", error);
  }
};

module.exports = resetQueues; // Export the function

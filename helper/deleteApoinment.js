const { appointmentCollection } = require("../models/appointmentModel");

// Function to delete appointments older than 24 hours
const deleteOldAppointments = async () => {
  const now = new Date();
  const cutoffDate = new Date(now - 24 * 60 * 60 * 1000); // 24 hours ago

  try {
    await appointmentCollection.deleteMany({
      appointmentDate: { $lt: cutoffDate },
    });
    console.log("Old appointments deleted successfully.");
  } catch (error) {
    console.error("Error deleting old appointments:", error.message);
  }
};

module.exports = deleteOldAppointments;

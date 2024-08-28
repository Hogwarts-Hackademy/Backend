const { emergencyRoomCollection } = require("../models/emergencyRoomSchema");

module.exports = {
  createEmergencyRoom: async (req, res) => {
    try {
      const emergencyRoom = await emergencyRoomCollection.create(req.body);
      res.status(201).json(emergencyRoom);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

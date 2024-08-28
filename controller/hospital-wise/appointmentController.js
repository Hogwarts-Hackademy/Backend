const { appointmentCollection } = require("../models/appointmentSchema");

module.exports = {
  createAppointment: async (req, res) => {
    try {
      const appointment = await appointmentCollection.create(req.body);
      res.status(201).json(appointment);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

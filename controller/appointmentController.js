const { appointmentCollection } = require("../models/appointmentModel");

module.exports = {
  addAppointment: async (req, res) => {
    try {
      const { doctorId, patientId, appointmentDate, appointmentTime } =
        req.body;

      const newAppointment = new appointmentCollection({
        doctorId,
        patientId,
        appointmentDate,
        appointmentTime,
      });

      const savedAppointment = await newAppointment.save();
      res.status(201).json({ data: savedAppointment });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAppointments: async (req, res) => {
    try {
      const { doctorId, patientId } = req.query;

      const filter = {};
      if (doctorId) filter.doctorId = doctorId;
      if (patientId) filter.patientId = patientId;

      const appointments = await appointmentCollection.find(filter);
      res.status(200).json({ data: appointments });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

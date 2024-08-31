const {
  patientCollection,
} = require("../../models/global-Database/patientsModel");

module.exports = {
  createPatient: async (req, res) => {
    try {
      const patient = await patientCollection.create(req.body);
      res.status(201).json(patient);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

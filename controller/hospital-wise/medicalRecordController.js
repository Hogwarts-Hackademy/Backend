const { medicalRecordCollection } = require("../models/medicalRecordSchema");

module.exports = {
  createMedicalRecord: async (req, res) => {
    try {
      const medicalRecord = await medicalRecordCollection.create(req.body);
      res.status(201).json(medicalRecord);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

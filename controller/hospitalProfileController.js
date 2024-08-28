const {
  hospitalProfileCollection,
} = require("../models/hospitalProfileSchema");

module.exports = {
  createHospitalProfile: async (req, res) => {
    try {
      const profile = await hospitalProfileCollection.create(req.body);
      res.status(201).json(profile);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

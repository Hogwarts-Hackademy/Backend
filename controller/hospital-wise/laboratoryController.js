const { laboratoryCollection } = require("../models/laboratorySchema");

module.exports = {
  createLaboratory: async (req, res) => {
    try {
      const laboratory = await laboratoryCollection.create(req.body);
      res.status(201).json(laboratory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

const { hrCollection } = require("../models/hrModel");

module.exports = {
  createHR: async (req, res) => {
    try {
      const hr = await hrCollection.create(req.body);
      res.status(201).json(hr);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

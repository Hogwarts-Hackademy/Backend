const { bedCollection } = require("../models/bedSchema");

module.exports = {
  createBed: async (req, res) => {
    try {
      const bed = await bedCollection.create(req.body);
      res.status(201).json(bed);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

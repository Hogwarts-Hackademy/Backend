const { pharmacyCollection } = require("../models/pharmacySchema");

module.exports = {
  createPharmacy: async (req, res) => {
    try {
      const pharmacy = await pharmacyCollection.create(req.body);
      res.status(201).json(pharmacy);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

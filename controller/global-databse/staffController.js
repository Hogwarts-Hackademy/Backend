const { staffCollection } = require("../models/staffSchema");

module.exports = {
  createStaff: async (req, res) => {
    try {
      const staff = await staffCollection.create(req.body);
      res.status(201).json(staff);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

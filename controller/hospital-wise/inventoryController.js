const { inventoryCollection } = require("../models/inventorySchema");

module.exports = {
  createInventory: async (req, res) => {
    try {
      const inventory = await inventoryCollection.create(req.body);
      res.status(201).json(inventory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

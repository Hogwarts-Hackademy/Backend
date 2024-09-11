const { consumableInventoryCollection } = require("../models/consumableModel");

// Utility function to generate a unique ID for items
const generateItemId = async () => {
  const lastItem = await consumableInventoryCollection
    .findOne({}, { _id: 0, itemId: 1 })
    .sort({ itemId: -1 });

  if (lastItem) {
    const lastIdNumber = parseInt(lastItem.itemId.replace("ITEM", ""));
    const newIdNumber = lastIdNumber + 1;
    return `ITEM${newIdNumber.toString().padStart(3, "0")}`;
  } else {
    return "ITEM001"; // Default first ID
  }
};

module.exports = {
  addConsumableItem: async (req, res) => {
    try {
      const { itemName, batchNumber, supplierDetails } = req.body;

      // Check for duplicates based on itemName, batchNumber, and supplier
      const duplicateItem = await consumableInventoryCollection.findOne({
        itemName,
        batchNumber,
        supplierDetails,
      });

      if (duplicateItem) {
        return res.status(409).json({
          error: "Duplicate entry: The item already exists in the inventory.",
        });
      }

      // Generate unique item ID
      const itemId = await generateItemId();

      // Create new consumable item
      const newItem = new consumableInventoryCollection({
        ...req.body,
        itemId,
      });

      const savedItem = await newItem.save();
      res.status(201).json({ data: savedItem });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllConsumableItems: async (req, res) => {
    try {
      const consumables = await consumableInventoryCollection.find();
      res.status(200).json(consumables);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updateConsumableItem: async (req, res) => {
    try {
      const updatedItem = await consumableInventoryCollection.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      if (!updatedItem) {
        return res.status(404).json({ error: "Consumable item not found" });
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deleteConsumableItem: async (req, res) => {
    try {
      const deletedItem = await consumableInventoryCollection.findByIdAndDelete(
        req.params.id
      );
      if (!deletedItem) {
        return res.status(404).json({ error: "Consumable item not found" });
      }
      res.status(200).json({ message: "Consumable item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchConsumableItems: async (req, res) => {
    try {
      const { itemName, category, supplier } = req.query;
      const query = {};
      if (itemName) query.itemName = { $regex: itemName, $options: "i" };
      if (category) query.category = category;
      if (supplier) query.supplierDetails = { $regex: supplier, $options: "i" };

      const results = await consumableInventoryCollection.find(query);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

const {
  pharmaceuticalInventoryCollection,
} = require("../models/pharmaceuticalModel");

// Utility function to generate a unique ID for pharmaceuticals
const generatePharmaceuticalId = async () => {
  const lastItem = await pharmaceuticalInventoryCollection
    .findOne({}, { _id: 0, drugId: 1 })
    .sort({ drugId: -1 });

  if (lastItem) {
    const lastIdNumber = parseInt(lastItem.drugId.replace("DRUG", ""));
    const newIdNumber = lastIdNumber + 1;
    return `DRUG${newIdNumber.toString().padStart(3, "0")}`;
  } else {
    return "DRUG001"; // Default first ID
  }
};

module.exports = {
  addPharmaceuticalItem: async (req, res) => {
    try {
      const { drugName, batchNumber, manufacturer } = req.body;

      // Check for duplicates based on drugName, batchNumber, and manufacturer
      const duplicateItem = await pharmaceuticalInventoryCollection.findOne({
        drugName,
        batchNumber,
        manufacturer,
      });

      if (duplicateItem) {
        return res.status(409).json({
          error: "Duplicate entry: The pharmaceutical item already exists.",
        });
      }

      // Generate unique drug ID
      const drugId = await generatePharmaceuticalId();

      // Create new pharmaceutical item
      const newItem = new pharmaceuticalInventoryCollection({
        ...req.body,
        drugId,
      });

      const savedItem = await newItem.save();
      res.status(201).json({ data: savedItem });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  getAllPharmaceuticalItems: async (req, res) => {
    try {
      const medicines = await pharmaceuticalInventoryCollection.find();
      res.status(200).json(medicines);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  updatePharmaceuticalItem: async (req, res) => {
    try {
      const updatedItem =
        await pharmaceuticalInventoryCollection.findByIdAndUpdate(
          req.params.id,
          req.body,
          { new: true }
        );
      if (!updatedItem) {
        return res.status(404).json({ error: "Pharmaceutical item not found" });
      }
      res.status(200).json(updatedItem);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  deletePharmaceuticalItem: async (req, res) => {
    try {
      const deletedItem =
        await pharmaceuticalInventoryCollection.findByIdAndDelete(
          req.params.id
        );
      if (!deletedItem) {
        return res.status(404).json({ error: "Pharmaceutical item not found" });
      }
      res
        .status(200)
        .json({ message: "Pharmaceutical item deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  searchPharmaceuticalItems: async (req, res) => {
    try {
      const { drugName, classification, manufacturer } = req.query;
      const query = {};
      if (drugName) query.drugName = { $regex: drugName, $options: "i" };
      if (classification) query.drugClassification = classification;
      if (manufacturer)
        query.manufacturer = { $regex: manufacturer, $options: "i" };

      const results = await pharmaceuticalInventoryCollection.find(query);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

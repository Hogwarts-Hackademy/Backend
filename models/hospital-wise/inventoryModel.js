const mongoose = require("mongoose");
const healthSyncDB = require("../../databases/healthSyncDatabase.js");

const inventorySchema = mongoose.Schema({
  inventoryID: { type: String, required: true, unique: true },
  itemName: { type: String, required: true },
  category: { type: String, required: true },
  quantityAvailable: { type: Number, required: true },
  dateOfPurchase: { type: Date, required: true },
  batchNumber: String,
  supplierDetails: {
    name: String,
    contact: String,
  },
  pricePerUnit: Number,
  totalCost: Number,
  expiryDate: Date,
  storageConditions: String,
  reorderLevel: Number,
  usageHistory: [
    {
      dateOfUse: Date,
      quantityUsed: Number,
      department: String,
    },
  ],
});

const inventoryCollection = healthSyncDB.model("inventory", inventorySchema);

module.exports = {
  inventoryCollection,
  create: (field) => {
    const inventory = new inventoryCollection(field);
    return inventory.save();
  },
};

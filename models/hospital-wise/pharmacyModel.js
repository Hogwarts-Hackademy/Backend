const mongoose = require("mongoose");
const healthSyncDB = require("../../databases/healthSyncDatabase.js");

const pharmacySchema = mongoose.Schema({
  medicationID: { type: String, required: true, unique: true },
  medicationName: { type: String, required: true },
  dosage: String,
  quantityAvailable: { type: Number, required: true },
  supplierDetails: {
    name: String,
    contact: String,
  },
  pricePerUnit: Number,
  expiryDate: Date,
  usageInstructions: String,
  stockHistory: [
    {
      dateOfPurchase: Date,
      quantityPurchased: Number,
      purchasePrice: Number,
      batchNumber: String,
    },
  ],
});

const pharmacyCollection = healthSyncDB.model("pharmacy", pharmacySchema);

module.exports = {
  pharmacyCollection,
  create: (field) => {
    const pharmacy = new pharmacyCollection(field);
    return pharmacy.save();
  },
};

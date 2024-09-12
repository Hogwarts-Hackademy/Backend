const mongoose = require("mongoose");

const dispensingHistorySchema = new mongoose.Schema({
	dateOfDispensing: { type: Date, required: true },
	quantityDispensed: { type: Number, required: true },
	departmentOrUnit: { type: String, required: true },
});

const medicineItemSchema = new mongoose.Schema({
	drugId: { type: String, required: true, unique: true },
	drugName: { type: String, required: true },
	drugClassification: { type: String, required: true }, // e.g., antibiotic, analgesic
	formulation: { type: String, required: true }, // e.g., syrup, tablet, injection
	strength: { type: String, required: true }, // e.g., 500 mg, 250 IU
	quantityAvailable: { type: Number, required: true },
	dateOfPurchase: { type: Date, required: true },
	batchNumber: { type: String, required: true },
	manufacturer: { type: String, required: true },
	supplierDetails: { type: String, required: true },
	purchasePrice: { type: Number, required: true },
	sellingPrice: { type: Number, required: true },
	totalCost: { type: Number, required: true },
	expiryDate: { type: Date, required: true },
	storageConditions: { type: String, required: true },
	reorderLevel: { type: Number, required: true },
	dispensingHistory: [dispensingHistorySchema], // Array of dispensing history
});

const pharmaceuticalInventoryCollection = mongoose.model(
	"MedicineItem",
	medicineItemSchema
);

module.exports = { pharmaceuticalInventoryCollection };

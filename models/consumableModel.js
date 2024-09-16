const mongoose = require("mongoose");

const usageHistorySchema = new mongoose.Schema({
	dateOfUse: { type: Date, required: true },
	quantityUsed: { type: Number, required: true },
	departmentOrUnit: { type: String, required: true },
});

const consumableItemSchema = new mongoose.Schema({
	itemId: { type: String, required: true, unique: true },
	itemName: { type: String, required: true },
	category: {
		type: String,
		enum: ["sterile", "non-sterile"],
		required: true,
	},
	quantityAvailable: { type: Number, required: true },
	dateOfPurchase: { type: Date, required: true },
	batchNumber: { type: String, required: true },
	supplierDetails: { type: String, required: true },
	pricePerUnit: { type: Number, required: true },
	totalCost: { type: Number, required: true },
	expiryDate: { type: Date, required: true },
	storageConditions: { type: String, required: true },
	reorderLevel: { type: Number, required: true },
	usageHistory: [usageHistorySchema], // Array of usage history
});

const consumableInventoryCollection = mongoose.model(
	"ConsumableItem",
	consumableItemSchema
);

module.exports = { consumableInventoryCollection };

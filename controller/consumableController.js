const { consumableInventoryCollection } = require("../models/consumableModel");
const { generateUniqueID } = require("../helper/idGenerator");

module.exports = {
	addConsumableItem: async (req, res) => {
		try {
			const {
				itemName,
				category,
				quantityAvailable,
				dateOfPurchase,
				batchNumber,
				supplierDetails,
				pricePerUnit,
				totalCost,
				expiryDate,
				storageConditions,
				reorderLevel,
			} = req.body;

			// Validate required fields
			if (
				!itemName ||
				!category ||
				!quantityAvailable ||
				!batchNumber ||
				!supplierDetails
			) {
				return res
					.status(400)
					.json({ error: "Required fields are missing or invalid." });
			}

			// Check for duplicates based on itemName, batchNumber, and supplierDetails
			const duplicateItem = await consumableInventoryCollection.findOne({
				itemName,
				batchNumber,
				supplierDetails,
			});

			if (duplicateItem) {
				return res.status(409).json({
					error: "Duplicate entry: The consumable item already exists.",
				});
			}

			// Generate unique item ID
			const itemId = await generateUniqueID("ITEM");

			// Create new consumable item
			const newItem = await consumableInventoryCollection.create({
				itemId,
				itemName,
				category,
				quantityAvailable,
				dateOfPurchase,
				batchNumber,
				supplierDetails,
				pricePerUnit,
				totalCost,
				expiryDate,
				storageConditions,
				reorderLevel,
			});

			res.status(201).json(newItem);
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
			const updatedItem =
				await consumableInventoryCollection.findByIdAndUpdate(
					req.params.id,
					req.body,
					{ new: true }
				);
			if (!updatedItem) {
				return res
					.status(404)
					.json({ error: "Consumable item not found" });
			}
			res.status(200).json(updatedItem);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	deleteConsumableItem: async (req, res) => {
		try {
			const deletedItem =
				await consumableInventoryCollection.findByIdAndDelete(
					req.params.id
				);
			if (!deletedItem) {
				return res
					.status(404)
					.json({ error: "Consumable item not found" });
			}
			res.status(200).json({
				message: "Consumable item deleted successfully",
			});
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
			if (supplier)
				query.supplierDetails = { $regex: supplier, $options: "i" };

			const results = await consumableInventoryCollection.find(query);
			res.status(200).json(results);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

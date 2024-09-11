const { counterCollection } = require("../models/uniqueIdModel");

const generateUniqueID = async (prefix) => {
	const counterDoc = await counterCollection.findOneAndUpdate(
		{ type: prefix },
		{ $inc: { count: 1 } },
		{ new: true, upsert: true }
	);

	// Generate the new ID with leading zeros
	const newID = `${prefix}${counterDoc.count.toString().padStart(3, "0")}`;

	return newID;
};

module.exports = { generateUniqueID };

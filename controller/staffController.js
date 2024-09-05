const { staffCollection } = require("../models/staffModel");

module.exports = {
	addStaff: async (req, res) => {
		try {
			const {
				staffID,
				fullName,
				dateOfBirth,
				gender,
				contactInformation,
				nationalID,
				professionalDetails,
			} = req.body;

			const staff = await staffCollection.create({
				staffID,
				fullName,
				dateOfBirth,
				gender,
				contactInformation,
				nationalID,
				professionalDetails,
			});
            
			res.status(201).json(staff);
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	getStaff: async (req, res) => {
		try {
			const { staffID } = req.query;

			if (!staffID) {
				return res
					.status(400)
					.json({
						error: "Staff ID is required to fetch staff details.",
					});
			}

			const staff = await staffCollection.findOne({ staffID });

			if (!staff) {
				return res.status(404).json({ error: "Staff not found." });
			}

			res.status(200).json(staff);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

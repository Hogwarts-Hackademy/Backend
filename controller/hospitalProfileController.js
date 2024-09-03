const { hospitalProfileCollection } = require("../models/hospitalProfileModel");

module.exports = {
	createHospitalProfile: async (req, res) => {
		try {
			// Destructure and validate required fields
			const {
				hospitalID,
				name,
				location,
				contactInformation,
				established,
				ownership,
				affiliations,
				missionStatement,
				visionStatement,
				coreValues,
				infrastructure,
				medicalStaff,
				administrativeStaff,
				servicesOffered,
				patientCareAndSafety,
				technologyAndInnovation,
				contactDetails,
			} = req.body;

			// Check if required fields are present
			if (!name || !location) {
				return res
					.status(400)
					.json({ error: "Name and location are required." });
			}

			// Create hospital profile
			const profile = await hospitalProfileCollection.create({
				hospitalID,
				name,
				location,
				contactInformation,
				established,
				ownership,
				affiliations,
				missionStatement,
				visionStatement,
				coreValues,
				infrastructure,
				medicalStaff,
				administrativeStaff,
				servicesOffered,
				patientCareAndSafety,
				technologyAndInnovation,
				contactDetails,
			});

			// Return created profile
			res.status(201).json(profile);
		} catch (error) {
			if (error.code === 11000) {
				// Handle duplicate key error
				res.status(400).json({
					error: "Hospital ID already exists. Please use a different ID.",
				});
			} else {
				// Handle other errors
				res.status(400).json({ error: error.message });
			}
		}
	},

	// Add other controller methods as needed
};

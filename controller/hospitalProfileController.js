const { hospitalProfileCollection } = require("../models/hospitalProfileModel");
const { generateUniqueID } = require("../helper/idGenerator");

module.exports = {
	createHospitalProfile: async (req, res) => {
		try {
			const hospitalID = await generateUniqueID("H");

			const {
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

	getHospitalProfile: async (req, res) => {
		const { hospitalID } = req.query; // Assuming hospitalID is passed as a route parameter

		try {
			const profile = await hospitalProfileCollection.findOne({
				hospitalID,
			});

			if (!profile) {
				return res
					.status(404)
					.json({ error: "Hospital profile not found." });
			}

			res.status(200).json(profile);
		} catch (error) {
			res.status(500).json({
				error: "An error occurred while fetching the hospital profile.",
			});
		}
	},

	getHospitalBySearch: async (req, res) => {
		try {
			const { search } = req.query;

			// Build the search filter
			const filter = {};

			if (search) {
				const searchRegex = new RegExp(search, "i"); // Case-insensitive regex for better matching
				filter.$or = [
					{ name: searchRegex }, // Search by hospital name
					{ location: searchRegex }, // Search by location
				];
			}
			// Query the database with the filter and select only required fields
			const hospitals = await hospitalProfileCollection
				.find(filter)
				.select("name location contactInformation.phone");

			// Return the list of hospitals
			res.status(200).json({ data: hospitals });
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
	// Function to get all hospital profiles
	getAllHospitalProfiles: async (req, res) => {
		try {
			const profiles = await hospitalProfileCollection.find({});

			res.status(200).json(profiles);
		} catch (error) {
			res.status(500).json({
				error: "An error occurred while fetching hospital profiles.",
			});
		}
	},

	addDepartment: async (req, res) => {
		try {
			const { hospitalID, departmentName, wards, opdRooms } = req.body; // Accept hospitalID in the body

			// Validate input
			if (!hospitalID || !departmentName || !wards || !opdRooms) {
				return res
					.status(400)
					.json({ error: "All fields are required." });
			}

			// Find the hospital profile by hospitalID
			const hospital = await hospitalProfileCollection.findOne({
				hospitalID,
			});

			if (!hospital) {
				return res
					.status(404)
					.json({ error: "Hospital profile not found." });
			}

			// Add department with ward and OPD information
			hospital.infrastructure.departments.push({
				name: departmentName,
				wards,
				opdRooms,
			});

			// Save the updated hospital profile
			await hospital.save();

			res.status(200).json({
				message: `Department ${departmentName} added successfully.`,
				hospital,
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},
};

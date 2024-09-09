const { staffCollection } = require("../models/staffModel");
const { hospitalProfileCollection } = require("../models/hospitalProfileModel");
const { generateUniqueID } = require("../helper/idGenerator");

module.exports = {
	addStaff: async (req, res) => {
		try {
			const staffID = await generateUniqueID("S");

			const {
				fullName,
				dateOfBirth,
				gender,
				contactInformation,
				nationalID,
				professionalDetails,
				staffType,
				hospitalID,
			} = req.body;

			const staff = await staffCollection.create({
				staffID,
				fullName,
				dateOfBirth,
				gender,
				contactInformation,
				nationalID,
				professionalDetails,
				staffType,
				hospitalID,
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
				return res.status(400).json({
					error: "Staff ID is required to fetch staff details.",
				});
			}

			const staff = await staffCollection.findOne({ staffID });

			if (!staff) {
				return res.status(404).json({ error: "Staff not found." });
			}

			// Only returning relevant fields including scheduling information if present
			res.status(200).json(staff);
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	addSchedulingToStaff: async (req, res) => {
		try {
			const { staffID, scheduling } = req.body;

			const staff = await staffCollection.findOneAndUpdate(
				{ staffID },
				{ $set: { scheduling } },
				{ new: true, upsert: true }
			);

			if (!staff) {
				return res.status(404).json({ error: "Staff not found." });
			}

			res.status(200).json({ data: staff });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},

	getScheduling: async (req, res) => {
		try {
			const { staffID } = req.query;

			if (!staffID) {
				return res.status(400).json({
					error: "Staff ID is required to fetch the schedule.",
				});
			}

			const staff = await staffCollection.findOne({ staffID });

			if (!staff) {
				return res.status(404).json({ error: "Staff not found." });
			}

			res.status(200).json({
				schedule: staff.scheduling || null, // Return schedule if available
			});
		} catch (error) {
			res.status(500).json({ error: error.message });
		}
	},

	getDoctorByFilter: async (req, res) => {
		try {
			const { name, department, hospital, city } = req.query;

			// Build the query object with case-insensitive partial matching
			let query = {
				"professionalDetails.jobTitle": "Doctor", // Only search for doctors
			};

			if (name) {
				query.fullName = { $regex: name, $options: "i" }; // Partial and case-insensitive name search
			}
			if (department) {
				query["professionalDetails.department"] = {
					$regex: department,
					$options: "i",
				}; // Partial department match
			}
			if (hospital) {
				// Fetch hospitals matching the partial hospital name
				const matchedHospitals = await hospitalProfileCollection.find({
					name: { $regex: hospital, $options: "i" },
				});

				// Extract hospital IDs from matched hospitals
				const hospitalIDs = matchedHospitals.map(
					(hosp) => hosp.hospitalID
				);

				// Add hospital ID filter if any hospitals were found
				if (hospitalIDs.length > 0) {
					query.hospitalID = { $in: hospitalIDs };
				} else {
					return res
						.status(404)
						.json({ error: "No matching hospitals found" });
				}
			}
			if (city) {
				query["contactInformation.address"] = {
					$regex: city,
					$options: "i",
				}; // Partial city match
			}

			// Find doctors based on the query
			const doctors = await staffCollection
				.find(query)
				.select("fullName hospitalID professionalDetails.department");

			// Fetch hospital names for each doctor based on hospitalID
			const hospitalIds = [
				...new Set(doctors.map((doc) => doc.hospitalID)),
			];
			const hospitals = await hospitalProfileCollection
				.find({ hospitalID: { $in: hospitalIds } })
				.select("hospitalID name");

			// Create a map for hospital names by their hospitalID
			const hospitalMap = hospitals.reduce((acc, hosp) => {
				acc[hosp.hospitalID] = hosp.name;
				return acc;
			}, {});

			// Format the response to include the doctor's name, hospital name, and department
			const response = doctors.map((doc) => ({
				name: doc.fullName,
				hospitalName: hospitalMap[doc.hospitalID] || "Unknown",
				department: doc.professionalDetails.department,
			}));

			res.status(200).json({ data: response });
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	},
};

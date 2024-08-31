const {
  hospitalProfileCollection,
} = require("../../models/global-Database/hospitalProfileModel");

module.exports = {
  createHospitalProfile: async (req, res) => {
    try {
      // Destructure and validate required fields
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
      // Log the error and return a response
      console.error("Error creating hospital profile:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  // Add other controller methods as needed
};

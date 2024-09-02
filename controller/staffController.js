const { staffCollection } = require("../models/staffModel");

module.exports = {
  addStaff: async (req, res) => {
    try {
      // Assuming the request body directly matches the schema
      const staffData = {
        fullName: req.body.fullName,
        dateOfBirth: req.body.dateOfBirth,
        gender: req.body.gender,
        contactInformation: {
          phone: req.body.contact,
          address: req.body.address,
        },
        nationalID: req.body.nationalId,
        professionalDetails: {
          specialization: req.body.specialization,
          department: req.body.department,
          jobTitle: req.body.staffType,
          yearsOfExperience: req.body.experience,
          licenseNumber: req.body.licenseNumber,
        },
        // Schedule will be added later through another form
      };

      const staff = await staffCollection.create(staffData);
      res.status(201).json({ data: staff });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },
};

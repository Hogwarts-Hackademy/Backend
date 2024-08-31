const express = require("express");
const router = express.Router();
const hospitalProfileController = require("../controller/global-databse/hospitalProfileController");

router.post(
  "/hospital-profiles",
  hospitalProfileController.createHospitalProfile
);

module.exports = router;

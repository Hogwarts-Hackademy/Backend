const express = require("express");
const router = express.Router();
const hospitalProfileController = require("../controller/hospitalProfileController");

router.post(
  "/hospital-profiles/create",
  hospitalProfileController.createHospitalProfile
);

router.get(
  "/hospital-profiles/fetchone",
  hospitalProfileController.getHospitalProfile
);

router.get(
  "/hospital-profiles/fetchall",
  hospitalProfileController.getAllHospitalProfiles
);

router.get("/search", hospitalProfileController.getHospitalBySearch);

module.exports = router;

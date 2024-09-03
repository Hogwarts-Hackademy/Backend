const express = require("express");
const router = express.Router();
const staffController = require("../controller/staffController");

router.post("/add-staff", staffController.addStaff);

module.exports = router;

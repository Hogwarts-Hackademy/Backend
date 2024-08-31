const express = require("express");
const router = express.Router();
const staffController = require("../controller/global-databse/staffController");

router.post("/add-staff", staffController.addStaff);

module.exports = router;

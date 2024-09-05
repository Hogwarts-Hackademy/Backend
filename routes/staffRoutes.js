const express = require("express");
const router = express.Router();
const staffController = require("../controller/staffController");

router.post("/add", staffController.addStaff);

router.get("/fetchone", staffController.getStaff);

module.exports = router;

const express = require("express");
const router = express.Router();
const staffUserController = require("../controller/staffUserController");

// Define routes
router.post("/register", staffUserController.create);
router.post("/login", staffUserController.login);
router.get("/logout", staffUserController.logout);

module.exports = router;

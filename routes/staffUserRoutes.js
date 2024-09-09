const express = require("express");
const router = express.Router();
const staffUserController = require("../controller/staffUserController");

// Define routes
router.post("/register", staffUserController.create);
router.post("/login", staffUserController.login);
router.get("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.json({ message: "Logged out successfully" });
});

module.exports = router;

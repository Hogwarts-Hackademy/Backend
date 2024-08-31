const express = require("express");
const router = express.Router();
const userController = require("../controller/global-databse/userController");

// Define routes
router.post("/register", userController.create);
router.post("/login", userController.login);
router.get("/logout", (req, res) => {
  res.cookie("token", "", { expires: new Date(0) });
  res.redirect("/login");
});

module.exports = router;

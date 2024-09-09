const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");

// Register new user
router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

// Verify email using OTP
router.post("/verify-email", userController.verifyEmail);

// Request password reset (OTP sent to email)
router.post("/request-password-reset", userController.requestPasswordReset);

// Reset password using OTP
router.post("/reset-password", userController.resetPassword);

module.exports = router;

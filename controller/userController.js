const { userCollection } = require("../models/userModel");
const { sendMail } = require("../helper/emailService");
const { generateOTP } = require("../helper/otpGenerator");
const { hashPassword, comparePassword } = require("../helper/authService");
const { generateToken } = require("../helper/jwtService");

module.exports = {
  registerUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;

      // Check if the email is already registered
      const existingUser = await userCollection.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already registered" });
      }

      // Hash password
      const hashedPassword = await hashPassword(password);

      // Generate OTP and set expiry (5 minutes)
      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);

      // Create user
      const user = await userCollection.create({
        name,
        email,
        password: hashedPassword,
        otp,
        otpExpiry,
      });

      // Send verification email
      await sendMail(email, "Verify your email", `Your OTP is ${otp}`);

      // Generate JWT
      const token = generateToken(user);

      res.status(201).json({
        message: "Registration successful. Check your email for OTP.",
        token,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Find user by email
      const user = await userCollection.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if user is verified
      if (!user.isVerified) {
        return res.status(400).json({ error: "Email not verified" });
      }

      // Compare password
      const isMatch = await comparePassword(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate JWT
      const token = generateToken(user);

      res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  verifyEmail: async (req, res) => {
    try {
      const { email, otp } = req.body;

      if (!email || !otp) {
        return res.status(400).json({ error: "Email and OTP are required" });
      }

      // Find user by email
      const user = await userCollection.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Check if OTP matches and is not expired
      if (user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      // Mark user as verified and remove OTP fields
      user.isVerified = true;
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();

      res.status(200).json({ message: "Email verified successfully!" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  requestPasswordReset: async (req, res) => {
    try {
      const { email } = req.body;

      // Find user by email
      const user = await userCollection.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Generate OTP and set expiry
      const otp = generateOTP();
      const otpExpiry = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
      user.otp = otp;
      user.otpExpiry = otpExpiry;
      await user.save();

      // Send OTP email for password reset
      await sendMail(email, "Password Reset Request", `Your OTP is ${otp}`);

      res
        .status(200)
        .json({ message: "Password reset OTP sent to your email." });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  resetPassword: async (req, res) => {
    try {
      const { email, otp, newPassword } = req.body;

      // Find user by email
      const user = await userCollection.findOne({ email });
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }

      // Verify OTP and check expiration
      if (user.otp !== otp || user.otpExpiry < Date.now()) {
        return res.status(400).json({ error: "Invalid or expired OTP" });
      }

      // Hash the new password
      const hashedPassword = await hashPassword(newPassword);

      // Update password and clear OTP fields
      user.password = hashedPassword;
      user.otp = undefined;
      user.otpExpiry = undefined;
      await user.save();

      // Generate a new JWT for the user after password reset
      const token = generateToken(user);

      res.status(200).json({ message: "Password reset successfully!", token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

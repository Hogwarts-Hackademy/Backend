const { staffUserCollection } = require("../models/staffUserModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../config/config.js");

// Create token with 12 hours expiry
const createToken = (username, userid, role) => {
	return jwt.sign({ username, userid, role }, config.jwtSecret, {
		expiresIn: "12h", // Token expires in 12 hours
	});
};

module.exports = {
	create: async (req, res) => {
		const { username, password, role } = req.body;
		try {
			const existingUser = await staffUserCollection.findOne({
				username,
			});
			if (existingUser) {
				return res.status(409).send({ status: "User already exists" });
			}

			const salt = await bcrypt.genSalt(10);
			const hash = await bcrypt.hash(password, salt);

			const newUser = await staffUserCollection.create({
				username,
				password: hash,
				role,
			});

			res.status(201).send({
				status: "User created successfully",
				role: newUser.role,
			});
		} catch (err) {
			// Log the actual error to see what's wrong
			console.error("Error creating user:", err.message);
			res.status(500).send({
				status: "Internal server error",
				error: err.message,
			});
		}
	},

	login: async (req, res) => {
		const { username, password } = req.body;
		try {
			const user = await staffUserCollection.findOne({ username });
			if (!user) {
				return res.status(404).send({ status: "User not found" });
			}

			const isMatch = await bcrypt.compare(password, user.password);
			if (!isMatch) {
				return res
					.status(401)
					.send({ status: "Authentication failed" });
			}

			const token = createToken(username, user._id, user.role);

			// Set token in a secure, HttpOnly cookie
			res.cookie("token", token, {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production", // Use HTTPS in production
				sameSite: "strict", // Mitigate CSRF attacks
				maxAge: 12 * 60 * 60 * 1000, // Cookie lasts for 12 hours
			});

			res.status(200).send({
				status: "Login successful",
				role: user.role,
				token,
			});
		} catch (err) {
			console.error("Login error:", err);
			res.status(500).send({ status: "Internal server error" });
		}
	},

	logout: (req, res) => {
		res.cookie("token", "", {
			expires: new Date(0),
			httpOnly: true,
			sameSite: "strict",
		}); // Clear the token cookie
		res.send({ status: "Logout successful" });
	},
};

const userModule = require("../../models/global-Database/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config.js");

const createToken = (username, userid, role) => {
  return jwt.sign({ username, userid, role }, config.jwtSecret, {
    expiresIn: "1h",
  });
};

module.exports = {
  create: async (req, res) => {
    const { username, password, role } = req.body;
    try {
      const existingUser = await userModule.userCollection.findOne({
        username,
      });
      if (existingUser) {
        return res.status(409).send({ status: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);
      const newUser = await userModule.create({
        username,
        password: hash,
        role,
      });

      const token = createToken(username, newUser._id, newUser.role);
      res.cookie("token", token);
      res.send({
        status: "User created successfully",
        role: newUser.role,
        token,
      });
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).send({ status: "Internal server error" });
    }
  },

  login: async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await userModule.userCollection.findOne({ username });
      if (!user) {
        return res.status(404).send({ status: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({ status: "Authentication failed" });
      }

      const token = createToken(username, user._id, user.role);
      res.cookie("token", token);
      res.send({ status: "Login successful", role: user.role, token });
    } catch (err) {
      console.error("Login error:", err);
      res.status(500).send({ status: "Internal server error" });
    }
  },

  logout: (req, res) => {
    res.cookie("token", "", { expires: new Date(0) }); // Clear the token cookie
    res.send({ status: "Logout successful" });
  },
};

const jwt = require("jsonwebtoken");

const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// Generate JWT
const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, email: user.email, name: user.name },
    JWT_SECRET,
    { expiresIn: "1h" }
  );
};

// Verify JWT middleware
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: "Invalid token." });
  }
};

module.exports = { generateToken, verifyToken };

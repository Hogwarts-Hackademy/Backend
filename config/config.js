const config = {
  jwtSecret: process.env.JWT_SECRET || "default_secret",
  GlobalDbmongoURI:
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/health-sync",
  testDbmongoURI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test",
  corsOptions: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
  serverPort: process.env.PORT || 5000,
};

module.exports = config;

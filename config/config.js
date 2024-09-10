require("dotenv").config();

const config = {
  jwtSecret: process.env.JWT_SECRET || "default_secret",

  GlobalDbmongoURI:
    process.env.MONGO_URI || "mongodb://127.0.0.1:27017/health-sync",

  testDbmongoURI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/test",

  corsOptions: {
    origin: [
      process.env.FRONTEND_URL || "http://localhost:3000", // React app
      process.env.FLUTTER_URL || "http://localhost:4000", // Flutter app
    ],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  },

  serverHost: process.env.HOST || "127.0.0.1",

  serverPort: process.env.PORT || 5000,
};

module.exports = config;

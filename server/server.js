// Force Node.js to use Google's Public DNS servers to resolve MongoDB Atlas SRV records
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const departmentRoutes = require("./routes/departmentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

// Logger middleware
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
});

// Root endpoint
app.get("/", (req, res) => {
  res.status(200).send("CareGrid Health API is running");
});

// Database Connection Status Endpoint (Verification Route)
app.get("/api/db-status", (req, res) => {
  // Mongoose readyState values: 0 = Disconnected, 1 = Connected, 2 = Connecting, 3 = Disconnecting
  const state = mongoose.connection.readyState;
  const statusMap = {
    0: "Disconnected",
    1: "Connected",
    2: "Connecting",
    3: "Disconnecting"
  };

  const isConnected = state === 1;

  res.status(isConnected ? 200 : 503).json({
    connected: isConnected,
    status: statusMap[state] || "Unknown",
    readyState: state
  });
});

// API Routes
app.use("/api/departments", departmentRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({ error: "Internal Server Error", details: err.message });
});

// MongoDB Atlas Connection
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    family: 4 // Forces IPv4 resolution
  })
  .then(() => {
    console.log("Connected successfully to MongoDB Atlas!");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB Atlas Connection Error:", err.message);
  });
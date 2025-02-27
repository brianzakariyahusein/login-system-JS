require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(express.json());

// Koneksi Database
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

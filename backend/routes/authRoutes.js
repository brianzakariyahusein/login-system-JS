const express = require("express");
const { registerUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Route Registrasi pengguna
router.post("/register", registerUser);

// Route Login pengguna
router.post("/login", loginUser);

module.exports = router;

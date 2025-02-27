const express = require("express");
const { registerUser } = require("../controllers/authController");

const router = express.Router();

// Route registrasi pengguna
router.post("/register", registerUser);

module.exports = router;

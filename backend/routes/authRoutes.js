const express = require("express");
const { registerUser, loginUser, logoutUser } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route Registrasi pengguna
router.post("/register", registerUser);

// Route Login pengguna
router.post("/login", loginUser);

// Route Logout pengguna
router.post("/logout", protect, logoutUser)

// Route proteksi contoh (Dashboard)
router.get("/dashboard", protect, (req, res) => {
  res.json({ message: `Halo, ${req.user.name}! Selamat datang di dashboard` });
});

module.exports = router;

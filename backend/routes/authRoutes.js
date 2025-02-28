const express = require("express");
const { registerUser, loginUser, logoutUser, forgotPassword, resetPassword } = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();

// Route Registrasi pengguna
router.post("/register", registerUser);

// Route Login pengguna
router.post("/login", loginUser);

// Route Logout pengguna
router.post("/logout", logoutUser)

// Route Logout pengguna
router.post("/forgot-password", forgotPassword)

// Route Reset Password pengguna
router.post ("/reset-password/:token", resetPassword)

// Route proteksi contoh (Dashboard)
router.get("/dashboard", protect, (req, res) => {
  res.json({ message: `Halo, ${req.user.name}! Selamat datang di dashboard` });
});

module.exports = router;

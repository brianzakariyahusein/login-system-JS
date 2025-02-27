const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Fungsi untuk membuat token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Registrasi Pengguna
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Periksa apakah semua field diisi
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Harap isi semua field" });
    }

    // Periksa apakah email sudah terdaftar
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "Email sudah terdaftar" });
    }

    // Buat user baru
    const user = await User.create({ name, email, password });

    if (user) {
      return res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id), // Kirim token JWT
      });
    } else {
      return res.status(400).json({ message: "Gagal mendaftarkan pengguna" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

// Login Pengguna
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Periksa apakah email dan password diisi
    if (!email || !password) {
      return rs.status(400).json({ message: "Harap isi email dan password" });
    }

    // Cari user berdasarkan email
    const user = await User.findOne({ email });

    // Periksa apakah user ditemukan dan password cocok
    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id), // Kirim token JWT
      });
    } else {
      return res.status(401).json({ message: "Email atau password salah" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

// Logout Pengguna
const logoutUser = async (req, res) => {
  try {
    return res.status(200).json({ message: "Logout berhasil" });
  } catch (error) {
    return res.status(500).json({ message: "Terjadi kesalahan server" });
  }
};

module.exports = { registerUser, loginUser,logoutUser };

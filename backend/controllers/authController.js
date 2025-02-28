const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../utils/emailSender");

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
      return res.status(400).json({ message: "Harap isi email dan password" });
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

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    // Cek apakah user ada
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email tidak terdaftar" });
    }

    // Buat token reset password
    const resetToken = user.generateResetToken();
    await user.save({ validateBeforeSave: false });

    // Buat URL reset password
    const resetUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/auth/reset-password/${resetToken}`;
    const message = `Klik link berikut untuk mereset password Anda: \n\n${resetUrl} \n\nLink berlaku selama 10 menit.`;

    // Kirim email
    await sendEmail(user.email, "Reset Password", message);

    return res
      .status(200)
      .json({ message: "Email reset password telah dikirim" });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Terjadi kesalahan server", error: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    // Hash token yang diterima agar bisa dibandingkan dengan yang di database
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Cari user berdasarkan token dan cek apakah token masih berlaku
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }, // Token masih berlaku
    });

    if (!user) {
      return res
        .status(400)
        .json({ message: "Token tidak valid atau kadaluarsa" });
    }

    // Update password user
    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    return res.status(200).json ({message: "Password berhasil direset"})
  } catch (error) {
    return res.status(500).json ({message: "Terjadi kesalahan server", error: error.message})
  }
};

module.exports = { registerUser, loginUser, logoutUser, forgotPassword, resetPassword };

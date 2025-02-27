const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  let token;

  // Periksa apakah ada token di header Authorization
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Ambil token dari header
      token = req.headers.authorization.split(" ")[1];

      // Verifikasi token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Ambil data user dari database, kecuali password
      req.user = await User.findById(decoded.userId).select("-password");

      next(); // Lanjut ke route berikutnya
    } catch (error) {
      return res
        .status(401)
        .json({ message: "Token tidak valid, akses ditolak" });
    }
  } else {
    return res.status(401).json({ message: "Tidak ada token, akses ditolak" });
  }
};

module.exports = { protect };

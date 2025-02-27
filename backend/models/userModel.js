const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

// Definisi skema pengguna
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nama wajib diisi"],
    },
    email: {
      type: String,
      required: [true, "Email wajib diisi"],
      unique: true,
      match: [/\S+@\S+\.\S+/, "Email tidak valid"],
    },
    password: {
      type: String,
      required: [true, "Password wajib diisi"],
      minlength: [6, "Password minimal 6 karakter"],
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  { timeStamps: true } // Menambahkan createAt & updatedAt
);

// Hash password sebelum menyimpan ke database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Fungsi untuk membandingkan password saat login
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Buat model berdasarkan skema
const User = mongoose.model("User", userSchema)

module.exports = User
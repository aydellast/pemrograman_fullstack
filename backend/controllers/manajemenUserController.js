const userModel = require('../models/manajemenUserModel');
const jwt = require('jsonwebtoken');

// ==============================
// FITUR LOGIN & REGISTER
// ==============================
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    await userModel.create({ username, email, password });
    res.status(201).json({ message: "Registrasi berhasil! Silakan login." });
  } catch (error) {
    res.status(500).json({ message: "Gagal register", error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const users = await userModel.findByEmail(email);
    
    // Cek apakah user ada dan passwordnya cocok
    if (users.length === 0 || users[0].password !== password) {
      return res.status(401).json({ message: "Email atau password salah!" });
    }

    const user = users[0];
    const secretKey = process.env.JWT_SECRET || 'rahasia_cuppycash_super_aman';
    
    const token = jwt.sign(
      { id: user.id_user, id_user: user.id_user, email: user.email }, 
      secretKey, 
      { expiresIn: '1h' }
    );

    res.json({ message: "Login berhasil!", token });
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan di server", error: error.message });
  }
};

// ==============================
// FITUR PROFILE & UPLOAD
// ==============================
exports.getProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const rows = await userModel.getUserById(req.user.id_user);

    if (rows.length === 0) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }

    res.json({
      ...rows[0],
      profile_picture: rows[0].profile_picture
        ? `http://localhost:3000/uploads/${rows[0].profile_picture}`
        : null
    });

  } catch (error) {
    res.status(500).json({ message: "Gagal mengambil profil", error: error.message });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    const { username, email, password } = req.body;

    // VALIDASI
    if (!username || !email) return res.status(400).json({ message: "Username dan email wajib diisi" });
    if (!email.includes('@')) return res.status(400).json({ message: "Format email tidak valid" });
    if (password && password.length < 5) return res.status(400).json({ message: "Password minimal 5 karakter" });

    let profile_picture = null;
    if (req.file) {
      profile_picture = req.file.filename; 
    }

    await userModel.updateUser(req.user.id_user, {
      username,
      email,
      password,
      profile_picture 
    });

    res.json({ message: "Profil dan foto berhasil diupdate 📸" });

  } catch (error) {
    res.status(500).json({ message: "Gagal update profil", error: error.message });
  }
};
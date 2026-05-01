const userModel = require('../models/manajemenUserModel');

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const [rows] = await userModel.getUserById(req.user.id_user);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil profil",
      error: error.message
    });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { username, email, password } = req.body;

    // VALIDASI
    if (!username || !email) {
      return res.status(400).json({
        message: "Username dan email wajib diisi"
      });
    }

    if (!email.includes('@')) {
      return res.status(400).json({
        message: "Format email tidak valid"
      });
    }

    if (password && password.length < 5) {
      return res.status(400).json({
        message: "Password minimal 5 karakter"
      });
    }

    await userModel.updateUser(req.user.id_user, {
      username,
      email,
      password
    });

    res.json({
      message: "Profil berhasil diupdate"
    });

  } catch (error) {
    res.status(500).json({
      message: "Gagal update profil",
      error: error.message
    });
  }
};

// UPLOAD FOTO PROFILE
exports.getProfile = async (req, res) => {
  try {
    const [rows] = await userModel.getUserById(req.user.id_user);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan"
      });
    }

    res.json({
      ...rows[0],
      profile_picture: rows[0].profile_picture
        ? `http://localhost:3000/uploads/${rows[0].profile_picture}`
        : null
    });

  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil profil",
      error: error.message
    });
  }
};
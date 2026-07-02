const bcrypt = require("bcrypt");
const userModel = require("../models/manajemenUserModel");

const getUserId = (req) => {
  return req.user?.id_user || req.user?.id;
};

exports.getProfile = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "User tidak terdeteksi. Silakan login ulang.",
      });
    }

    const rows = await userModel.getUserById(userId);

    if (rows.length === 0) {
      return res.status(404).json({
        message: "User tidak ditemukan.",
      });
    }

    const user = rows[0];
    const stats = await userModel.getProfileStats(userId);

    res.status(200).json({
      message: "Profile berhasil diambil",
      data: {
        id_user: user.id_user,
        username: user.username,
        email: user.email,
        foto_profil: user.foto_profil,
        profile_picture: user.foto_profil
          ? `http://localhost:3000/uploads/${user.foto_profil}`
          : null,
        created_at: user.created_at,
        updated_at: user.updated_at,

        total_income: stats.total_income,
        total_expense: stats.total_expense,
        saving_rate: stats.saving_rate,
        active_budget: stats.active_budget,
        category_count: stats.category_count,
        category_names: stats.category_names,
      },
    });
  } catch (error) {
    console.error("GET PROFILE ERROR:", error);

    res.status(500).json({
      message: "Gagal mengambil profil",
      error: error.message,
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "User tidak terdeteksi. Silakan login ulang.",
      });
    }

    const { username, email, password } = req.body;

    if (!username || !email) {
      return res.status(400).json({
        message: "Username dan email wajib diisi.",
      });
    }

    if (!email.includes("@")) {
      return res.status(400).json({
        message: "Format email tidak valid.",
      });
    }

    const updateData = {
      username,
      email,
    };

    if (password && password.trim() !== "") {
      if (password.length < 8) {
        return res.status(400).json({
          message: "Password minimal 8 karakter.",
        });
      }

      updateData.password = await bcrypt.hash(password, 12);
    }

    if (req.file) {
      updateData.foto_profil = req.file.filename;
    }

    await userModel.updateProfile(userId, updateData);

    res.status(200).json({
      message: "Profil berhasil diperbarui.",
    });
  } catch (error) {
    console.error("UPDATE PROFILE ERROR:", error);

    res.status(500).json({
      message: "Gagal update profil",
      error: error.message,
    });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const db = require("../config/database");

    const sql = `
      SELECT
        id_user,
        username,
        email,
        role,
        foto_profil,
        created_at,
        updated_at
      FROM users
      ORDER BY id_user DESC
    `;

    db.query(sql, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal mengambil data semua user",
          error: err.message,
        });
      }

      res.status(200).json({
        message: "Data semua user berhasil diambil",
        data: results,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
const userModel = require('../models/manajemenUserModel');

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const [rows] = await userModel.getUserById(req.params.id);

    if (rows.length === 0) {
      return res.status(404).json({
        message: 'User tidak ditemukan'
      });
    }

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    await userModel.updateUser(req.params.id, {
      username,
      email,
      password
    });

    res.json({
      message: 'Profil berhasil diupdate'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
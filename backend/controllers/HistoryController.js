const historyModel = require("../models/historyModel");

const getHistory = (req, res) => {
  try {
    if (!req.user || !req.user.id_user) {
      return res.status(401).json({
        message: "User tidak valid / belum login",
      });
    }

    const userId = req.user.id_user;

    historyModel.getHistory(userId, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal ambil history",
          error: err.message,
        });
      }

      res.status(200).json({
        message: "Berhasil ambil history",
        data: results,
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
};

const getHistoryById = (req, res) => {
  try {
    if (!req.user || !req.user.id_user) {
      return res.status(401).json({
        message: "User tidak valid / belum login",
      });
    }

    const userId = req.user.id_user;
    const { id } = req.params;

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    historyModel.getHistoryById(id, userId, (err, results) => {
      if (err) {
        return res.status(500).json({
          message: "Gagal ambil data",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Data tidak ditemukan",
        });
      }

      res.status(200).json({
        message: "Detail transaksi",
        data: results[0],
      });
    });
  } catch (error) {
    res.status(500).json({
      message: "Terjadi kesalahan server",
      error: error.message,
    });
  }
};

module.exports = {
  getHistory,
  getHistoryById,
};
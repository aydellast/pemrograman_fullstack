const historyModel = require("../models/historyModel");

const getUserId = (req) => {
  return req.user?.id_user || req.user?.id;
};

const getHistory = (req, res) => {
  try {
    const userId = getUserId(req);

    if (!userId) {
      return res.status(401).json({
        message: "User tidak valid atau belum login.",
      });
    }

    const filters = {
      type: req.query.type || "All",
      start_date: req.query.start_date || "",
      end_date: req.query.end_date || "",
      search: req.query.search || "",
    };

    historyModel.getHistory(userId, filters, (err, results) => {
      if (err) {
        console.error("ERROR GET HISTORY:", err);

        return res.status(500).json({
          message: "Gagal ambil history",
          error: err.message,
        });
      }

      const totalIncome = results
        .filter((item) => item.transaction_type === "Income")
        .reduce((sum, item) => sum + Number(item.amount || 0), 0);

      const totalExpense = results
        .filter((item) => item.transaction_type === "Expense")
        .reduce((sum, item) => sum + Number(item.amount || 0), 0);

      res.status(200).json({
        message: "Berhasil ambil history",
        summary: {
          total_income: totalIncome,
          total_expense: totalExpense,
          balance: totalIncome - totalExpense,
          total_transaction: results.length,
        },
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
    const userId = getUserId(req);
    const { id } = req.params;

    if (!userId) {
      return res.status(401).json({
        message: "User tidak valid atau belum login.",
      });
    }

    if (!id || isNaN(id)) {
      return res.status(400).json({
        message: "ID tidak valid",
      });
    }

    historyModel.getHistoryById(id, userId, (err, results) => {
      if (err) {
        console.error("ERROR GET HISTORY BY ID:", err);

        return res.status(500).json({
          message: "Gagal ambil data",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Data tidak ditemukan atau bukan milik user ini.",
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
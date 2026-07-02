const Expense = require("../models/expenseModel");

const getUserId = (req) => {
  return req.user?.id_user || req.user?.id;
};

const expenseController = {
  getAllExpenses: (req, res) => {
    const id_user = getUserId(req);

    if (!id_user) {
      return res.status(401).json({
        message: "User tidak terdeteksi. Silakan login ulang.",
      });
    }

    Expense.getAllByUser(id_user, (err, results) => {
      if (err) {
        console.error("ERROR GET EXPENSE:", err);

        return res.status(500).json({
          message: "Gagal mengambil data expense",
          error: err.message,
        });
      }

      res.status(200).json({
        message: "Data expense berhasil diambil",
        data: results,
      });
    });
  },

  getExpenseById: (req, res) => {
    const id_user = getUserId(req);
    const { id } = req.params;

    Expense.getById(id_user, id, (err, results) => {
      if (err) {
        console.error("ERROR GET EXPENSE BY ID:", err);

        return res.status(500).json({
          message: "Gagal mengambil detail expense",
          error: err.message,
        });
      }

      if (results.length === 0) {
        return res.status(404).json({
          message: "Expense tidak ditemukan",
        });
      }

      res.status(200).json({
        message: "Detail expense berhasil diambil",
        data: results[0],
      });
    });
  },

  addExpense: (req, res) => {
    const id_user = getUserId(req);

    const {
      id_category,
      amount,
      transaction_date,
      description,
    } = req.body;

    const image_url = req.file ? req.file.filename : null;

    if (!id_user) {
      return res.status(401).json({
        message: "User tidak terdeteksi. Silakan login ulang.",
      });
    }

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Jumlah pengeluaran tidak valid.",
      });
    }

    if (!id_category) {
      return res.status(400).json({
        message: "Kategori pengeluaran wajib dipilih.",
      });
    }

    Expense.create(
      {
        id_user,
        id_category,
        amount,
        transaction_date,
        description,
        image_url,
      },
      (err, result) => {
        if (err) {
          console.error("ERROR ADD EXPENSE:", err);

          return res.status(500).json({
            message: "Gagal menyimpan expense",
            error: err.message,
          });
        }

        res.status(201).json({
          message: "Pengeluaran berhasil dicatat",
          data: {
            id_transaction: result.insertId,
            id_user,
            id_category,
            amount,
            transaction_date,
            description,
            image_url,
          },
        });
      }
    );
  },

  updateExpense: (req, res) => {
    const id_user = getUserId(req);
    const { id } = req.params;

    const {
      id_category,
      amount,
      transaction_date,
      description,
    } = req.body;

    const image_url = req.file ? req.file.filename : null;

    if (!amount || Number(amount) <= 0) {
      return res.status(400).json({
        message: "Jumlah pengeluaran tidak valid.",
      });
    }

    if (!id_category) {
      return res.status(400).json({
        message: "Kategori pengeluaran wajib dipilih.",
      });
    }

    Expense.update(
      id_user,
      id,
      {
        id_category,
        amount,
        transaction_date,
        description,
        image_url,
      },
      (err, result) => {
        if (err) {
          console.error("ERROR UPDATE EXPENSE:", err);

          return res.status(500).json({
            message: "Gagal update expense",
            error: err.message,
          });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({
            message: "Expense tidak ditemukan atau bukan milik user ini.",
          });
        }

        res.status(200).json({
          message: "Expense berhasil diupdate",
        });
      }
    );
  },

  deleteExpense: (req, res) => {
    const id_user = getUserId(req);
    const { id } = req.params;

    Expense.delete(id_user, id, (err, result) => {
      if (err) {
        console.error("ERROR DELETE EXPENSE:", err);

        return res.status(500).json({
          message: "Gagal menghapus expense",
          error: err.message,
        });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({
          message: "Expense tidak ditemukan atau bukan milik user ini.",
        });
      }

      res.status(200).json({
        message: "Expense berhasil dihapus",
      });
    });
  },

  getTotalExpense: (req, res) => {
    const id_user = getUserId(req);

    Expense.getTotalByUser(id_user, (err, results) => {
      if (err) {
        console.error("ERROR TOTAL EXPENSE:", err);

        return res.status(500).json({
          message: "Gagal mengambil total expense",
          error: err.message,
        });
      }

      res.status(200).json({
        message: "Total expense berhasil diambil",
        data: results[0],
      });
    });
  },
};

module.exports = expenseController;
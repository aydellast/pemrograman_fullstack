const budgetModel = require('../models/budgetModel');

// GET semua budget
exports.getBudgets = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const data = await budgetModel.getBudgetsByUser(req.user.id_user);

    res.json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil data budget",
      error: error.message
    });
  }
};

// DETAIL
exports.getBudgetDetail = async (req, res) => {
  try {
    const data = await budgetModel.getBudgetDetail(req.user.id_user);

    const result = data.map(item => {
      const terpakai = Number(item.terpakai) || 0;
      const budget = Number(item.budget) || 0;

      return {
        kategori: item.kategori,
        budget,
        terpakai,
        sisa: budget - terpakai,
        status: terpakai > budget ? "OVER BUDGET" : "AMAN"
      };
    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    res.status(500).json({
      message: "Gagal mengambil detail budget",
      error: error.message
    });
  }
};

// CREATE
exports.createBudget = async (req, res) => {
  try {
    const { id_category, amount, start_date, end_date } = req.body;

    if (!id_category || !amount || !start_date || !end_date) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Amount harus angka > 0" });
    }

    if (new Date(start_date) > new Date(end_date)) {
      return res.status(400).json({ message: "Tanggal tidak valid" });
    }

    await budgetModel.createBudget({
      id_user: req.user.id_user,
      id_category,
      amount,
      start_date,
      end_date
    });

    res.status(201).json({
      message: "Budget berhasil ditambahkan"
    });

  } catch (error) {

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        message: "Kategori tidak ditemukan"
      });
    }

    res.status(500).json({
      message: "Gagal menambahkan budget",
      error: error.message
    });
  }
};

// UPDATE (FIX: tambah id_user)
exports.updateBudget = async (req, res) => {
  try {
    const { id_category, amount, start_date, end_date } = req.body;

    if (!id_category || !amount || !start_date || !end_date) {
      return res.status(400).json({ message: "Semua field wajib diisi" });
    }

    if (amount <= 0) {
      return res.status(400).json({ message: "Amount harus > 0" });
    }

    const result = await budgetModel.updateBudget(
      req.params.id,
      req.user.id_user,
      req.body
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Budget tidak ditemukan / bukan milik user"
      });
    }

    res.json({ message: "Budget berhasil diupdate" });

  } catch (error) {
    res.status(500).json({
      message: "Gagal update budget",
      error: error.message
    });
  }
};

// DELETE (FIX: tambah id_user)
exports.deleteBudget = async (req, res) => {
  try {
    const result = await budgetModel.deleteBudget(
      req.params.id,
      req.user.id_user
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Budget tidak ditemukan / bukan milik user"
      });
    }

    res.json({ message: "Budget berhasil dihapus" });

  } catch (error) {
    res.status(500).json({
      message: "Gagal hapus budget",
      error: error.message
    });
  }
};
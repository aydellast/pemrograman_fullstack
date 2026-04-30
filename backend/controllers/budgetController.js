const budgetModel = require('../models/budgetModel');

// GET semua budget
exports.getBudgets = async (req, res) => {
  try {
    const data = await budgetModel.getBudgetsByUser(req.params.user_id);

    if (!data || data.length === 0) {
      return res.json([]);
    }

    res.json(data);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// GET DETAIL (budget + terpakai + sisa)
exports.getBudgetDetail = async (req, res) => {
  try {
    const data = await budgetModel.getBudgetDetail(req.params.user_id);

    // FIX UTAMA: handle undefined
    if (!data || !Array.isArray(data)) {
      return res.json([]);
    }

    const result = data.map(item => {
      const terpakai = Number(item.terpakai) || 0;
      const budget = Number(item.budget) || 0;

      return {
        kategori: item.kategori,
        budget: budget,
        terpakai: terpakai,
        sisa: budget - terpakai,
        status: terpakai > budget ? "OVER BUDGET" : "AMAN"
      };
    });

    res.json(result);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// CREATE
exports.createBudget = async (req, res) => {
  try {
    const { id_user, id_category, amount, start_date, end_date } = req.body;

    // validasi sederhana
    if (!id_user || !id_category || !amount || !start_date || !end_date) {
      return res.status(400).json({
        message: "Semua field wajib diisi"
      });
    }

    await budgetModel.createBudget({
      id_user,
      id_category,
      amount,
      start_date,
      end_date
    });

    res.json({
      message: 'Budget berhasil ditambahkan'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// UPDATE
exports.updateBudget = async (req, res) => {
  try {
    await budgetModel.updateBudget(req.params.id, req.body);

    res.json({
      message: 'Budget berhasil diupdate'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


// DELETE
exports.deleteBudget = async (req, res) => {
  try {
    await budgetModel.deleteBudget(req.params.id);

    res.json({
      message: 'Budget berhasil dihapus'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
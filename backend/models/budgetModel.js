const budgetModel = require('../models/budgetModel');

// GET semua budget
exports.getBudgets = async (req, res) => {
  try {
    const data = await budgetModel.getBudgetsByUser(req.params.user_id);
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET DETAIL 
exports.getBudgetDetail = async (req, res) => {
  try {
    const data = await budgetModel.getBudgetDetail(req.params.user_id);

    // OPTIONAL: tandai kalau over budget
    const result = data.map(item => {
      if (item.terpakai > item.budget) {
        return { ...item, status: "OVER BUDGET" };
      }
      return item;
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE
exports.createBudget = async (req, res) => {
  try {
    await budgetModel.createBudget(req.body);
    res.json({ message: 'Budget berhasil ditambahkan' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE
exports.updateBudget = async (req, res) => {
  try {
    await budgetModel.updateBudget(req.params.id, req.body);
    res.json({ message: 'Budget berhasil diupdate' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE
exports.deleteBudget = async (req, res) => {
  try {
    await budgetModel.deleteBudget(req.params.id);
    res.json({ message: 'Budget berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
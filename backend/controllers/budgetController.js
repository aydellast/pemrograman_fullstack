const budgetModel = require("../models/budgetModel");

const getUserId = (req) => {
  return req.user?.id_user || req.user?.id;
};

// GET semua budget
exports.getBudgets = async (req, res) => {
  try {
    const id_user = getUserId(req);

    if (!id_user) {
      return res.status(401).json({
        message: "Unauthorized. Silakan login ulang.",
      });
    }

    const rows = await budgetModel.getBudgetsByUser(id_user);

    const data = rows.map((item) => {
      const amount = Number(item.amount || 0);
      const terpakai = Number(item.terpakai || 0);
      const sisa = Math.max(amount - terpakai, 0);
      const progress = amount > 0 ? Math.round((terpakai / amount) * 100) : 0;

      return {
        id_budget: item.id_budget,
        id_user: item.id_user,
        id_category: item.id_category,
        kategori: item.kategori,
        category_type: item.category_type,
        amount,
        start_date: item.start_date,
        end_date: item.end_date,
        terpakai,
        sisa,
        progress: Math.min(progress, 100),
        status: terpakai > amount ? "OVER BUDGET" : "AMAN",
      };
    });

    res.status(200).json({
      success: true,
      message: "Data budget berhasil diambil",
      data,
    });
  } catch (error) {
    console.error("GET BUDGET ERROR:", error);

    res.status(500).json({
      message: "Gagal mengambil data budget",
      error: error.message,
    });
  }
};

// DETAIL
exports.getBudgetDetail = async (req, res) => {
  try {
    const id_user = getUserId(req);

    if (!id_user) {
      return res.status(401).json({
        message: "Unauthorized. Silakan login ulang.",
      });
    }

    const rows = await budgetModel.getBudgetDetail(id_user);

    const data = rows.map((item) => {
      const amount = Number(item.amount || 0);
      const terpakai = Number(item.terpakai || 0);
      const sisa = Math.max(amount - terpakai, 0);
      const progress = amount > 0 ? Math.round((terpakai / amount) * 100) : 0;

      return {
        id_budget: item.id_budget,
        kategori: item.kategori,
        amount,
        terpakai,
        sisa,
        progress: Math.min(progress, 100),
        status: terpakai > amount ? "OVER BUDGET" : "AMAN",
      };
    });

    res.status(200).json({
      success: true,
      message: "Detail budget berhasil diambil",
      data,
    });
  } catch (error) {
    console.error("GET BUDGET DETAIL ERROR:", error);

    res.status(500).json({
      message: "Gagal mengambil detail budget",
      error: error.message,
    });
  }
};

// CREATE
exports.createBudget = async (req, res) => {
  try {
    const id_user = getUserId(req);

    if (!id_user) {
      return res.status(401).json({
        message: "Unauthorized. Silakan login ulang.",
      });
    }

    const { id_category, amount, start_date, end_date } = req.body;

    if (!id_category || !amount || !start_date || !end_date) {
      return res.status(400).json({
        message: "Semua field wajib diisi.",
      });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        message: "Amount harus angka lebih dari 0.",
      });
    }

    if (new Date(start_date) > new Date(end_date)) {
      return res.status(400).json({
        message: "Tanggal mulai tidak boleh lebih besar dari tanggal selesai.",
      });
    }

    const categoryRows = await budgetModel.getCategoryById(
      id_user,
      id_category
    );

    if (categoryRows.length === 0) {
      return res.status(404).json({
        message: "Kategori tidak ditemukan atau bukan milik user ini.",
      });
    }

    if (categoryRows[0].type !== "Expense") {
      return res.status(400).json({
        message: "Budget hanya bisa dibuat untuk kategori Expense.",
      });
    }

    await budgetModel.createBudget({
      id_user,
      id_category,
      amount: Number(amount),
      start_date,
      end_date,
    });

    res.status(201).json({
      success: true,
      message: "Budget berhasil ditambahkan.",
    });
  } catch (error) {
    console.error("CREATE BUDGET ERROR:", error);

    res.status(500).json({
      message: "Gagal menambahkan budget",
      error: error.message,
    });
  }
};

// UPDATE
exports.updateBudget = async (req, res) => {
  try {
    const id_user = getUserId(req);
    const { id } = req.params;
    const { id_category, amount, start_date, end_date } = req.body;

    if (!id_user) {
      return res.status(401).json({
        message: "Unauthorized. Silakan login ulang.",
      });
    }

    if (!id_category || !amount || !start_date || !end_date) {
      return res.status(400).json({
        message: "Semua field wajib diisi.",
      });
    }

    if (Number(amount) <= 0) {
      return res.status(400).json({
        message: "Amount harus lebih dari 0.",
      });
    }

    const categoryRows = await budgetModel.getCategoryById(
      id_user,
      id_category
    );

    if (categoryRows.length === 0) {
      return res.status(404).json({
        message: "Kategori tidak ditemukan atau bukan milik user ini.",
      });
    }

    if (categoryRows[0].type !== "Expense") {
      return res.status(400).json({
        message: "Budget hanya bisa dibuat untuk kategori Expense.",
      });
    }

    const result = await budgetModel.updateBudget(id, id_user, {
      id_category,
      amount: Number(amount),
      start_date,
      end_date,
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Budget tidak ditemukan atau bukan milik user ini.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Budget berhasil diupdate.",
    });
  } catch (error) {
    console.error("UPDATE BUDGET ERROR:", error);

    res.status(500).json({
      message: "Gagal update budget",
      error: error.message,
    });
  }
};

// DELETE
exports.deleteBudget = async (req, res) => {
  try {
    const id_user = getUserId(req);
    const { id } = req.params;

    if (!id_user) {
      return res.status(401).json({
        message: "Unauthorized. Silakan login ulang.",
      });
    }

    const result = await budgetModel.deleteBudget(id, id_user);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: "Budget tidak ditemukan atau bukan milik user ini.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Budget berhasil dihapus.",
    });
  } catch (error) {
    console.error("DELETE BUDGET ERROR:", error);

    res.status(500).json({
      message: "Gagal hapus budget",
      error: error.message,
    });
  }
};
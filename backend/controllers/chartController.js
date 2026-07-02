const db = require("../config/database");

const getUserId = (req) => {
  return req.user?.id_user || req.user?.id;
};

const chartController = {
  getChartSummary: (req, res) => {
    const id_user = getUserId(req);

    if (!id_user) {
      return res.status(401).json({
        message: "User tidak terdeteksi. Silakan login ulang.",
      });
    }

    const query = `
      SELECT
        COALESCE(SUM(CASE WHEN c.type = 'Income' THEN t.amount ELSE 0 END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN c.type = 'Expense' THEN t.amount ELSE 0 END), 0) AS total_expense,
        COUNT(t.id_transaction) AS total_transaction,
        COUNT(CASE WHEN c.type = 'Income' THEN 1 END) AS total_income_transaction,
        COUNT(CASE WHEN c.type = 'Expense' THEN 1 END) AS total_expense_transaction
      FROM transactions t
      JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
    `;

    db.query(query, [id_user], (err, results) => {
      if (err) {
        console.error("ERROR CHART SUMMARY:", err);

        return res.status(500).json({
          message: "Gagal mengambil ringkasan chart",
          error: err.message,
        });
      }

      const summary = results[0];

      const totalIncome = Number(summary.total_income || 0);
      const totalExpense = Number(summary.total_expense || 0);

      res.status(200).json({
        message: "Ringkasan chart berhasil diambil",
        data: {
          total_income: totalIncome,
          total_expense: totalExpense,
          balance: totalIncome - totalExpense,
          total_transaction: Number(summary.total_transaction || 0),
          total_income_transaction: Number(
            summary.total_income_transaction || 0
          ),
          total_expense_transaction: Number(
            summary.total_expense_transaction || 0
          ),
        },
      });
    });
  },

  getMonthlyChart: (req, res) => {
    const id_user = getUserId(req);

    if (!id_user) {
      return res.status(401).json({
        message: "User tidak terdeteksi. Silakan login ulang.",
      });
    }

    const query = `
      SELECT
        DATE_FORMAT(t.transaction_date, '%Y-%m') AS month_key,
        DATE_FORMAT(t.transaction_date, '%b %Y') AS month_label,
        COALESCE(SUM(CASE WHEN c.type = 'Income' THEN t.amount ELSE 0 END), 0) AS income,
        COALESCE(SUM(CASE WHEN c.type = 'Expense' THEN t.amount ELSE 0 END), 0) AS expense
      FROM transactions t
      JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
      GROUP BY month_key, month_label
      ORDER BY month_key ASC
    `;

    db.query(query, [id_user], (err, results) => {
      if (err) {
        console.error("ERROR MONTHLY CHART:", err);

        return res.status(500).json({
          message: "Gagal mengambil chart bulanan",
          error: err.message,
        });
      }

      const data = results.map((item) => ({
        month_key: item.month_key,
        month: item.month_label,
        income: Number(item.income || 0),
        expense: Number(item.expense || 0),
        balance: Number(item.income || 0) - Number(item.expense || 0),
      }));

      res.status(200).json({
        message: "Chart bulanan berhasil diambil",
        data,
      });
    });
  },

  getExpenseCategoryChart: (req, res) => {
    const id_user = getUserId(req);

    if (!id_user) {
      return res.status(401).json({
        message: "User tidak terdeteksi. Silakan login ulang.",
      });
    }

    const query = `
      SELECT
        c.name AS category_name,
        COALESCE(SUM(t.amount), 0) AS total_amount
      FROM transactions t
      JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
        AND c.type = 'Expense'
      GROUP BY c.id_category, c.name
      ORDER BY total_amount DESC
      LIMIT 8
    `;

    db.query(query, [id_user], (err, results) => {
      if (err) {
        console.error("ERROR EXPENSE CATEGORY CHART:", err);

        return res.status(500).json({
          message: "Gagal mengambil chart kategori expense",
          error: err.message,
        });
      }

      const data = results.map((item) => ({
        category_name: item.category_name,
        total_amount: Number(item.total_amount || 0),
      }));

      res.status(200).json({
        message: "Chart kategori expense berhasil diambil",
        data,
      });
    });
  },

  getIncomeCategoryChart: (req, res) => {
    const id_user = getUserId(req);

    if (!id_user) {
      return res.status(401).json({
        message: "User tidak terdeteksi. Silakan login ulang.",
      });
    }

    const query = `
      SELECT
        c.name AS category_name,
        COALESCE(SUM(t.amount), 0) AS total_amount
      FROM transactions t
      JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
        AND c.type = 'Income'
      GROUP BY c.id_category, c.name
      ORDER BY total_amount DESC
      LIMIT 8
    `;

    db.query(query, [id_user], (err, results) => {
      if (err) {
        console.error("ERROR INCOME CATEGORY CHART:", err);

        return res.status(500).json({
          message: "Gagal mengambil chart kategori income",
          error: err.message,
        });
      }

      const data = results.map((item) => ({
        category_name: item.category_name,
        total_amount: Number(item.total_amount || 0),
      }));

      res.status(200).json({
        message: "Chart kategori income berhasil diambil",
        data,
      });
    });
  },
};

module.exports = chartController;
const db = require("../config/database");

const Dashboard = {
  getSummary: (id_user, callback) => {
    const transactionSql = `
      SELECT
        COALESCE(SUM(CASE WHEN c.type = 'Income' THEN t.amount ELSE 0 END), 0) AS total_income,
        COALESCE(SUM(CASE WHEN c.type = 'Expense' THEN t.amount ELSE 0 END), 0) AS total_expense,
        COUNT(t.id_transaction) AS total_transaction
      FROM transactions t
      JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
    `;

    db.query(transactionSql, [id_user], callback);
  },

  getTotalSaving: (id_user, callback) => {
    const sql = `
      SELECT
        COALESCE(SUM(current_amount), 0) AS total_saving
      FROM saving_goals
      WHERE id_user = ?
    `;

    db.query(sql, [id_user], callback);
  },

  getMonthlyChart: (id_user, callback) => {
    const sql = `
      SELECT
        DATE_FORMAT(t.transaction_date, '%Y-%m') AS month_key,
        DATE_FORMAT(t.transaction_date, '%b %Y') AS month,
        COALESCE(SUM(CASE WHEN c.type = 'Income' THEN t.amount ELSE 0 END), 0) AS income,
        COALESCE(SUM(CASE WHEN c.type = 'Expense' THEN t.amount ELSE 0 END), 0) AS expense
      FROM transactions t
      JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
      GROUP BY month_key, month
      ORDER BY month_key ASC
    `;

    db.query(sql, [id_user], callback);
  },

  getRecentActivities: (id_user, callback) => {
    const sql = `
      SELECT
        t.id_transaction AS id,
        t.amount,
        t.description AS title,
        t.transaction_date,
        c.name AS category,
        c.type
      FROM transactions t
      JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
      ORDER BY t.transaction_date DESC, t.id_transaction DESC
      LIMIT 5
    `;

    db.query(sql, [id_user], callback);
  },

  getLatestSavingGoal: (id_user, callback) => {
    const sql = `
      SELECT
        id_goal,
        goal_name,
        target_amount,
        current_amount,
        target_date,
        ROUND(
          LEAST((current_amount / NULLIF(target_amount, 0)) * 100, 100)
        ) AS progress
      FROM saving_goals
      WHERE id_user = ?
      ORDER BY id_goal DESC
      LIMIT 1
    `;

    db.query(sql, [id_user], callback);
  },
};

module.exports = Dashboard;
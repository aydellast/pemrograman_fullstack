const db = require('../config/database');

// GET semua budget by user
exports.getBudgetsByUser = async (user_id) => {
  const [rows] = await db.promise().query(
    `SELECT 
        b.id_budget,
        b.id_user,
        c.name AS kategori,
        b.amount,
        b.start_date,
        b.end_date
     FROM budgets b
     JOIN categories c ON b.id_category = c.id_category
     WHERE b.id_user = ?`,
    [user_id]
  );

  return rows;
};


// GET DETAIL (budget vs pengeluaran)
exports.getBudgetDetail = async (user_id) => {
  const [rows] = await db.promise().query(
    `SELECT 
        c.name AS kategori,
        b.amount AS budget,
        COALESCE(SUM(t.amount), 0) AS terpakai
     FROM budgets b
     JOIN categories c ON b.id_category = c.id_category
     LEFT JOIN transactions t 
        ON t.id_category = b.id_category
        AND t.id_user = b.id_user
        AND t.transaction_date BETWEEN b.start_date AND b.end_date
     WHERE b.id_user = ?
     GROUP BY b.id_budget`,
    [user_id]
  );

  return rows;
};


// CREATE
exports.createBudget = async (data) => {
  const { id_user, id_category, amount, start_date, end_date } = data;

  return db.promise().query(
    `INSERT INTO budgets (id_user, id_category, amount, start_date, end_date)
     VALUES (?, ?, ?, ?, ?)`,
    [id_user, id_category, amount, start_date, end_date]
  );
};


// UPDATE
exports.updateBudget = async (id, data) => {
  const { id_category, amount, start_date, end_date } = data;

  return db.promise().query(
    `UPDATE budgets 
     SET id_category=?, amount=?, start_date=?, end_date=?
     WHERE id_budget=?`,
    [id_category, amount, start_date, end_date, id]
  );
};


// DELETE
exports.deleteBudget = async (id) => {
  return db.promise().query(
    `DELETE FROM budgets WHERE id_budget=?`,
    [id]
  );
};
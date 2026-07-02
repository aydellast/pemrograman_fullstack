const db = require("../config/database");

// GET semua budget by user + hitung pengeluaran terpakai
exports.getBudgetsByUser = async (id_user) => {
  const [rows] = await db.promise().query(
    `
    SELECT 
      b.id_budget,
      b.id_user,
      b.id_category,
      c.name AS kategori,
      c.type AS category_type,
      b.amount,
      b.start_date,
      b.end_date,

      COALESCE(SUM(t.amount), 0) AS terpakai,

      GREATEST(b.amount - COALESCE(SUM(t.amount), 0), 0) AS sisa,

      ROUND(
        LEAST(
          (COALESCE(SUM(t.amount), 0) / NULLIF(b.amount, 0)) * 100,
          100
        )
      ) AS progress

    FROM budgets b
    JOIN categories c
      ON b.id_category = c.id_category

    LEFT JOIN transactions t
      ON t.id_category = b.id_category
      AND t.id_user = b.id_user
      AND DATE(t.transaction_date) BETWEEN DATE(b.start_date) AND DATE(b.end_date)

    WHERE b.id_user = ?

    GROUP BY
      b.id_budget,
      b.id_user,
      b.id_category,
      c.name,
      c.type,
      b.amount,
      b.start_date,
      b.end_date

    ORDER BY b.id_budget DESC
    `,
    [id_user]
  );

  return rows;
};

// GET DETAIL budget
exports.getBudgetDetail = async (id_user) => {
  return exports.getBudgetsByUser(id_user);
};

// CEK kategori milik user
exports.getCategoryById = async (id_user, id_category) => {
  const [rows] = await db.promise().query(
    `
    SELECT
      id_category,
      id_user,
      name,
      type
    FROM categories
    WHERE id_category = ?
      AND id_user = ?
    LIMIT 1
    `,
    [id_category, id_user]
  );

  return rows;
};

// CREATE
exports.createBudget = async (data) => {
  const { id_user, id_category, amount, start_date, end_date } = data;

  const [result] = await db.promise().query(
    `
    INSERT INTO budgets
      (id_user, id_category, amount, start_date, end_date)
    VALUES
      (?, ?, ?, ?, ?)
    `,
    [id_user, id_category, amount, start_date, end_date]
  );

  return result;
};

// UPDATE
exports.updateBudget = async (id_budget, id_user, data) => {
  const { id_category, amount, start_date, end_date } = data;

  const [result] = await db.promise().query(
    `
    UPDATE budgets 
    SET
      id_category = ?,
      amount = ?,
      start_date = ?,
      end_date = ?
    WHERE id_budget = ?
      AND id_user = ?
    `,
    [id_category, amount, start_date, end_date, id_budget, id_user]
  );

  return result;
};

// DELETE
exports.deleteBudget = async (id_budget, id_user) => {
  const [result] = await db.promise().query(
    `
    DELETE FROM budgets 
    WHERE id_budget = ?
      AND id_user = ?
    `,
    [id_budget, id_user]
  );

  return result;
};
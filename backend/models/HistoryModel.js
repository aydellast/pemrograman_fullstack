const db = require("../config/database");

const getHistory = (userId, filters, callback) => {
  const conditions = ["t.id_user = ?"];
  const values = [userId];

  if (filters.type && filters.type !== "All") {
    conditions.push("c.type = ?");
    values.push(filters.type);
  }

  if (filters.start_date) {
    conditions.push("DATE(t.transaction_date) >= ?");
    values.push(filters.start_date);
  }

  if (filters.end_date) {
    conditions.push("DATE(t.transaction_date) <= ?");
    values.push(filters.end_date);
  }

  if (filters.search) {
    conditions.push("(t.description LIKE ? OR c.name LIKE ?)");
    values.push(`%${filters.search}%`, `%${filters.search}%`);
  }

  const sql = `
    SELECT 
      t.id_transaction,
      t.id_user,
      t.id_category,
      t.amount,
      t.description,
      t.transaction_date,
      t.created_at,
      t.image_url,
      c.name AS category_name,
      c.type AS transaction_type
    FROM transactions t
    JOIN categories c 
      ON t.id_category = c.id_category
    WHERE ${conditions.join(" AND ")}
    ORDER BY t.transaction_date DESC, t.id_transaction DESC
  `;

  db.query(sql, values, callback);
};

const getHistoryById = (id, userId, callback) => {
  const sql = `
    SELECT 
      t.id_transaction,
      t.id_user,
      t.id_category,
      t.amount,
      t.description,
      t.transaction_date,
      t.created_at,
      t.image_url,
      c.name AS category_name,
      c.type AS transaction_type
    FROM transactions t
    JOIN categories c 
      ON t.id_category = c.id_category
    WHERE t.id_transaction = ?
      AND t.id_user = ?
  `;

  db.query(sql, [id, userId], callback);
};

module.exports = {
  getHistory,
  getHistoryById,
};
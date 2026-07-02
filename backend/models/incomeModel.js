const db = require("../config/database");

const Income = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO transactions
      (
        id_user,
        id_category,
        amount,
        transaction_date,
        description
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        data.id_user,
        data.id_category,
        data.amount,
        data.transaction_date || new Date(),
        data.description || null,
      ],
      callback
    );
  },

  getAllByUser: (id_user, callback) => {
    const sql = `
      SELECT
        t.id_transaction,
        t.id_user,
        t.id_category,
        t.amount,
        t.transaction_date,
        t.description,
        c.name AS category_name,
        c.type
      FROM transactions t
      LEFT JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
        AND c.type = 'Income'
      ORDER BY t.transaction_date DESC, t.id_transaction DESC
    `;

    db.query(sql, [id_user], callback);
  },

  getById: (id_user, id_transaction, callback) => {
    const sql = `
      SELECT
        t.id_transaction,
        t.id_user,
        t.id_category,
        t.amount,
        t.transaction_date,
        t.description,
        c.name AS category_name,
        c.type
      FROM transactions t
      LEFT JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
        AND t.id_transaction = ?
        AND c.type = 'Income'
    `;

    db.query(sql, [id_user, id_transaction], callback);
  },

  update: (id_user, id_transaction, data, callback) => {
    const sql = `
      UPDATE transactions
      SET
        amount = ?,
        id_category = ?,
        transaction_date = ?,
        description = ?
      WHERE id_transaction = ?
        AND id_user = ?
    `;

    db.query(
      sql,
      [
        data.amount,
        data.id_category,
        data.transaction_date || new Date(),
        data.description || null,
        id_transaction,
        id_user,
      ],
      callback
    );
  },

  delete: (id_user, id_transaction, callback) => {
    const sql = `
      DELETE FROM transactions
      WHERE id_transaction = ?
        AND id_user = ?
    `;

    db.query(sql, [id_transaction, id_user], callback);
  },

  filterByDate: (id_user, start, end, callback) => {
    const sql = `
      SELECT
        t.id_transaction,
        t.id_user,
        t.id_category,
        t.amount,
        t.transaction_date,
        t.description,
        c.name AS category_name,
        c.type
      FROM transactions t
      LEFT JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
        AND c.type = 'Income'
        AND DATE(t.transaction_date) BETWEEN ? AND ?
      ORDER BY t.transaction_date DESC
    `;

    db.query(sql, [id_user, start, end], callback);
  },

  getTotalByUser: (id_user, callback) => {
    const sql = `
      SELECT
        COALESCE(SUM(t.amount), 0) AS total_income
      FROM transactions t
      LEFT JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
        AND c.type = 'Income'
    `;

    db.query(sql, [id_user], callback);
  },
};

module.exports = Income;
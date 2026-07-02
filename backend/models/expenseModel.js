const db = require("../config/database");

const Expense = {
  create: (data, callback) => {
    const query = `
      INSERT INTO transactions
      (
        id_user,
        id_category,
        amount,
        transaction_date,
        description,
        image_url
      )
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      data.id_user,
      data.id_category,
      data.amount,
      data.transaction_date || new Date(),
      data.description || null,
      data.image_url || null,
    ];

    db.query(query, values, callback);
  },

  getAllByUser: (id_user, callback) => {
    const query = `
      SELECT
        t.id_transaction,
        t.id_user,
        t.id_category,
        t.amount,
        t.transaction_date,
        t.description,
        t.image_url,
        c.name AS category_name,
        c.type
      FROM transactions t
      JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
        AND c.type = 'Expense'
      ORDER BY t.transaction_date DESC, t.id_transaction DESC
    `;

    db.query(query, [id_user], callback);
  },

  getById: (id_user, id_transaction, callback) => {
    const query = `
      SELECT
        t.id_transaction,
        t.id_user,
        t.id_category,
        t.amount,
        t.transaction_date,
        t.description,
        t.image_url,
        c.name AS category_name,
        c.type
      FROM transactions t
      JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
        AND t.id_transaction = ?
        AND c.type = 'Expense'
    `;

    db.query(query, [id_user, id_transaction], callback);
  },

  update: (id_user, id_transaction, data, callback) => {
    const fields = [
      "amount = ?",
      "id_category = ?",
      "transaction_date = ?",
      "description = ?",
    ];

    const values = [
      data.amount,
      data.id_category,
      data.transaction_date || new Date(),
      data.description || null,
    ];

    if (data.image_url) {
      fields.push("image_url = ?");
      values.push(data.image_url);
    }

    values.push(id_transaction, id_user);

    const query = `
      UPDATE transactions
      SET ${fields.join(", ")}
      WHERE id_transaction = ?
        AND id_user = ?
    `;

    db.query(query, values, callback);
  },

  delete: (id_user, id_transaction, callback) => {
    const query = `
      DELETE FROM transactions
      WHERE id_transaction = ?
        AND id_user = ?
    `;

    db.query(query, [id_transaction, id_user], callback);
  },

  getTotalByUser: (id_user, callback) => {
    const query = `
      SELECT
        COALESCE(SUM(t.amount), 0) AS total_expense
      FROM transactions t
      JOIN categories c
        ON t.id_category = c.id_category
      WHERE t.id_user = ?
        AND c.type = 'Expense'
    `;

    db.query(query, [id_user], callback);
  },
};

module.exports = Expense;
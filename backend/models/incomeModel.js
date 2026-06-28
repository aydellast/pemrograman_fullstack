const db = require("../config/database");

const Income = {

  add: (data, callback) => {

    const sql = `
      INSERT INTO transactions
      (
        id_user,
        id_category,
        amount,
        transaction_date,
        description
      )
      VALUES (?, ?, ?, NOW(), ?)
    `;

    db.query(
      sql,
      [
        data.id_user,
        data.id_category,
        data.amount,
        data.description
      ],
      callback
    );
  },

  getAll: (id_user, callback) => {

    const sql = `
      SELECT
      t.*,
      c.name AS category_name,
      c.type

      FROM transactions t

      LEFT JOIN categories c

      ON t.id_category=c.id_category

      WHERE t.id_user=?

      AND c.type='Income'

      ORDER BY t.transaction_date DESC
    `;

    db.query(sql, [id_user], callback);
  },

  getById: (id, callback) => {

    const sql = `
      SELECT *

      FROM transactions

      WHERE id_transaction=?
    `;

    db.query(sql, [id], callback);
  },

  update: (id, data, callback) => {

    const sql = `
      UPDATE transactions

      SET

      amount=?,

      id_category=?,

      description=?

      WHERE id_transaction=?
    `;

    db.query(
      sql,
      [
        data.amount,
        data.id_category,
        data.description,
        id
      ],
      callback
    );
  },

  delete: (id, callback) => {

    const sql = `
      DELETE FROM transactions

      WHERE id_transaction=?
    `;

    db.query(sql, [id], callback);
  },

  total: (id_user, callback) => {

    const sql = `
      SELECT

      SUM(t.amount) AS total_income

      FROM transactions t

      LEFT JOIN categories c

      ON t.id_category=c.id_category

      WHERE t.id_user=?

      AND c.type='Income'
    `;

    db.query(sql, [id_user], callback);
  }

};

module.exports = Income;
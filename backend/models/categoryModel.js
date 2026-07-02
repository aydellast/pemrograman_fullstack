const db = require("../config/database");

const Category = {
  create: (data, callback) => {
    const sql = `
      INSERT INTO categories (id_user, name, type)
      VALUES (?, ?, ?)
    `;

    db.query(
      sql,
      [data.id_user, data.name, data.type],
      callback
    );
  },

  getAllByUser: (id_user, callback) => {
    const sql = `
      SELECT 
        id_category,
        id_user,
        name,
        type,
        created_at,
        updated_at
      FROM categories
      WHERE id_user = ?
      ORDER BY id_category DESC
    `;

    db.query(sql, [id_user], callback);
  },

  getById: (id_user, id_category, callback) => {
    const sql = `
      SELECT 
        id_category,
        id_user,
        name,
        type,
        created_at,
        updated_at
      FROM categories
      WHERE id_category = ?
        AND id_user = ?
    `;

    db.query(sql, [id_category, id_user], callback);
  },

  update: (id_user, id_category, data, callback) => {
    const sql = `
      UPDATE categories
      SET name = ?, type = ?
      WHERE id_category = ?
        AND id_user = ?
    `;

    db.query(
      sql,
      [data.name, data.type, id_category, id_user],
      callback
    );
  },

  delete: (id_user, id_category, callback) => {
    const sql = `
      DELETE FROM categories
      WHERE id_category = ?
        AND id_user = ?
    `;

    db.query(sql, [id_category, id_user], callback);
  },
};

module.exports = Category;
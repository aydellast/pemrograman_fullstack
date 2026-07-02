const db = require("../config/database");

const Auth = {
  findByEmail: (email) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT *
        FROM users
        WHERE email = ?
      `;

      db.query(sql, [email], (err, results) => {
        if (err) reject(err);
        else resolve(results);
      });
    });
  },

  createUser: ({ username, email, password }) => {
    return new Promise((resolve, reject) => {
      const sql = `
        INSERT INTO users (username, email, password)
        VALUES (?, ?, ?)
      `;

      db.query(sql, [username, email, password], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  updatePassword: (id_user, hashedPassword) => {
    return new Promise((resolve, reject) => {
      const sql = `
        UPDATE users
        SET password = ?
        WHERE id_user = ?
      `;

      db.query(sql, [hashedPassword, id_user], (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },
};

module.exports = Auth;
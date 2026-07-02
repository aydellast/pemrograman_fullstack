const db = require("../config/database");

const UserModel = {
  getUserById: (id_user) => {
    return new Promise((resolve, reject) => {
      const sql = `
        SELECT
          id_user,
          username,
          email,
          foto_profil,
          created_at,
          updated_at
        FROM users
        WHERE id_user = ?
      `;

      db.query(sql, [id_user], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  },

  updateProfile: (id_user, data) => {
    return new Promise((resolve, reject) => {
      const fields = [];
      const values = [];

      if (data.username !== undefined) {
        fields.push("username = ?");
        values.push(data.username);
      }

      if (data.email !== undefined) {
        fields.push("email = ?");
        values.push(data.email);
      }

      if (data.password !== undefined) {
        fields.push("password = ?");
        values.push(data.password);
      }

      if (data.foto_profil !== undefined) {
        fields.push("foto_profil = ?");
        values.push(data.foto_profil);
      }

      if (fields.length === 0) {
        return resolve({
          affectedRows: 0,
          message: "Tidak ada data yang diubah",
        });
      }

      values.push(id_user);

      const sql = `
        UPDATE users
        SET ${fields.join(", ")}
        WHERE id_user = ?
      `;

      db.query(sql, values, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    });
  },

  getProfileStats: (id_user) => {
    return new Promise((resolve, reject) => {
      const transactionSql = `
        SELECT
          COALESCE(SUM(CASE WHEN c.type = 'Income' THEN t.amount ELSE 0 END), 0) AS total_income,
          COALESCE(SUM(CASE WHEN c.type = 'Expense' THEN t.amount ELSE 0 END), 0) AS total_expense
        FROM transactions t
        JOIN categories c
          ON t.id_category = c.id_category
        WHERE t.id_user = ?
      `;

      const budgetSql = `
        SELECT COUNT(*) AS active_budget
        FROM budgets
        WHERE id_user = ?
      `;

      const categorySql = `
        SELECT
          COUNT(*) AS category_count,
          GROUP_CONCAT(name ORDER BY name SEPARATOR ', ') AS category_names
        FROM categories
        WHERE id_user = ?
      `;

      db.query(transactionSql, [id_user], (err, transactionRows) => {
        if (err) return reject(err);

        db.query(budgetSql, [id_user], (err, budgetRows) => {
          if (err) return reject(err);

          db.query(categorySql, [id_user], (err, categoryRows) => {
            if (err) return reject(err);

            const totalIncome = Number(transactionRows[0]?.total_income || 0);
            const totalExpense = Number(transactionRows[0]?.total_expense || 0);

            let savingRate = 0;

            if (totalIncome > 0) {
              savingRate = Math.round(
                ((totalIncome - totalExpense) / totalIncome) * 100
              );
            }

            savingRate = Math.max(0, Math.min(savingRate, 100));

            resolve({
              total_income: totalIncome,
              total_expense: totalExpense,
              saving_rate: savingRate,
              active_budget: Number(budgetRows[0]?.active_budget || 0),
              category_count: Number(categoryRows[0]?.category_count || 0),
              category_names: categoryRows[0]?.category_names || "-",
            });
          });
        });
      });
    });
  },
};

module.exports = UserModel;
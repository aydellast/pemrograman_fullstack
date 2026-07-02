const db = require("../config/database");

const SavingGoal = {
  getGoalsByUser: (id_user, callback) => {
    const sql = `
      SELECT
        id_goal,
        id_user,
        goal_name,
        target_amount,
        current_amount,
        target_date,
        created_at,
        updated_at,
        ROUND(
          LEAST((current_amount / target_amount) * 100, 100)
        ) AS progress
      FROM saving_goals
      WHERE id_user = ?
      ORDER BY id_goal DESC
    `;

    db.query(sql, [id_user], callback);
  },

  getGoalById: (id_user, id_goal, callback) => {
    const sql = `
      SELECT
        id_goal,
        id_user,
        goal_name,
        target_amount,
        current_amount,
        target_date,
        created_at,
        updated_at,
        ROUND(
          LEAST((current_amount / target_amount) * 100, 100)
        ) AS progress
      FROM saving_goals
      WHERE id_user = ?
        AND id_goal = ?
    `;

    db.query(sql, [id_user, id_goal], callback);
  },

  createGoal: (data, callback) => {
    const sql = `
      INSERT INTO saving_goals
      (
        id_user,
        goal_name,
        target_amount,
        current_amount,
        target_date
      )
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      sql,
      [
        data.id_user,
        data.goal_name,
        data.target_amount,
        data.current_amount || 0,
        data.target_date,
      ],
      callback
    );
  },

  updateGoal: (id_user, id_goal, data, callback) => {
    const sql = `
      UPDATE saving_goals
      SET
        goal_name = ?,
        target_amount = ?,
        target_date = ?
      WHERE id_goal = ?
        AND id_user = ?
    `;

    db.query(
      sql,
      [
        data.goal_name,
        data.target_amount,
        data.target_date,
        id_goal,
        id_user,
      ],
      callback
    );
  },

  deleteGoal: (id_user, id_goal, callback) => {
    const deleteContributionsSql = `
      DELETE FROM saving_contributions
      WHERE id_goal = ?
    `;

    db.query(deleteContributionsSql, [id_goal], (err) => {
      if (err) return callback(err);

      const deleteGoalSql = `
        DELETE FROM saving_goals
        WHERE id_goal = ?
          AND id_user = ?
      `;

      db.query(deleteGoalSql, [id_goal, id_user], callback);
    });
  },

  addContribution: (id_user, id_goal, data, callback) => {
    const checkGoalSql = `
      SELECT id_goal
      FROM saving_goals
      WHERE id_goal = ?
        AND id_user = ?
    `;

    db.query(checkGoalSql, [id_goal, id_user], (err, goals) => {
      if (err) return callback(err);

      if (goals.length === 0) {
        return callback(null, {
          notFound: true,
        });
      }

      const insertContributionSql = `
        INSERT INTO saving_contributions
        (
          id_goal,
          amount,
          contribution_date
        )
        VALUES (?, ?, ?)
      `;

      db.query(
        insertContributionSql,
        [
          id_goal,
          data.amount,
          data.contribution_date || new Date(),
        ],
        (err, result) => {
          if (err) return callback(err);

          const updateGoalSql = `
            UPDATE saving_goals
            SET current_amount = current_amount + ?
            WHERE id_goal = ?
              AND id_user = ?
          `;

          db.query(
            updateGoalSql,
            [data.amount, id_goal, id_user],
            (err) => {
              if (err) return callback(err);

              callback(null, result);
            }
          );
        }
      );
    });
  },

  getContributionsByGoal: (id_user, id_goal, callback) => {
    const sql = `
      SELECT
        sc.id_contribution,
        sc.id_goal,
        sc.amount,
        sc.contribution_date,
        sc.created_at
      FROM saving_contributions sc
      JOIN saving_goals sg
        ON sc.id_goal = sg.id_goal
      WHERE sc.id_goal = ?
        AND sg.id_user = ?
      ORDER BY sc.contribution_date DESC, sc.id_contribution DESC
    `;

    db.query(sql, [id_goal, id_user], callback);
  },

  deleteContribution: (id_user, id_contribution, callback) => {
    const findSql = `
      SELECT
        sc.id_contribution,
        sc.id_goal,
        sc.amount
      FROM saving_contributions sc
      JOIN saving_goals sg
        ON sc.id_goal = sg.id_goal
      WHERE sc.id_contribution = ?
        AND sg.id_user = ?
    `;

    db.query(findSql, [id_contribution, id_user], (err, rows) => {
      if (err) return callback(err);

      if (rows.length === 0) {
        return callback(null, {
          notFound: true,
        });
      }

      const contribution = rows[0];

      const deleteSql = `
        DELETE FROM saving_contributions
        WHERE id_contribution = ?
      `;

      db.query(deleteSql, [id_contribution], (err, result) => {
        if (err) return callback(err);

        const updateGoalSql = `
          UPDATE saving_goals
          SET current_amount = GREATEST(current_amount - ?, 0)
          WHERE id_goal = ?
            AND id_user = ?
        `;

        db.query(
          updateGoalSql,
          [contribution.amount, contribution.id_goal, id_user],
          (err) => {
            if (err) return callback(err);

            callback(null, result);
          }
        );
      });
    });
  },
};

module.exports = SavingGoal;
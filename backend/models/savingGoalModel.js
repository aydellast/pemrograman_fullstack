const db = require('../config/database');

const getGoals = (userId, callback) => {
    const sql = `SELECT * FROM saving_goals WHERE id_user = ?`;
    db.query(sql, [userId], callback);
};

const createGoal = (data, callback) => {
    const sql = `
        INSERT INTO saving_goals (id_user, goal_name, target_amount, target_date)
        VALUES (?, ?, ?, ?)
    `;
    db.query(sql, data, callback);
};

const addContribution = (data, callback) => {
    const sql = `
        INSERT INTO saving_contributions (id_goal, amount, contribution_date)
        VALUES (?, ?, ?)
    `;
    db.query(sql, data, callback);
};

module.exports = {
    getGoals,
    createGoal,
    addContribution
};
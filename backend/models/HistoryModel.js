const db = require('../config/database');

const getHistory = (userId, callback) => {
    const sql = `
        SELECT 
            t.*, 
            c.name AS category_name,
            c.type AS transaction_type
        FROM transactions t
        JOIN categories c ON t.id_category = c.id_category
        WHERE t.id_user = ?
        ORDER BY t.transaction_date DESC
    `;

    db.query(sql, [userId], callback);
};

const getHistoryById = (id, userId, callback) => {
    const sql = `
        SELECT 
            t.*, 
            c.name AS category_name,
            c.type AS transaction_type
        FROM transactions t
        JOIN categories c ON t.id_category = c.id_category
        WHERE t.id_transaction = ? AND t.id_user = ?
    `;

    db.query(sql, [id, userId], callback);
};

module.exports = {
    getHistory,
    getHistoryById
};
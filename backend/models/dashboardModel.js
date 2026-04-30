const db = require('../config/database');

const Dashboard = {
    /**
     * Menghitung total pemasukan, pengeluaran, dan sisa saldo user
     * @param {Number} id_user - ID user yang sedang login
     * @param {Function} callback - Fungsi untuk menangani hasil query
     */
    getSummary: (id_user, callback) => {
        const query = `
            SELECT 
                IFNULL(SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END), 0) AS total_income,
                IFNULL(SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END), 0) AS total_expense,
                IFNULL(
                    (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - 
                     SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)), 
                0) AS balance
            FROM transactions 
            WHERE id_user = ?
        `;

        db.query(query, [id_user], callback);
    }
};

module.exports = Dashboard;
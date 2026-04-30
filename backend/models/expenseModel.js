const db = require('../config/database');

const Expense = {
    /**
     * Simpan pengeluaran baru ke tabel transactions
     * Tanpa kolom 'type' karena tipe ditentukan oleh id_category
     */
    create: (data, callback) => {
        const query = `
            INSERT INTO transactions 
            (id_user, id_category, amount, transaction_date, description) 
            VALUES (?, ?, ?, ?, ?)
        `;
        
        const values = [
            data.id_user, 
            data.id_category, 
            data.amount, 
            data.transaction_date, 
            data.description
        ];

        db.query(query, values, callback);
    },

    /**
     * Ambil daftar pengeluaran berdasarkan User ID
     */
    getByUserId: (id_user, callback) => {
        const query = `
            SELECT t.*, c.name AS category_name 
            FROM transactions t
            JOIN categories c ON t.id_category = c.id_category
            WHERE t.id_user = ? AND c.type = 'Expense'
            ORDER BY t.transaction_date DESC
        `;
        db.query(query, [id_user], callback);
    }
};

module.exports = Expense;
const db = require('../config/database');

const expenseController = {
    // 1. Mengambil semua data pengeluaran (Ditingkatkan dengan JOIN)
    getAllExpenses: (req, res) => {
        // Menggunakan JOIN agar bisa menampilkan Nama Kategori, bukan sekadar ID
        const query = `
            SELECT t.*, c.name AS category_name 
            FROM transactions t
            JOIN categories c ON t.id_category = c.id_category
            WHERE c.type = 'Expense' 
            ORDER BY t.transaction_date DESC`;

        db.query(query, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: "Daftar pengeluaran berhasil diambil", data: results });
        });
    },

    // 2. Menambah pengeluaran baru
    addExpense: (req, res) => {
        const { id_user, id_category, amount, transaction_date, description } = req.body;
        
        // Kolom 'type' tidak ada di tabel transactions, tipe ditentukan di tabel categories
        const query = "INSERT INTO transactions (id_user, id_category, amount, transaction_date, description) VALUES (?, ?, ?, ?, ?)";
        
        db.query(query, [id_user, id_category, amount, transaction_date, description], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ 
                message: "Pengeluaran berhasil dicatat!", 
                id: result.insertId 
            });
        });
    },

    // 3. Menghapus pengeluaran berdasarkan ID
    deleteExpense: (req, res) => {
        const { id } = req.params;
        const query = "DELETE FROM transactions WHERE id_transaction = ?";
        
        db.query(query, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
            res.json({ message: "Pengeluaran berhasil dihapus" });
        });
    }
};

module.exports = expenseController;
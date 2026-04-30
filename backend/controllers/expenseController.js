const Expense = require('../models/expenseModel');

const expenseController = {
    // 1. Mengambil semua data pengeluaran (Sekarang lewat Model)
    getAllExpenses: (req, res) => {
        // Asumsi: Kita butuh ID User untuk mengambil data yang spesifik
        const { id_user } = req.query; 

        Expense.getByUserId(id_user, (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ 
                message: "Daftar pengeluaran berhasil diambil", 
                data: results 
            });
        });
    },

    // 2. Menambah pengeluaran baru
    addExpense: (req, res) => {
        const data = req.body;
        
        // Memanggil fungsi create di expenseModel.js
        Expense.create(data, (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ 
                message: "Pengeluaran berhasil dicatat! ✅", 
                id: result.insertId 
            });
        });
    },

    // 3. Menghapus pengeluaran berdasarkan ID
    deleteExpense: (req, res) => {
        const { id } = req.params;
        
        // Kita langsung jalankan query delete di sini atau bisa tambahkan ke Model nanti
        // Untuk sekarang, agar sejalan dengan Controller lama kamu:
        const db = require('../config/database'); 
        const query = "DELETE FROM transactions WHERE id_transaction = ?";
        
        db.query(query, [id], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            if (result.affectedRows === 0) return res.status(404).json({ message: "Data tidak ditemukan" });
            res.json({ message: "Pengeluaran berhasil dihapus" });
        });
    }
};

module.exports = expenseController;
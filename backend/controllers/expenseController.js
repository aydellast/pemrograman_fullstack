<<<<<<< HEAD
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

=======
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

>>>>>>> 2242bcf8c7c87a440b14f1b1cbd8db7de020a6ff
module.exports = expenseController;
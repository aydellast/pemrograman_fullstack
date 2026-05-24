const db = require('../config/database');

const expenseController = { 
    // --- 1. FITUR READ (MENAMPILKAN SEMUA PENGELUARAN) ---
    getAllExpenses: (req, res) => {
        // Query untuk mengambil data pengeluaran milik user yang sedang login
        const id_user = req.user.id; 
        const query = "SELECT * FROM pengeluaran WHERE id_user = ?";

        db.query(query, [id_user], (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Gagal mengambil data", error: err.message });
            }
            res.status(200).json(results);
        });
    },

    // --- 2. FITUR CREATE (TAMBAH PENGELUARAN) ---
    addExpense: async (req, res) => { 
        try { 
            const { id_category, amount, transaction_date, description } = req.body; 
            const id_user = req.user.id; 
            const bukti_pengeluaran = req.file ? req.file.filename : null; 
 
            if (!amount || amount <= 0) { 
                return res.status(400).json({ message: "Jumlah pengeluaran tidak valid!" }); 
            } 
 
            const query = "INSERT INTO pengeluaran (id_user, id_category, amount, transaction_date, description, image_url) VALUES (?, ?, ?, ?, ?, ?)";
             
            db.query(query, [id_user, id_category, amount, transaction_date, description, bukti_pengeluaran], (err, result) => { 
                if (err) {
                    return res.status(500).json({ message: "Gagal menyimpan ke database", error: err.message });
                }
                
                res.status(201).json({ 
                    message: "Pengeluaran berhasil dicatat! ✅",
                    data: {
                        id_transaksi: result.insertId,
                        bukti: bukti_pengeluaran
                    }
                }); 
            }); 

        } catch (error) { 
            res.status(500).json({ message: "Gagal memproses pengeluaran", error: error.message }); 
        } 
    } 
}; 

module.exports = expenseController;
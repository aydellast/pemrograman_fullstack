const db = require('../config/database'); 
 
const dashboardController = { 
    getSummary: async (req, res) => { 
        try { 
            // SPRINT 6: ID diambil otomatis dari middleware verifyToken
            const id_user = req.user.id; 
 
            // Perbaikan Query: Menggunakan tabel 'pengeluaran'
            // Kita hitung total_expense dari tabel pengeluaran milik user tersebut
            const query = ` 
                SELECT  
                    SUM(amount) AS total_expense 
                FROM pengeluaran 
                WHERE id_user = ? 
            `; 
 
            db.query(query, [id_user], (err, results) => { 
                if (err) {
                    return res.status(500).json({ message: "Gagal query ke database", error: err.message });
                }
                 
                // SPRINT 5: Validasi agar data null berubah jadi 0
                const expense = results[0].total_expense || 0; 
 
                res.status(200).json({ 
                    message: "Data ringkasan dashboard berhasil ditarik 📊", 
                    data: { 
                        total_income: 0, // Sementara 0 jika kamu belum membuat tabel pemasukan
                        total_expense: expense, 
                        balance: 0 - expense 
                    } 
                }); 
            }); 
        } catch (error) { 
            // SPRINT 5: Error handling agar aplikasi tetap stabil
            res.status(500).json({ message: "Gagal menarik data dashboard", error: error.message }); 
        } 
    } 
}; 

module.exports = dashboardController;
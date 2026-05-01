const db = require('../config/database'); 
 
const dashboardController = { 
    getSummary: async (req, res) => { 
        try { 
            // SPRINT 6: Langsung ambil ID dari Token (Meisha tidak perlu input ID manual lagi)
            const id_user = req.user.id; 
 
            // Query untuk menghitung total income dan expense secara otomatis
            const query = ` 
                SELECT  
                    SUM(CASE WHEN c.type = 'Income' THEN t.amount ELSE 0 END) AS total_income, 
                    SUM(CASE WHEN c.type = 'Expense' THEN t.amount ELSE 0 END) AS total_expense 
                FROM transactions t 
                JOIN categories c ON t.id_category = c.id_category 
                WHERE t.id_user = ? 
            `; 
 
            db.query(query, [id_user], (err, results) => { 
                if (err) throw err; 
                 
                // SPRINT 5: Validasi agar data null berubah jadi 0 (mencegah error di tampilan)
                const income = results[0].total_income || 0; 
                const expense = results[0].total_expense || 0; 
                const balance = income - expense; 
 
                res.status(200).json({ 
                    message: "Data ringkasan dashboard berhasil ditarik 📊", 
                    data: { 
                        total_income: income, 
                        total_expense: expense, 
                        balance: balance 
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
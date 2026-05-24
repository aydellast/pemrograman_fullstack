const db = require('../config/database');

const chartController = {
    // Fungsi untuk Grafik Pengeluaran (Pie/Bar Chart)
    getExpenseChart: async (req, res) => {
        try { // SPRINT 5: Try-Catch
            const id_user = req.user.id; // SPRINT 6: Ambil ID aman dari Token JWT

            // Query untuk menjumlahkan pengeluaran berdasarkan kategori
            const query = `
                SELECT c.name AS category_name, SUM(t.amount) AS total_amount
                FROM transactions t
                JOIN categories c ON t.id_category = c.id_category
                WHERE t.id_user = ? AND c.type = 'Expense'
                GROUP BY c.name
            `;

            db.query(query, [id_user], (err, results) => {
                if (err) throw err;
                res.status(200).json({
                    message: "Data grafik pengeluaran berhasil ditarik 📊",
                    data: results
                });
            });
        } catch (error) {
            res.status(500).json({ message: "Gagal menarik data grafik", error: error.message });
        }
    }
};

module.exports = chartController;
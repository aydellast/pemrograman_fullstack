const db = require('../config/database');

const dashboardController = {
    getChartData: (req, res) => {
        // 1. Query untuk menghitung Total Pemasukan (Income)
        const queryIncome = `
            SELECT SUM(t.amount) AS total_income 
            FROM transactions t
            JOIN categories c ON t.id_category = c.id_category
            WHERE c.type = 'Income'
        `;

        // 2. Query untuk menghitung Total Pengeluaran (Expense)
        const queryExpense = `
            SELECT SUM(t.amount) AS total_expense 
            FROM transactions t
            JOIN categories c ON t.id_category = c.id_category
            WHERE c.type = 'Expense'
        `;

        // Eksekusi Query Pertama (Pemasukan)
        db.query(queryIncome, (err, incomeResult) => {
            if (err) return res.status(500).json({ message: "Gagal mengambil data pemasukan", error: err.message });
            
            // Ambil angkanya, jika null/kosong jadikan 0
            const totalIncome = incomeResult[0].total_income || 0;

            // Eksekusi Query Kedua (Pengeluaran)
            db.query(queryExpense, (err, expenseResult) => {
                if (err) return res.status(500).json({ message: "Gagal mengambil data pengeluaran", error: err.message });
                
                // Ambil angkanya, jika null/kosong jadikan 0
                const totalExpense = expenseResult[0].total_expense || 0;
                
                // Hitung sisa saldo
                const balance = totalIncome - totalExpense;

                // Kirim hasil akhir ke Frontend/Postman
                res.status(200).json({
                    message: "Data rekapitulasi grafik berhasil diambil 📊",
                    data: {
                        total_income: Number(totalIncome),
                        total_expense: Number(totalExpense),
                        balance: Number(balance)
                    }
                });
            });
        });
    }
};

module.exports = dashboardController;
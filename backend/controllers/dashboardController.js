const db = require('../config/database');

const dashboardController = {

    // =========================
    // DASHBOARD SUMMARY
    // =========================
    getSummary: async (req, res) => {
        try {

            const id_user = req.user?.id || 1;

            const query = `
                SELECT
                    SUM(amount) AS total_expense
                FROM pengeluaran
                WHERE id_user = ?
            `;

            db.query(query, [id_user], (err, results) => {

                if (err) {
                    return res.status(500).json({
                        message: "Gagal query ke database",
                        error: err.message
                    });
                }

                const expense =
                    results[0].total_expense || 0;

                res.status(200).json({
                    message: "Data ringkasan dashboard berhasil ditarik 📊",
                    data: {
                        total_income: 0,
                        total_expense: expense,
                        balance: 0 - expense
                    }
                });
            });

        } catch (error) {

            res.status(500).json({
                message: "Gagal menarik data dashboard",
                error: error.message
            });
        }
    },

    // =========================
    // CHART DATA
    // =========================
    getChartData: async (req, res) => {
        try {

            const data = [
                {
                    month: "Jan",
                    income: 5000000,
                    expense: 3000000
                },
                {
                    month: "Feb",
                    income: 7000000,
                    expense: 4000000
                },
                {
                    month: "Mar",
                    income: 6500000,
                    expense: 3500000
                }
            ];

            res.status(200).json({
                message: "Data chart berhasil diambil 📈",
                data: data
            });

        } catch (error) {

            res.status(500).json({
                message: "Gagal mengambil data chart",
                error: error.message
            });
        }
    }

};

module.exports = dashboardController;
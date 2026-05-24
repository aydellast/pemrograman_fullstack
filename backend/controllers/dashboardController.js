const db = require('../config/database');

exports.getSummary = (req, res) => {
    try {

        const id_user = req.user.id_user;

        const query = `
            SELECT 
                SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
                SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expense
            FROM transactions
            WHERE id_user = ?
        `;

        db.query(query, [id_user], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Database error",
                    error: err.message
                });
            }

            const data = result[0];

            const income = data.total_income || 0;
            const expense = data.total_expense || 0;
            const balance = income - expense;

            res.json({
                message: "Dashboard summary berhasil",
                data: {
                    total_income: income,
                    total_expense: expense,
                    balance: balance
                }
            });
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};
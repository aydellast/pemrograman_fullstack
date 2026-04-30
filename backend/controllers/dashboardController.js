<<<<<<< HEAD
const db = require('../config/database');

const dashboardController = {
    getSummary: (req, res) => {
        const { id_user } = req.params;
        
        const query = `
            SELECT 
                SUM(CASE WHEN c.type = 'Income' THEN t.amount ELSE 0 END) as total_income,
                SUM(CASE WHEN c.type = 'Expense' THEN t.amount ELSE 0 END) as total_expense
            FROM transactions t
            JOIN categories c ON t.id_category = c.id_category
            WHERE t.id_user = ?`;

        db.query(query, [id_user], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            
            const summary = results[0];
            const balance = (summary.total_income || 0) - (summary.total_expense || 0);
            
            res.json({
                message: "Data dashboard berhasil dimuat",
                data: {
                    total_income: summary.total_income || 0,
                    total_expense: summary.total_expense || 0,
                    balance: balance
                }
            });
        });
    }
};

=======
const db = require('../config/database');

const dashboardController = {
    getSummary: (req, res) => {
        const { id_user } = req.params;
        
        const query = `
            SELECT 
                SUM(CASE WHEN c.type = 'Income' THEN t.amount ELSE 0 END) as total_income,
                SUM(CASE WHEN c.type = 'Expense' THEN t.amount ELSE 0 END) as total_expense
            FROM transactions t
            JOIN categories c ON t.id_category = c.id_category
            WHERE t.id_user = ?`;

        db.query(query, [id_user], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            
            const summary = results[0];
            const balance = (summary.total_income || 0) - (summary.total_expense || 0);
            
            res.json({
                message: "Data dashboard berhasil dimuat",
                data: {
                    total_income: summary.total_income || 0,
                    total_expense: summary.total_expense || 0,
                    balance: balance
                }
            });
        });
    }
};

>>>>>>> 2242bcf8c7c87a440b14f1b1cbd8db7de020a6ff
module.exports = dashboardController;
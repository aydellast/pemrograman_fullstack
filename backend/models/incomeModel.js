const db = require('../config/database'); 
const { validationResult } = require("express-validator");

// CREATE INCOME (Fokus Sprint 5)
exports.createIncome = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ status: "fail", errors: errors.array() });
    }

    try {
        const { id_user, id_category, amount, transaction_date, description } = req.body;

        if (!amount || isNaN(amount) || amount <= 0) {
            return res.status(400).json({ 
                status: "fail", 
                message: "Amount wajib diisi dengan angka dan lebih dari 0!" 
            });
        }

        const query = "INSERT INTO transactions (id_user, id_category, amount, transaction_date, description) VALUES (?, ?, ?, ?, ?)";
        
        db.query(query, [id_user, id_category, amount, transaction_date || new Date(), description], (err, result) => {
            if (err) {
                return res.status(500).json({ 
                    status: "error", 
                    message: "Database Error: " + err.message 
                });
            }

            res.status(201).json({
                status: "success",
                message: "Pemasukan berhasil dicatat!",
                data: { id: result.insertId, amount }
            });
        });

    } catch (error) {
        res.status(500).json({ 
            status: "error", 
            message: "Terjadi kesalahan server", 
            error: error.message 
        });
    }
};
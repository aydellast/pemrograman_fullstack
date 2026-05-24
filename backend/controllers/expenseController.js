const db = require('../config/database');

const expenseController = {
<<<<<<< HEAD
=======

    // --- 1. FITUR READ ---
    getAllExpenses: (req, res) => {
        const id_user = req.user?.id || 1;

        const query = "SELECT * FROM pengeluaran WHERE id_user = ?";
>>>>>>> 575d41d (Save frontend progress before sync)

    // --- 1. FITUR READ ---
    getAllExpenses: (req, res) => {
        const id_user = req.user?.id || 1;

const query=`
SELECT
t.*,
c.name AS category_name
FROM transactions t
JOIN categories c
ON t.id_category=c.id_category
WHERE t.id_user=?
AND c.type='Expense'
ORDER BY t.transaction_date DESC
`;
        db.query(query, [id_user], (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: "Gagal mengambil data",
                    error: err.message
                });
            }

            res.status(200).json(results);
        });
    },

    // --- 2. FITUR CREATE ---
    addExpense: async (req, res) => {
        try {
            const {
                id_category,
                amount,
                transaction_date,
                description
            } = req.body;

            const id_user = req.user?.id || 1;

            const bukti_pengeluaran =
                req.file ? req.file.filename : null;

            if (!amount || amount <= 0) {
                return res.status(400).json({
                    message: "Jumlah pengeluaran tidak valid!"
                });
            }

            const query =
<<<<<<< HEAD
                "INSERT INTO transactions (id_user, id_category, amount, transaction_date, description, image_url) VALUES (?, ?, ?, ?, ?, ?)";
=======
                "INSERT INTO pengeluaran (id_user, id_category, amount, transaction_date, description, image_url) VALUES (?, ?, ?, ?, ?, ?)";
>>>>>>> 575d41d (Save frontend progress before sync)

            db.query(
                query,
                [
                    id_user,
                    id_category,
                    amount,
                    transaction_date,
                    description,
                    bukti_pengeluaran
                ],
                (err, result) => {
                    if (err) {
                        return res.status(500).json({
                            message: "Gagal menyimpan ke database",
                            error: err.message
                        });
                    }

                    res.status(201).json({
                        message: "Pengeluaran berhasil dicatat! ✅",
                        data: {
<<<<<<< HEAD
                            id_transaction: result.insertId,
=======
                            id_transaksi: result.insertId,
>>>>>>> 575d41d (Save frontend progress before sync)
                            bukti: bukti_pengeluaran
                        }
                    });
                }
            );

        } catch (error) {
            res.status(500).json({
                message: "Gagal memproses pengeluaran",
                error: error.message
            });
        }
    },

    // --- 3. FITUR DELETE ---
    deleteExpense: (req, res) => {
        const { id } = req.params;

        const query =
            "DELETE FROM transactions WHERE id_transaction = ?";

        db.query(query, [id], (err, result) => {
            if (err) {
                return res.status(500).json({
                    message: "Gagal menghapus pengeluaran",
                    error: err.message
                });
            }

            res.status(200).json({
                message: "Pengeluaran berhasil dihapus!"
            });
        });
    }
};

module.exports = expenseController;
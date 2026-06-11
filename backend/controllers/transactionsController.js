const db = require('../config/database');

// GET ALL TRANSACTIONS
exports.getAllTransactions = (req, res) => {

    const query = `
SELECT
    t.id_transaction,
    t.amount,
    t.transaction_date,
    t.description,
    c.name AS category_name,
    c.type AS transaction_type
FROM transactions t
JOIN categories c
ON t.id_category = c.id_category
ORDER BY t.transaction_date DESC
`;

    db.query(query, (err, results) => {

        if (err) {
            return res.status(500).json({
                message: "Gagal mengambil data transaksi",
                error: err.message
            });
        }

        res.status(200).json(results);
    });
};

// CREATE TRANSACTION
exports.createTransaction = (req, res) => {
    res.json({ message: "Menambahkan data transaksi baru" });
};

// UPDATE TRANSACTION
exports.updateTransaction = (req, res) => {
    res.json({ message: "Mengedit data transaksi" });
};

// DELETE TRANSACTION
exports.deleteTransaction = (req, res) => {
    res.json({ message: "Menghapus data transaksi" });
};
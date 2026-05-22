const db = require('../config/database');

// ==========================
// CREATE
// ==========================
const addIncome = (req, res) => {
    const { amount, category_id, description } = req.body;
    const id_user = req.user?.id_user;

    if (!amount || !category_id) {
        return res.status(400).json({
            message: "Amount dan kategori wajib diisi"
        });
    }

    if (!id_user) {
        return res.status(401).json({
            message: "User tidak terdeteksi, login dulu"
        });
    }

    const query = `
        INSERT INTO incomes (amount, category_id, description, id_user)
        VALUES (?, ?, ?, ?)
    `;

    db.query(query, [amount, category_id, description || null, id_user], (err, result) => {
        if (err) {
            console.error("ERROR DB:", err);
            return res.status(500).json({
                message: "Gagal menambahkan income",
                error: err.message
            });
        }

        res.status(201).json({
            message: "Income berhasil ditambahkan",
            data: {
                id: result.insertId,
                amount,
                category_id,
                description,
                id_user
            }
        });
    });
};

// ==========================
// READ ALL
// ==========================
const getAllIncome = (req, res) => {
    const id_user = req.user?.id_user;

    const query = `
        SELECT i.*, c.name AS category_name
        FROM incomes i
        JOIN categories c ON i.category_id = c.id
        WHERE i.id_user = ?
        ORDER BY i.created_at DESC
    `;

    db.query(query, [id_user], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gagal mengambil data income" });
        }

        res.json(results);
    });
};

// ==========================
// GET BY ID
// ==========================
const getIncomeById = (req, res) => {
    const { id } = req.params;

    const query = `
        SELECT * FROM incomes WHERE id = ?
    `;

    db.query(query, [id], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gagal mengambil data" });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: "Income tidak ditemukan" });
        }

        res.json(results[0]);
    });
};

// ==========================
// UPDATE
// ==========================
const updateIncome = (req, res) => {
    const { id } = req.params;
    const { amount, category_id, description } = req.body;

    const query = `
        UPDATE incomes
        SET amount = ?, category_id = ?, description = ?
        WHERE id = ?
    `;

    db.query(query, [amount, category_id, description, id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gagal update income" });
        }

        res.json({ message: "Income berhasil diupdate" });
    });
};

// ==========================
// DELETE
// ==========================
const deleteIncome = (req, res) => {
    const { id } = req.params;

    const query = `DELETE FROM incomes WHERE id = ?`;

    db.query(query, [id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: "Gagal hapus income" });
        }

        res.json({ message: "Income berhasil dihapus" });
    });
};

// ==========================
// FILTER BY DATE
// ==========================
const filterIncomeByDate = (req, res) => {
    const { start, end } = req.query;
    const id_user = req.user?.id_user;

    const query = `
        SELECT * FROM incomes
        WHERE id_user = ? AND created_at BETWEEN ? AND ?
    `;

    db.query(query, [id_user, start, end], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Gagal filter data" });
        }

        res.json(results);
    });
};

// ==========================
// SUMMARY (TOTAL)
// ==========================
const getTotalIncome = (req, res) => {
    const id_user = req.user?.id_user;

    const query = `
        SELECT SUM(amount) AS total_income
        FROM incomes
        WHERE id_user = ?
    `;

    db.query(query, [id_user], (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Gagal ambil total" });
        }

        res.json(results[0]);
    });
};

module.exports = {
    addIncome,
    getAllIncome,
    getIncomeById,
    updateIncome,
    deleteIncome,
    filterIncomeByDate,
    getTotalIncome
};
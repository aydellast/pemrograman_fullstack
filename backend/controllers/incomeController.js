const db = require('../config/database');

const addIncome = (req, res) => {

    const {
        amount,
        id_category,
        description
    } = req.body;

    const id_user = req.user?.id;

    if (!amount || !id_category) {

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
        INSERT INTO transactions
        (
            id_user,
            id_category,
            amount,
            transaction_date,
            description
        )
        VALUES (?, ?, ?, NOW(), ?)
    `;

    db.query(
        query,
        [
            id_user,
            id_category,
            amount,
            description || null
        ],
        (err, result) => {

            if (err) {

                console.error("ERROR ADD INCOME:", err);

                return res.status(500).json({
                    message: "Gagal menambahkan income",
                    error: err.message
                });
            }

            res.status(201).json({
                message: "Income berhasil ditambahkan",
                data: {
                    id_transaction: result.insertId,
                    id_user,
                    id_category,
                    amount,
                    description
                }
            });
        }
    );
};

const getAllIncome = (req, res) => {

    const id_user = req.user?.id;

    const query = `
        SELECT 
            t.*,
            c.name AS category_name,
            c.type
        FROM transactions t
        LEFT JOIN categories c
            ON t.id_category = c.id_category
        WHERE t.id_user = ?
        AND c.type = 'Income'
        ORDER BY t.transaction_date DESC
    `;

    db.query(query, [id_user], (err, results) => {

        if (err) {

            console.error("ERROR GET INCOME:", err);

            return res.status(500).json({
                message: "Gagal mengambil data income",
                error: err.message
            });
        }

        res.status(200).json(results);
    });
};

const getIncomeById = (req, res) => {

    const { id } = req.params;

    const query = `
        SELECT 
            t.*,
            c.name AS category_name,
            c.type
        FROM transactions t
        LEFT JOIN categories c
            ON t.id_category = c.id_category
        WHERE t.id_transaction = ?
        AND c.type = 'Income'
    `;

    db.query(query, [id], (err, results) => {

        if (err) {

            console.error("ERROR GET BY ID:", err);

            return res.status(500).json({
                message: "Gagal mengambil data income",
                error: err.message
            });
        }

        if (results.length === 0) {

            return res.status(404).json({
                message: "Income tidak ditemukan"
            });
        }

        res.status(200).json(results[0]);
    });
};

const updateIncome = (req, res) => {

    const { id } = req.params;

    const {
        amount,
        id_category,
        description
    } = req.body;

    const query = `
        UPDATE transactions
        SET
            amount = ?,
            id_category = ?,
            description = ?
        WHERE id_transaction = ?
    `;

    db.query(
        query,
        [
            amount,
            id_category,
            description,
            id
        ],
        (err, result) => {

            if (err) {

                console.error("ERROR UPDATE:", err);

                return res.status(500).json({
                    message: "Gagal update income",
                    error: err.message
                });
            }

            res.status(200).json({
                message: "Income berhasil diupdate"
            });
        }
    );
};

const deleteIncome = (req, res) => {

    const { id } = req.params;

    const query = `
        DELETE FROM transactions
        WHERE id_transaction = ?
    `;

    db.query(query, [id], (err, result) => {

        if (err) {

            console.error("ERROR DELETE:", err);

            return res.status(500).json({
                message: "Gagal hapus income",
                error: err.message
            });
        }

        res.status(200).json({
            message: "Income berhasil dihapus"
        });
    });
};

const filterIncomeByDate = (req, res) => {

    const {
        start,
        end
    } = req.query;

    const id_user = req.user?.id;

    const query = `
        SELECT 
            t.*,
            c.name AS category_name,
            c.type
        FROM transactions t
        LEFT JOIN categories c
            ON t.id_category = c.id_category
        WHERE t.id_user = ?
        AND c.type = 'Income'
        AND t.transaction_date BETWEEN ? AND ?
    `;

    db.query(
        query,
        [
            id_user,
            start,
            end
        ],
        (err, results) => {

            if (err) {

                console.error("ERROR FILTER:", err);

                return res.status(500).json({
                    message: "Gagal filter income",
                    error: err.message
                });
            }

            res.status(200).json(results);
        }
    );
};

const getTotalIncome = (req, res) => {

    const id_user = req.user?.id;

    const query = `
        SELECT 
            SUM(t.amount) AS total_income
        FROM transactions t
        LEFT JOIN categories c
            ON t.id_category = c.id_category
        WHERE t.id_user = ?
        AND c.type = 'Income'
    `;

    db.query(query, [id_user], (err, results) => {

        if (err) {

            console.error("ERROR TOTAL:", err);

            return res.status(500).json({
                message: "Gagal mengambil total income",
                error: err.message
            });
        }

        res.status(200).json(results[0]);
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
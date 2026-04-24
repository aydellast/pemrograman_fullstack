const historyModel = require('../models/historyModel');

const getHistory = (req, res) => {
    const userId = req.user.id_user;

    historyModel.getHistory(userId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Gagal ambil history' });
        }

        res.json({
            message: 'Berhasil ambil history',
            data: results
        });
    });
};

const getHistoryById = (req, res) => {
    const userId = req.user.id_user;
    const { id } = req.params;

    historyModel.getHistoryById(id, userId, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error' });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Data tidak ditemukan' });
        }

        res.json({
            message: 'Detail transaksi',
            data: results[0]
        });
    });
};

module.exports = {
    getHistory,
    getHistoryById
};
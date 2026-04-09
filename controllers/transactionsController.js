// otak untuk mengatur tabel transactions

exports.getAllTransactions = (req, res) => {
    res.json({ message: "Menampilkan semua data transaksi CuppyCash" });
};

exports.createTransaction = (req, res) => {
    res.json({ message: "Menambahkan data transaksi baru" });
};

exports.updateTransaction = (req, res) => {
    res.json({ message: "Mengedit data transaksi" });
};

exports.deleteTransaction = (req, res) => {
    res.json({ message: "Menghapus data transaksi" });
};
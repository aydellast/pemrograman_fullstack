// Import express
const express = require("express");
// Membuat object express
const app = express();
const port = 3000;

// ==========================================
// ROUTING UTAMA & TRANSAKSI CUPPYCASH
// ==========================================

// Endpoint utama (Home)
app.get("/", (req, res) => {
    res.send("Welcome to CuppyCash API - Smart Finance Tracker!");
});

// Menampilkan semua data transaksi (Read)
app.get("/transactions", (req, res) => {
    res.send("Menampilkan semua data transaksi CuppyCash");
});

// Menambahkan data transaksi baru (Create)
app.post("/transactions", (req, res) => {
    res.send("Menambahkan data transaksi baru");
});

// Mengedit data transaksi (Update)
app.put("/transactions", (req, res) => {
    res.send("Mengedit data transaksi CuppyCash");
});

// Menghapus data transaksi (Delete)
app.delete("/transactions", (req, res) => {
    res.send("Menghapus data transaksi CuppyCash");
});

// ==========================================

// Menjalankan server
app.listen(port, () => {
    console.log(`CuppyCash Server is running on http://localhost:${port}`);
});
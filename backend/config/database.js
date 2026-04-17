const mysql = require('mysql2');
require('dotenv').config();

// Buat koneksi ke database
const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

// Test koneksi di terminal
db.connect((err) => {
    if (err) {
        console.log("Koneksi database gagal: ", err);
    } else {
        console.log("Koneksi database MySQL BERHASIL!");
    }
});

module.exports = db;
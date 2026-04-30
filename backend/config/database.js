const mysql = require('mysql2');
require('dotenv').config();

// PERBAIKAN: Gunakan createPool, bukan createConnection
const db = mysql.createPool({
    host: '127.0.0.1',
    port: 3307, // Pastikan port ini sesuai dengan setting di XAMPP/MySQL kamu
    user: 'root',
    password: '',
    database: 'cuppycash_final',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// Test koneksi di terminal
db.getConnection((err, connection) => {
    if (err) {
        console.log("Koneksi database gagal: ", err);
    } else {
        console.log("Koneksi database MySQL BERHASIL!");
        connection.release(); // Melepaskan koneksi kembali ke pool
    }
});

module.exports = db;
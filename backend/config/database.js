const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306, 
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'cuppycash_db', // Mengambil 'cuppycash_db' dari .env
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

db.getConnection((err, connection) => {
    if (err) {
        console.log("Koneksi database gagal: ", err.message);
    } else {
        console.log("Koneksi database MySQL BERHASIL ke: " + (process.env.DB_NAME || 'cuppycash_db'));
        connection.release();
    }
});

module.exports = db;
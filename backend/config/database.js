const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createPool({
    host: '127.0.0.1',
    user: 'root',
    port: 3306,
    password: '',
    database: 'cuppycash_db',
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
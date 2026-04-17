const db = require('../config/database'); // Import koneksi database dari folder config

const UserModel = {
    // 1. Fungsi untuk mencari user berdasarkan email (Dipakai saat Login & Register)
    findByEmail: (email, callback) => {
        const query = "SELECT * FROM users WHERE email = ?";
        db.query(query, [email], (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results[0]); 
        });
    },

    // 2. Fungsi untuk menyimpan data user baru (Dipakai saat Register)
    create: (userData, callback) => {
        // Menggunakan 'username' sesuai dengan struktur SQL terbaru
        const query = "INSERT INTO users (username, email, password) VALUES (?, ?, ?)";
        const values = [userData.username, userData.email, userData.password];
        
        db.query(query, values, (err, results) => {
            if (err) {
                return callback(err, null);
            }
            return callback(null, results);
        });
    }
};

module.exports = UserModel;
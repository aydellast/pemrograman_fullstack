const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    // 1. Cek apakah user membawa Karcis di dalam kantong "Authorization"
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: "Akses ditolak! Kamu harus login dulu." });
    }

    // 2. Format Karcis yang benar adalah "Bearer <token_panjang_kamu>"
    // Kita pisahkan kata "Bearer" dan ambil tokennya saja
    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Format token salah!" });
    }

    try {
        // 3. Satpam mengecek keaslian token menggunakan Kunci Rahasia
        const secretKey = process.env.JWT_SECRET || 'rahasia_cuppycash_super_aman';
        const verified = jwt.verify(token, secretKey);
        
        // 4. Kalau asli, catat identitas user (id_user & email) lalu persilakan masuk
        req.user = verified; 
        
        next(); // Perintah untuk "Silakan lewat ke proses selanjutnya"
    } catch (err) {
        // Kalau tokennya kedaluwarsa atau palsu
        res.status(400).json({ message: "Token tidak valid atau sudah kedaluwarsa! Silakan login ulang." });
    }
};

module.exports = verifyToken;
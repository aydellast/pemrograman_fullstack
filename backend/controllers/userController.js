const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const userController = {
    // ==========================================
    // 1. FUNGSI REGISTER (Daftar Akun Baru)
    // ==========================================
    register: async (req, res) => {
        // Menangkap data yang dikirim user dari Postman/Frontend
        const { username, email, password } = req.body;

        // Validasi: Cek apakah ada kolom yang dibiarkan kosong
        if (!username || !email || !password) {
            return res.status(400).json({ message: "Semua kolom (username, email, password) wajib diisi!" });
        }

        try {
            // Cek apakah email sudah pernah didaftarkan sebelumnya
            UserModel.findByEmail(email, async (err, existingUser) => {
                if (err) return res.status(500).json({ message: "Error pada server", error: err });
                
                if (existingUser) {
                    return res.status(400).json({ message: "Email sudah terdaftar, silakan gunakan email lain atau langsung login." });
                }

                // Proses Hashing: Mengacak password asli menjadi karakter rahasia
                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                // Menyiapkan data untuk dikirim ke UserModel (Database)
                const userData = {
                    username: username,
                    email: email,
                    password: hashedPassword // Yang disimpan adalah password acak, BUKAN password asli
                };

                // Menyimpan ke database
                UserModel.create(userData, (err, result) => {
                    if (err) return res.status(500).json({ message: "Gagal menyimpan data user", error: err });
                    
                    res.status(201).json({ message: "Registrasi berhasil! Akun kamu sudah aktif. ✅" });
                });
            });
        } catch (error) {
            res.status(500).json({ message: "Terjadi kesalahan internal server." });
        }
    },

    // ==========================================
    // 2. FUNGSI LOGIN (Masuk ke Akun)
    // ==========================================
    login: (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password wajib diisi!" });
        }

        // Cari data user di database berdasarkan email yang diketik
        UserModel.findByEmail(email, async (err, user) => {
            if (err) return res.status(500).json({ message: "Error pada server", error: err });
            
            // Jika email tidak ditemukan di database
            if (!user) {
                return res.status(404).json({ message: "Akun tidak ditemukan. Silakan register terlebih dahulu!" });
            }

            // Proses Pencocokan: Bandingkan password ketikan user dengan password acak di database
            const isPasswordMatch = await bcrypt.compare(password, user.password);
            
            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Password salah! Coba lagi." });
            }

            // Jika cocok, buatkan Karcis Akses (Token JWT)
            // Token ini yang akan dipakai user untuk masuk ke fitur-fitur lain (seperti tambah transaksi)
            const secretKey = process.env.JWT_SECRET || 'rahasia_cuppycash_super_aman'; 
            
            // Token berlaku selama 24 jam
            const token = jwt.sign({ id_user: user.id_user, email: user.email }, secretKey, { expiresIn: '24h' });

            res.status(200).json({
                message: "Login berhasil! Selamat datang kembali. 🎉",
                token: token
            });
        });
    }
};

module.exports = userController;
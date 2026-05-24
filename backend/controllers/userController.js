const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require('../models/UserModel');

const userController = {
    // ==========================================
    // 1. FUNGSI REGISTER (Daftar Akun Baru)
    // ==========================================
    register: async (req, res) => {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ message: "Semua kolom (username, email, password) wajib diisi!" });
        }

        try {
            UserModel.findByEmail(email, async (err, existingUser) => {
                if (err) return res.status(500).json({ message: "Error pada server", error: err });
                
                if (existingUser) {
                    return res.status(400).json({ message: "Email sudah terdaftar, silakan gunakan email lain atau langsung login." });
                }

                const saltRounds = 10;
                const hashedPassword = await bcrypt.hash(password, saltRounds);

                const userData = {
                    username: username,
                    email: email,
                    password: hashedPassword 
                };

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

        UserModel.findByEmail(email, async (err, user) => {
            if (err) return res.status(500).json({ message: "Error pada server", error: err });
            
            if (!user) {
                return res.status(404).json({ message: "Akun tidak ditemukan. Silakan register terlebih dahulu!" });
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);
            
            if (!isPasswordMatch) {
                return res.status(401).json({ message: "Password salah! Coba lagi." });
            }

            const secretKey = process.env.JWT_SECRET || 'rahasia_cuppycash_super_aman'; 
            
            const token = jwt.sign({ id_user: user.id_user, email: user.email }, secretKey, { expiresIn: '24h' });

            res.status(200).json({
                message: "Login berhasil! Selamat datang kembali. 🎉",
                token: token
            });
        });
    },

    // ==========================================
    // 3. FUNGSI UPLOAD FOTO PROFIL (BARU DITAMBAHKAN)
    // ==========================================
    uploadProfile: async (req, res) => {
        try {
            // 1. Cek apakah ada file yang berhasil diangkut oleh Multer
            if (!req.file) {
                return res.status(400).json({ message: "Tidak ada gambar yang diupload! ❌" });
            }

            // 2. Ambil nama file-nya (contoh: 171464738291.jpg)
            const namaFile = req.file.filename;

            // 3. Kasih response sukses ke Postman
            res.status(200).json({
                message: "Hore! Foto profil berhasil diupload! ✅",
                file_name: namaFile,
                url: `http://localhost:3000/uploads/${namaFile}`
            });

        } catch (error) {
            res.status(500).json({ message: "Waduh, servernya error ❌", error: error.message });
        }
    }
};

module.exports = userController;
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// 1. IMPORT SANG SATPAM (Middleware)
const verifyToken = require('../middleware/authMiddleware');

// ==========================================
// DAFTAR MENU (URL) UNTUK USERS
// ==========================================

router.post('/register', userController.register);
router.post('/login', userController.login);

// 2. BIKIN RUTE BARU YANG DIJAGA SATPAM
router.get('/profile', verifyToken, (req, res) => {
    // Kalau berhasil lewat satpam, kodingan ini baru akan dijalankan
    res.status(200).json({
        message: "Selamat! Kamu berhasil melewati Satpam karena membawa Karcis (Token) yang sah. 👮‍♂️✅",
        data_user: req.user // Ini data dari token yang dibongkar sama satpam
    });
});

module.exports = router;
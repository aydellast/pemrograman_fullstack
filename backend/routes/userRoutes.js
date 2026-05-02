const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

const verifyToken = require('../middleware/authMiddleware'); // Satpam Token
const upload = require('../middleware/uploadMiddleware');    // Tukang Angkut Gambar (Multer)

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({
        message: "Selamat! Kamu berhasil melewati Satpam karena membawa Karcis (Token) yang sah. 👮‍♂️✅",
        data_user: req.user 
    });
});


router.put(
    '/profile/upload', 
    verifyToken,                   
    upload.single('foto_profil'),  
    userController.uploadProfile   
);

module.exports = router;
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware'); 


// Route untuk login 
router.post('/login', authController.login); 

// Sekarang baris ini tidak akan eror lagi karena verifyToken sudah didefinisikan
router.get('/dashboard/summary/:id_user', verifyToken, dashboardController.getSummary);

module.exports = router;
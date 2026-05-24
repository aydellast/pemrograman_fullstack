const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const verifyToken = require('../middleware/authMiddleware'); // Proteksi Sprint 6

// Rute ini sekarang wajib menggunakan Token
router.get('/summary', verifyToken, dashboardController.getSummary);

module.exports = router;
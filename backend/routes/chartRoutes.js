const express = require('express');
const router = express.Router();

const chartController = require('../controllers/chartController');

// PERBAIKAN 1: Hapus kurung kurawal karena di middleware diexport langsung
const verifyToken = require('../middleware/authMiddleware');

// Rute Expense (Sudah aman)
router.get('/expense', verifyToken, chartController.getExpenseChart);



module.exports = router;
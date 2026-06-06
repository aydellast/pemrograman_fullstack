const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');
const verifyToken = require('../middleware/authMiddleware'); 
const upload = require('../middleware/uploadMiddleware'); 

router.get('/', verifyToken, expenseController.getAllExpenses);
router.post('/', verifyToken, upload.single('bukti_pengeluaran'), expenseController.addExpense);

module.exports = router;
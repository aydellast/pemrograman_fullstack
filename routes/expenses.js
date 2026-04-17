const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// Endpoint: GET /expenses (Lihat semua pengeluaran)
router.get('/', expenseController.getAllExpenses);

// Endpoint: POST /expenses (Tambah pengeluaran baru)
router.post('/', expenseController.addExpense);

// Endpoint: DELETE /expenses/:id (Hapus pengeluaran)
router.delete('/:id', expenseController.deleteExpense);

module.exports = router;
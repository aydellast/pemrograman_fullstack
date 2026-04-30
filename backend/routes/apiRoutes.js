const express = require('express');
const router = express.Router();

// Import Controller
const expenseController = require('../controllers/expenseController');
const dashboardController = require('../controllers/dashboardController');

// 1. Endpoint dasar untuk testing
router.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to CuppyCash API!",
        status: "Server is running smoothly"
    });
});

// ==========================================
// ROUTE UNTUK FITUR EXPENSE
// ==========================================
// Mengelompokkan semua route pengeluaran
router.get('/expenses', expenseController.getAllExpenses);
router.post('/expenses', expenseController.addExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);

// ==========================================
// ROUTE UNTUK FITUR DASHBOARD
// ==========================================
// Ambil ringkasan (Total Income, Total Expense, Balance) berdasarkan ID User
router.get('/dashboard/summary/:id_user', dashboardController.getSummary);

module.exports = router;
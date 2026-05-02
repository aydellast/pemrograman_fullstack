const express = require('express');
const router = express.Router();

// Import Controller & Routes
const expenseController = require('../controllers/expenseController');
const dashboardController = require('../controllers/dashboardController');

// Import file routes yang dipisah
const chartRoutes = require('./chartRoutes');
const manajemenUserRoutes = require('./manajemenUserRoutes'); 

// Endpoint dasar untuk testing
router.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to CuppyCash API!",
        status: "Server is running smoothly"
    });
});


router.use('/users', manajemenUserRoutes);


router.get('/expenses', expenseController.getAllExpenses);
router.post('/expenses', expenseController.addExpense);
router.delete('/expenses/:id', expenseController.deleteExpense);


router.get('/dashboard/summary/:id_user', dashboardController.getChartData);

router.use('/charts', chartRoutes);

module.exports = router;
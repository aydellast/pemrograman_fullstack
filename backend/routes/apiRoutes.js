const express = require('express');
const router = express.Router();

// Controllers
const expenseController = require('../controllers/expenseController');
const dashboardController = require('../controllers/dashboardController');
const authController = require('../controllers/authController');

// Middleware
const verifyToken = require('../middleware/authMiddleware');

// Routes terpisah
const chartRoutes = require('./chartRoutes');
const manajemenUserRoutes = require('./manajemenUserRoutes');


// ==============================
// ROOT TEST API
// ==============================

router.get('/', (req, res) => {
    res.json({
        message: "Welcome to CuppyCash API!",
        status: "Server is running smoothly"
    });
});


// ==============================
// AUTH ROUTES
// ==============================

router.post('/login', authController.login);


// ==============================
// DASHBOARD ROUTES
// ==============================

router.get(
    '/dashboard/summary/:id_user',
    verifyToken,
    dashboardController.getSummary
);

router.get(
    '/dashboard/chart/:id_user',
    dashboardController.getChartData
);


// ==============================
// EXPENSE ROUTES
// ==============================

router.get(
    '/expenses',
    expenseController.getAllExpenses
);

router.post(
    '/expenses',
    expenseController.addExpense
);

router.delete(
    '/expenses/:id',
    expenseController.deleteExpense
);


// ==============================
// USER ROUTES
// ==============================

router.use('/users', manajemenUserRoutes);


// ==============================
// CHART ROUTES
// ==============================

router.use('/charts', chartRoutes);


module.exports = router;
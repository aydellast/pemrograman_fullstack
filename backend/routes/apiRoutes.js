const express = require('express');
const router = express.Router();
<<<<<<< HEAD
=======

// Import Controller & Routes
const expenseController = require('../controllers/expenseController');
>>>>>>> 2c9597a0d2bb21ba0f63d72994ea04de6c1e20e8
const dashboardController = require('../controllers/dashboardController');
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/authMiddleware'); 

<<<<<<< HEAD

// Route untuk login 
router.post('/login', authController.login); 

// Sekarang baris ini tidak akan eror lagi karena verifyToken sudah didefinisikan
router.get('/dashboard/summary/:id_user', verifyToken, dashboardController.getSummary);
=======
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
>>>>>>> 2c9597a0d2bb21ba0f63d72994ea04de6c1e20e8

router.use('/charts', chartRoutes);

module.exports = router;
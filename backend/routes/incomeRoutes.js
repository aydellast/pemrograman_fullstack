const express = require('express');
const router = express.Router();

const incomeController = require('../controllers/incomeController');
const verifyToken = require('../middleware/authMiddleware');

// CRUD
router.post('/', verifyToken, incomeController.addIncome);
router.get('/', verifyToken, incomeController.getAllIncome);
router.get('/total', verifyToken, incomeController.getTotalIncome);
router.get('/filter', verifyToken, incomeController.filterIncomeByDate);
router.get('/:id', verifyToken, incomeController.getIncomeById);
router.put('/:id', verifyToken, incomeController.updateIncome);
router.delete('/:id', verifyToken, incomeController.deleteIncome);

module.exports = router;
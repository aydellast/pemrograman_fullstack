const express = require('express');
const router = express.Router();
const budgetController = require('../controllers/budgetController');

// GET semua budget
router.get('/:user_id', budgetController.getBudgets);

// GET detail 
router.get('/:user_id/detail', budgetController.getBudgetDetail);

// CREATE
router.post('/', budgetController.createBudget);

// UPDATE
router.put('/:id', budgetController.updateBudget);

// DELETE
router.delete('/:id', budgetController.deleteBudget);

module.exports = router;
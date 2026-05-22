// routes/apiRoutes.js
const express = require('express');
const router = express.Router();

const incomeController = require('../controllers/incomeController');
const verifyToken = require('../middleware/authMiddleware');

// ==========================
// CRUD INCOME + AUTH
// ==========================

// CREATE
router.post('/income', verifyToken, incomeController.addIncome);

// READ
router.get('/income', verifyToken, incomeController.getAllIncome);

// UPDATE
router.put('/income/:id', verifyToken, incomeController.updateIncome);

// DELETE
router.delete('/income/:id', verifyToken, incomeController.deleteIncome);

module.exports = router;
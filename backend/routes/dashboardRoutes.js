// routes/apiRoutes.js
const express = require('express');
const router = express.Router();

// import controller
const incomeController = require('../controllers/incomeController');

// ==========================
// CRUD INCOME (PEMASUKAN)
// ==========================

// CREATE (tambah pemasukan)
router.post('/income', incomeController.addIncome);

// READ (ambil semua pemasukan)
router.get('/income', incomeController.getAllIncome);

// UPDATE (ubah pemasukan berdasarkan id)
router.put('/income/:id', incomeController.updateIncome);

// DELETE (hapus pemasukan berdasarkan id)
router.delete('/income/:id', incomeController.deleteIncome);

module.exports = router;
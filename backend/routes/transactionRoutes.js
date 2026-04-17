const express = require('express');
const router = express.Router();

// Panggil controller yang tadi kita buat
const transactionsController = require('../controllers/transactionsController');

// Sambungkan alamat URL dengan fungsinya
router.get('/', transactionsController.getAllTransactions);
router.post('/', transactionsController.createTransaction);
router.put('/', transactionsController.updateTransaction);
router.delete('/', transactionsController.deleteTransaction);

module.exports = router;
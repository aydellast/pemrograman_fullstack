const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const historyController = require('../controllers/historyController');

router.get('/', verifyToken, historyController.getHistory);
router.get('/:id', verifyToken, historyController.getHistoryById);

module.exports = router;
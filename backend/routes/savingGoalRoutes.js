const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const savingGoalController = require('../controllers/savingGoalController');

router.get('/', verifyToken, savingGoalController.getGoals);
router.post('/', verifyToken, savingGoalController.createGoal);
router.post('/:id/contribution', verifyToken, savingGoalController.addContribution);

module.exports = router;
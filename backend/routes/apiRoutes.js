const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// ROOT API
router.get('/', (req, res) => {
    res.json({
        message: "Welcome to CuppyCash API 🚀"
    });
});

// AUTH
router.post('/login', authController.login);


module.exports = router;
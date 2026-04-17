const express = require('express');
const router = express.Router();

// Endpoint dasar untuk testing
router.get('/', (req, res) => {
    res.json({ 
        message: "Welcome to CuppyCash API!",
        status: "Server is running smoothly"
    });
});

module.exports = router;
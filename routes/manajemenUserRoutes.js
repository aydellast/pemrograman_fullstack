const express = require('express');
const router = express.Router();
const userController = require('../controllers/manajemenUserController');

// GET profil
router.get('/:id', userController.getProfile);

// UPDATE profil
router.put('/:id', userController.updateProfile);

module.exports = router;
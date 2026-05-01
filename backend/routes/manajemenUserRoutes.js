const express = require('express');
const router = express.Router();
const userController = require('../controllers/manajemenUserController');
const verifyToken = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// GET PROFILE
router.get('/profile', verifyToken, userController.getProfile);

// UPDATE PROFILE + UPLOAD FOTO
router.put(
  '/profile',
  verifyToken,
  upload.single('profile_picture'), 
  userController.updateProfile
);

module.exports = router;
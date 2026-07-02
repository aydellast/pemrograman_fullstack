const express = require("express");
const router = express.Router();

const userController = require("../controllers/manajemenUserController");
const verifyToken = require("../middleware/authMiddleware");
const authorize = require("../middleware/authorize");
const upload = require("../middleware/uploadMiddleware");

router.get(
  "/profile",
  verifyToken,
  userController.getProfile
);

router.put(
  "/profile",
  verifyToken,
  upload.single("profile_picture"),
  userController.updateProfile
);

router.get(
  "/all-users",
  verifyToken,
  authorize("Admin"),
  userController.getAllUsers
);

module.exports = router;
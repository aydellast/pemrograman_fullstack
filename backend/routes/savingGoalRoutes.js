const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const savingGoalController = require("../controllers/savingGoalController");
const upload = require("../middleware/uploadMiddleware"); // ⬅️ TAMBAH INI

// GET goals
router.get("/", verifyToken, savingGoalController.getGoals);

// POST goal + upload gambar (SPRINT 7)
router.post(
  "/",
  verifyToken,
  upload.single("gambar_target"), // ⬅️ INI KUNCI NYA
  savingGoalController.createGoal
);

// POST kontribusi
router.post(
  "/:id/contribution",
  verifyToken,
  savingGoalController.addContribution
);

module.exports = router;
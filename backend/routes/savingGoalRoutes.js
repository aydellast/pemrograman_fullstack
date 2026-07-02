const express = require("express");
const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");
const savingGoalController = require("../controllers/savingGoalController");

router.get("/", verifyToken, savingGoalController.getGoals);

router.get("/:id", verifyToken, savingGoalController.getGoalById);

router.post("/", verifyToken, savingGoalController.createGoal);

router.put("/:id", verifyToken, savingGoalController.updateGoal);

router.delete("/:id", verifyToken, savingGoalController.deleteGoal);

router.get(
  "/:id/contributions",
  verifyToken,
  savingGoalController.getContributions
);

router.post(
  "/:id/contributions",
  verifyToken,
  savingGoalController.addContribution
);

router.delete(
  "/contributions/:idContribution",
  verifyToken,
  savingGoalController.deleteContribution
);

module.exports = router;
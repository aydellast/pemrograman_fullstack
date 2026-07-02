const express = require("express");
const router = express.Router();

const expenseController = require("../controllers/expenseController");
const verifyToken = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");

router.get("/", verifyToken, expenseController.getAllExpenses);
router.get("/total", verifyToken, expenseController.getTotalExpense);
router.get("/:id", verifyToken, expenseController.getExpenseById);

router.post(
  "/",
  verifyToken,
  upload.single("bukti_pengeluaran"),
  expenseController.addExpense
);

router.put(
  "/:id",
  verifyToken,
  upload.single("bukti_pengeluaran"),
  expenseController.updateExpense
);

router.delete("/:id", verifyToken, expenseController.deleteExpense);

module.exports = router;
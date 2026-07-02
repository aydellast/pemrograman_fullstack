const express = require("express");
const router = express.Router();

const chartController = require("../controllers/chartController");
const verifyToken = require("../middleware/authMiddleware");

router.get("/summary", verifyToken, chartController.getChartSummary);

router.get("/monthly", verifyToken, chartController.getMonthlyChart);

router.get(
  "/expense-category",
  verifyToken,
  chartController.getExpenseCategoryChart
);

router.get(
  "/income-category",
  verifyToken,
  chartController.getIncomeCategoryChart
);

// Route lama tetap dipertahankan supaya tidak error kalau masih ada yang pakai
router.get(
  "/expense",
  verifyToken,
  chartController.getExpenseCategoryChart
);

module.exports = router;
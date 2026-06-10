const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// ==========================
// MIDDLEWARE
// ==========================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// DATABASE
const db = require('./config/database');

// ==========================
// ROUTES IMPORT
// ==========================
const apiRouter = require('./routes/apiRoutes');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const expenseRoutes = require('./routes/expensesRoutes');
const manajemenUserRoutes = require('./routes/manajemenUserRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const historyRoutes = require('./routes/historyRoutes');
const savingGoalRoutes = require('./routes/savingGoalRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const chartRoutes = require('./routes/chartRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

// ==========================
// DEBUG ROUTES TYPE
// ==========================
console.log("authRoutes:", typeof authRoutes);
console.log("transactionRoutes:", typeof transactionRoutes);
console.log("expenseRoutes:", typeof expenseRoutes);
console.log("manajemenUserRoutes:", typeof manajemenUserRoutes);
console.log("budgetRoutes:", typeof budgetRoutes);
console.log("historyRoutes:", typeof historyRoutes);
console.log("savingGoalRoutes:", typeof savingGoalRoutes);
console.log("incomeRoutes:", typeof incomeRoutes);
console.log("categoryRoutes:", typeof categoryRoutes);
console.log("chartRoutes:", typeof chartRoutes);
console.log("dashboardRoutes:", typeof dashboardRoutes);
// ==========================
// ROUTES REGISTER (CLEAN VERSION)
// ==========================

// API base
app.use('/api', apiRouter);

// AUTH
app.use('/api/auth', authRoutes);

// TRANSACTIONS
app.use('/api/transactions', transactionRoutes);

// EXPENSES
app.use('/api/expenses', expenseRoutes);

// ADMIN USER
app.use('/api/manajemen-users', manajemenUserRoutes);

// BUDGET
app.use('/api/budgets', budgetRoutes);

// HISTORY
app.use('/api/history', historyRoutes);

// SAVING GOALS
app.use('/api/saving-goals', savingGoalRoutes);

// INCOME
app.use('/api/income', incomeRoutes);

// CATEGORY
app.use('/api/categories', categoryRoutes);

// CHARTS
app.use('/api/charts', chartRoutes);

app.use('/api/dashboard', dashboardRoutes);

app.get("/", (req, res) => {
    res.send("🚀 CuppyCash Backend API Running Successfully!");
});

// ==========================
// TEST DB
// ==========================
app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS solution", (err, result) => {
        if (err) {
            res.status(500).json({
                message: "Koneksi database gagal ❌",
                error: err
            });
        } else {
            res.json({
                message: "Koneksi database berhasil 100%! ✅",
                result
            });
        }
    });
});

// ==========================
// ERROR HANDLER
// ==========================
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);

// ==========================
// START SERVER
// ==========================
app.listen(port, () => {
    console.log(`CuppyCash Server jalan di http://localhost:${port}`);
});
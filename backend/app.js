const express = require('express');
const cors = require('cors'); 
const path = require('path');

const app = express();
const port = 5000; 

// ==============================
// DATABASE
// ==============================
const db = require('./config/database'); 

// ==========================
// MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
// ==========================
// ROUTES IMPORT
// ==========================
const apiRouter = require('./routes/apiRoutes');
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
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
console.log("transactionRoutes:", typeof transactionRoutes);
console.log("userRoutes:", typeof userRoutes);
console.log("expenseRoutes:", typeof expenseRoutes);
console.log("manajemenUserRoutes:", typeof manajemenUserRoutes);
console.log("budgetRoutes:", typeof budgetRoutes);
console.log("historyRoutes:", typeof historyRoutes);
console.log("savingGoalRoutes:", typeof savingGoalRoutes);
console.log("incomeRoutes:", typeof incomeRoutes);
console.log("categoryRoutes:", typeof categoryRoutes);
console.log("chartRoutes:", typeof chartRoutes);

// ==========================
// ROUTES REGISTER (CLEAN VERSION)
// ==========================

// API base
app.use('/api', apiRouter);

// USERS
app.use('/api/users', userRoutes);

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

// DASHBOARD
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
// ERROR HANDLER (Gunakan jika file errorHandler.js memang ada)
// ==========================
try {
    const errorHandler = require('./utils/errorHandler');
    app.use(errorHandler);
} catch (e) {
    console.log("Info: utils/errorHandler.js tidak ditemukan, menggunakan default express handler.");
}

// ==========================
// START SERVER
// ==========================
app.listen(port, () => {
    console.log(`CuppyCash Server jalan di http://localhost:${port}`);
});

module.exports = app;
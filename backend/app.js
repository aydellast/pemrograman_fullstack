const express = require("express");
const app = express();
const port = 3000;


// 1. MIDDLEWARE WAJIB
app.use(express.json()); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // <-- Ini udah bener banget buat Multer!


// 2. IMPORT KONEKSI DATABASE
const db = require('./config/database'); 

// 3. IMPORT SEMUA ROUTES
const apiRouter = require('./routes/apiRoutes'); 

// ==========================
// DATABASE
// ==========================
const db = require('./config/database');

// ==========================
// ROUTES
// ==========================
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const expenseRoutes = require('./routes/expensesRoutes');
const manajemenUserRoutes = require('./routes/manajemenUserRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const expenseRoutes = require('./routes/expensesRoutes'); 
const historyRoutes = require('./routes/historyRoutes');
const savingGoalRoutes = require('./routes/savingGoalRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const chartRoutes = require('./routes/chartRoutes');

// 4. DAFTARKAN SEMUA ROUTES (Jangan ada yang dobel)
app.use('/api', apiRouter); 
app.use('/api', chartRoutes);
app.use('/transactions', transactionRoutes); 
app.use('/users', userRoutes);          
app.use('/api/users', manajemenUserRoutes);

// ==========================
// DEBUG (optional)
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
// DAFTAR ROUTES (RAPI & KONSISTEN)
// ==========================

// Auth & user umum
app.use('/api/users', userRoutes);

// transaksi
app.use('/api/transactions', transactionRoutes);

// expenses
app.use('/api/expenses', expenseRoutes);

// manajemen user (admin)
app.use('/api/manajemen-users', manajemenUserRoutes);

// budget

app.use('/api/budgets', budgetRoutes);

// history
app.use('/api/history', historyRoutes);

// saving goals
app.use('/api/saving-goals', savingGoalRoutes);

// income
app.use('/api/income', incomeRoutes);

// kategori
app.use('/api/categories', categoryRoutes);
app.use('/expenses', expenseRoutes);


// 5. TEST KONEKSI DATABASE
// chart
app.use('/api/charts', chartRoutes);

// ==========================
// TEST DB
// ==========================

app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS solution", (err, result) => {
        if (err) {
            res.status(500).json({ message: "Koneksi database gagal ❌", error: err });
        } else {
            res.json({ message: "Koneksi database berhasil 100%! ✅", result });
        }
    });
});

// 6. ERROR HANDLER (Harus paling bawah sebelum app.listen)
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);

// 7. JALANKAN SERVER
// ==========================
// ERROR HANDLER
// ==========================
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);

// ==========================
// RUN SERVER
// ==========================
app.listen(port, () => {
    console.log(`CuppyCash Server jalan di http://localhost:${port}`);
});
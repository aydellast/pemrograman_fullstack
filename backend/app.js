const express = require("express");
const app = express();
const port = 3000;

// 1. MIDDLEWARE WAJIB
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // <-- Ini udah bener banget buat Multer!

// 2. IMPORT KONEKSI DATABASE
const db = require('./config/database'); 

// 3. IMPORT SEMUA ROUTES
const apiRouter = require('./routes/apiRoutes'); 
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
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
app.use('/api/budgets', budgetRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/saving-goals', savingGoalRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/expenses', expenseRoutes);

// 5. TEST KONEKSI DATABASE
app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS solution", (err, result) => {
        if (err) {
            res.status(500).json({ message: "Koneksi database gagal ❌", error: err });
        } else {
            res.json({ message: "Koneksi database berhasil 100%! ✅", result: result });
        }
    });
});

// 6. ERROR HANDLER (Harus paling bawah sebelum app.listen)
const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);

// 7. JALANKAN SERVER
app.listen(port, () => {
    console.log(`CuppyCash Server is running on http://localhost:${port}`);
});
const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/database');

<<<<<<< HEAD
// --- MIDDLEWARE ---
// Middleware untuk membaca JSON dari body request
app.use(express.json());
// Middleware untuk membaca data dari form-data (penting untuk Sprint 7: Upload File)
=======
// 1. MIDDLEWARE WAJIB
app.use(express.json()); 
>>>>>>> 2c9597a0d2bb21ba0f63d72994ea04de6c1e20e8
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads')); // <-- Ini udah bener banget buat Multer!

<<<<<<< HEAD
// SPRINT 7: Menyediakan akses publik ke folder uploads agar bukti pengeluaran bisa diakses lewat browser
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- BAGIAN ROUTE ---
// Memanggil file Routes sesuai struktur yang kamu miliki
const apiRouter = require('./routes/apiRoutes'); 
const expenseRoutes = require('./routes/expensesRoutes'); 
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // Tambahan untuk tugas Dashboard

// --- MENDAFTARKAN ROUTE ---
app.use('/api', apiRouter);              // Untuk login/auth: http://localhost:3000/api/login
app.use('/expenses', expenseRoutes);     // CRUD Pengeluaran: http://localhost:3000/expenses
app.use('/dashboard', dashboardRoutes);   // Ringkasan: http://localhost:3000/dashboard/summary
app.use('/transactions', transactionRoutes); 
app.use('/users', userRoutes); 

// --- HALAMAN UTAMA & TESTING ---
// Halaman utama agar tidak muncul "Cannot GET /"
app.get("/", (req, res) => {
    res.send("<h1>Selamat Datang di API CuppyCash!</h1><p>Server berjalan dengan lancar.</p>");
});

// Route pengetesan database (Sprint 5: Error handling dasar)
app.get('/test-db', (req, res) => {
    db.query('SELECT 1 + 1 AS solution', (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Koneksi database berhasil 100%! ✅", result: rows });
    });
});

// --- KONFIGURASI PORT ---
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`🚀 CuppyCash Server is running on http://localhost:${PORT}`);
    console.log(`✅ Koneksi database MySQL BERHASIL!`);
=======
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
>>>>>>> 2c9597a0d2bb21ba0f63d72994ea04de6c1e20e8
});
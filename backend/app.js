const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/database');

// --- MIDDLEWARE ---
// Middleware untuk membaca JSON dari body request
app.use(express.json());
// Middleware untuk membaca data dari form-data (penting untuk Sprint 7: Upload File)
app.use(express.urlencoded({ extended: true }));

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
});
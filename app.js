const express = require("express");
const app = express();
const port = 3000;

// 1. TAMBAHKAN MIDDLEWARE INI (Wajib di bagian atas sebelum route)
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Import file koneksi database
const db = require('./config/database'); 

// Import file routes
const apiRouter = require('./routes/api'); 
const transactionRoutes = require('./routes/transactions');
const userRoutes = require('./routes/users');
const expenseRoutes = require('./routes/expenses');

// 2. DAFTARKAN ROUTE DENGAN PREFIX /api AGAR KONSISTEN
app.use('/api', apiRouter); 
app.use('/transactions', transactionRoutes); 
app.use('/users', userRoutes); 
app.use('/expenses', expenseRoutes);

// ENDPOINT KHUSUS TESTING DATABASE
app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS solution", (err, result) => {
        if (err) {
            res.json({ message: "Koneksi database gagal ❌", error: err });
        } else {
            res.json({ message: "Koneksi database berhasil 100%! ✅", result: result });
        }
    });
});

app.listen(port, () => {
    console.log(`CuppyCash Server is running on http://localhost:${port}`);
});
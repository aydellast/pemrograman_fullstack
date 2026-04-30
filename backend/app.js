const express = require("express");
const app = express();
const port = 3000;

// Middleware agar bisa membaca JSON
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Import koneksi database
const db = require('./config/database'); 

// --- BAGIAN ROUTE ---
// 1. Memanggil apiRoutes.js
const apiRouter = require('./routes/apiRoutes'); 

// 2. Memanggil transactionRoutes.js
const transactionRoutes = require('./routes/transactionRoutes');

// 3. Memanggil userRoutes.js
const userRoutes = require('./routes/userRoutes');

// 4. Memanggil expensesRoutes.js (Fitur Meisha)
const expenseRoutes = require('./routes/expensesRoutes'); 

// --- MENDAFTARKAN ROUTE ---
app.use('/api', apiRouter); 
app.use('/transactions', transactionRoutes); 
app.use('/users', userRoutes); 
app.use('/expenses', expenseRoutes);

// Endpoint testing database
app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS solution", (err, result) => {
        if (err) {
            res.status(500).json({ message: "Koneksi database gagal ❌", error: err });
        } else {
            res.json({ message: "Koneksi database berhasil 100%! ✅", result: result });
        }
    });
});

app.listen(port, () => {
    console.log(`CuppyCash Server is running on http://localhost:${port}`);
});
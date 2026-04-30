const express = require("express");
const app = express();
const port = 3000;

<<<<<<< HEAD
// Middleware agar bisa membaca JSON
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Import koneksi database
const db = require('./config/database'); 

// --- BAGIAN ROUTE ---
// 1. Memanggil apiRoutes.js
=======
// ==========================================
// JSON Parser (WAJIB)
// ==========================================
app.use(express.json());

// Import database
const db = require('./config/database'); 

// Import routes (pakai versi backend yang benar)
>>>>>>> 2242bcf8c7c87a440b14f1b1cbd8db7de020a6ff
const apiRouter = require('./routes/apiRoutes'); 

// 2. Memanggil transactionRoutes.js
const transactionRoutes = require('./routes/transactionRoutes');
<<<<<<< HEAD

// 3. Memanggil userRoutes.js
=======
>>>>>>> 2242bcf8c7c87a440b14f1b1cbd8db7de020a6ff
const userRoutes = require('./routes/userRoutes');
const manajemenUserRoutes = require('./routes/manajemenUserRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

<<<<<<< HEAD
// 4. Memanggil expensesRoutes.js (Fitur Meisha)
const expenseRoutes = require('./routes/expensesRoutes'); 

// --- MENDAFTARKAN ROUTE ---
app.use('/api', apiRouter); 
app.use('/transactions', transactionRoutes); 
app.use('/users', userRoutes); 
app.use('/expenses', expenseRoutes);

// Endpoint testing database
=======
const historyRoutes = require('./routes/historyRoutes');
const savingGoalRoutes = require('./routes/savingGoalRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


// Daftarkan routes
app.use('/', apiRouter); 
app.use('/transactions', transactionRoutes); 
app.use('/users', userRoutes);          // login & register
app.use('/api/users', manajemenUserRoutes); // profil user
app.use('/api/budgets', budgetRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/saving-goals', savingGoalRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/categories', categoryRoutes);

// ==========================================
// TEST DATABASE
// ==========================================
>>>>>>> 2242bcf8c7c87a440b14f1b1cbd8db7de020a6ff
app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS solution", (err, result) => {
        if (err) {
            res.status(500).json({ message: "Koneksi database gagal ❌", error: err });
        } else {
            res.json({ message: "Koneksi database berhasil 100%! ✅", result: result });
        }
    });
});

// ==========================================
app.listen(port, () => {
    console.log(`CuppyCash Server is running on http://localhost:${port}`);
});
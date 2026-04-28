const express = require("express");
const app = express();
const port = 3000;

// ==========================================
// JSON Parser (WAJIB)
// ==========================================
app.use(express.json());

// Import database
const db = require('./config/database'); 

// Import routes (pakai versi backend yang benar)
const apiRouter = require('./routes/apiRoutes'); 
const transactionRoutes = require('./routes/transactionRoutes');
const userRoutes = require('./routes/userRoutes');
const manajemenUserRoutes = require('./routes/manajemenUserRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

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
app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS solution", (err, result) => {
        if (err) {
            res.json({ 
                message: "Koneksi database gagal ❌", 
                error: err 
            });
        } else {
            res.json({ 
                message: "Koneksi database berhasil 100%! ✅", 
                result: result 
            });
        }
    });
});

// ==========================================
app.listen(port, () => {
    console.log(`CuppyCash Server is running on http://localhost:${port}`);
});
const express = require('express');
const path = require('path');

const app = express();

// ==============================
// DATABASE
// ==============================

const db = require('./config/database');


// ==============================
// ROUTES
// ==============================

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


// ==============================
// MIDDLEWARE
// ==============================

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

// akses folder uploads
app.use(
    '/uploads',
    express.static(path.join(__dirname, 'uploads'))
);


// ==============================
// MAIN ROUTES
// ==============================

// auth + dashboard + expense API utama
app.use('/api', apiRouter);

// chart routes
app.use('/api/charts', chartRoutes);

// transaction
app.use('/transactions', transactionRoutes);

// user
app.use('/users', userRoutes);

// management user
app.use('/api/users', manajemenUserRoutes);

// budgets
app.use('/api/budgets', budgetRoutes);

// history
app.use('/api/history', historyRoutes);

// saving goals
app.use('/api/saving-goals', savingGoalRoutes);

// income
app.use('/api/income', incomeRoutes);

// categories
app.use('/api/categories', categoryRoutes);

// expenses
app.use('/expenses', expenseRoutes);


// ==============================
// ROOT
// ==============================

app.get('/', (req, res) => {
    res.send(`
        <h1>🚀 Selamat Datang di API CuppyCash!</h1>
        <p>Server berjalan dengan lancar.</p>
    `);
});


// ==============================
// TEST DATABASE
// ==============================

app.get('/test-db', (req, res) => {

    db.query(
        'SELECT 1 + 1 AS solution',
        (err, rows) => {

            if (err) {
                return res.status(500).json({
                    message: "Koneksi database gagal ❌",
                    error: err.message
                });
            }

            res.json({
                message: "Koneksi database berhasil 100%! ✅",
                result: rows
            });
        }
    );
});


// ==============================
// ERROR HANDLER
// ==============================

const errorHandler = require('./utils/errorHandler');

app.use(errorHandler);


// ==============================
// SERVER
// ==============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`
🚀 CuppyCash Server running on:
http://localhost:${PORT}
    `);

    console.log('✅ MySQL Connected');
});
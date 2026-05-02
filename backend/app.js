const express = require("express");
const app = express();
const port = 3000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

// Import koneksi database
const db = require('./config/database'); 

app.use(express.json());

const apiRouter = require('./routes/apiRoutes'); 

const transactionRoutes = require('./routes/transactionRoutes');

const userRoutes = require('./routes/userRoutes');
const manajemenUserRoutes = require('./routes/manajemenUserRoutes');
const budgetRoutes = require('./routes/budgetRoutes');

// 4. Memanggil expensesRoutes.js (Fitur Meisha)
const expenseRoutes = require('./routes/expensesRoutes'); 

// --- MENDAFTARKAN ROUTE ---
app.use('/api', apiRouter); 
app.use('/transactions', transactionRoutes); 
app.use('/users', userRoutes); 
app.use('/expenses', expenseRoutes);
app.use('/api/users', manajemenUserRoutes);

// Endpoint testing database
const historyRoutes = require('./routes/historyRoutes');
const savingGoalRoutes = require('./routes/savingGoalRoutes');
const incomeRoutes = require('./routes/incomeRoutes');
const categoryRoutes = require('./routes/categoryRoutes');


// Daftarkan routes
app.use('/', apiRouter); 
app.use('/transactions', transactionRoutes); 
app.use('/users', userRoutes);          
app.use('/api/users', manajemenUserRoutes);
app.use('/api/budgets', budgetRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/saving-goals', savingGoalRoutes);
app.use('/api/income', incomeRoutes);
app.use('/api/categories', categoryRoutes);


app.get("/test-db", (req, res) => {
    db.query("SELECT 1 + 1 AS solution", (err, result) => {
        if (err) {
            res.status(500).json({ message: "Koneksi database gagal ❌", error: err });
        } else {
            res.json({ message: "Koneksi database berhasil 100%! ✅", result: result });
        }
    });
});

const errorHandler = require('./utils/errorHandler');
app.use(errorHandler);

const chartRoutes = require('./routes/chartRoutes');
app.use('/api', chartRoutes);

app.listen(port, () => {
    console.log(`CuppyCash Server is running on http://localhost:${port}`);
});
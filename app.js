const express = require("express");
const app = express();
const port = 3000;

// Import file koneksi database (Tambahan Sprint 4)
const db = require('./config/database'); 

// Import file routes yang sudah kita buat
const apiRouter = require('./routes/api'); 
const transactionRoutes = require('./routes/transactions');
const userRoutes = require('./routes/users');

// Daftarkan rutenya di sini
app.use('/', apiRouter); 
app.use('/transactions', transactionRoutes); 
app.use('/users', userRoutes); 

// ==========================================
// ENDPOINT KHUSUS TESTING DATABASE (Tugas Sprint 4)
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
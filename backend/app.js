const express = require("express");
const app = express();
const port = 3000;
const cors = require("cors");

// ==========================
// MIDDLEWARE
// ==========================
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ==========================
// DATABASE
// ==========================

const db = require("./config/database");

// ==========================
// ROUTES IMPORT
// ==========================

const authRoutes = require("./routes/authRoutes");

const transactionRoutes = require("./routes/transactionRoutes");

const expenseRoutes = require("./routes/expensesRoutes");

const manajemenUserRoutes = require("./routes/manajemenUserRoutes");

const budgetRoutes = require("./routes/budgetRoutes");

const historyRoutes = require("./routes/historyRoutes");

const savingGoalRoutes = require("./routes/savingGoalRoutes");

const incomeRoutes = require("./routes/incomeRoutes");

const categoryRoutes = require("./routes/categoryRoutes");

const chartRoutes = require("./routes/chartRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

// ==========================
// ROUTES REGISTER
// ==========================

app.use("/api/auth", authRoutes);

app.use("/api/transactions", transactionRoutes);

app.use("/api/expenses", expenseRoutes);

app.use("/api/manajemen-users", manajemenUserRoutes);

app.use("/api/budgets", budgetRoutes);

app.use("/api/history", historyRoutes);

app.use("/api/saving-goals", savingGoalRoutes);

app.use("/api/income", incomeRoutes);

app.use("/api/categories", categoryRoutes);

app.use("/api/charts", chartRoutes);

app.use("/api/dashboard", dashboardRoutes);

// ==========================
// HOME
// ==========================

app.get("/", (req, res) => {

  res.send("🚀 CuppyCash Backend API Running Successfully!");

});

// ==========================
// TEST DATABASE
// ==========================

app.get("/test-db", (req, res) => {

  db.query(

    "SELECT 1+1 AS solution",

    (err, result) => {

      if (err) {

        return res.status(500).json({

          message: "Koneksi database gagal ❌",

          error: err.message

        });

      }

      res.json({

        message: "Koneksi database berhasil 100%! ✅",

        result

      });

    }

  );

});

// ==========================
// ERROR HANDLER
// ==========================

const errorHandler = require("./utils/errorHandler");

app.use(errorHandler);

// ==========================
// START SERVER
// ==========================

app.listen(port, () => {

  console.log(

    `🚀 CuppyCash Server jalan di http://localhost:${port}`

  );

});
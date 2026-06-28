import { Routes, Route } from "react-router-dom";
import Layout from "./Layout/Layout"; // Pastikan path ke Layout.jsx kamu sudah benar

// Import Halaman-Halaman
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Expenses from "./pages/Expenses/Expenses"; 
import Category from "./pages/Category/Category";
import Income from "./pages/Income/Income";
import Profile from "./pages/Profile/Profile";
import Budget from "./pages/Budget/Budget";
import TransactionHistory from "./pages/History/TransactionHistory";
import SavingGoals from "./pages/Saving/SavingGoals";

function App() {
  return (
    <Routes>
      {/* 1. Halaman yang TIDAK pakai Layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 2. Semua halaman yang PAKAI Layout utama (Dibuat Bersarang) */}
      <Route element={<Layout />}>
        {/* Semua halaman di bawah ini otomatis akan terbungkus Layout dengan aman tanpa merusak render Chart */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/categories" element={<Category />} />
        <Route path="/income" element={<Income />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/saving-goals" element={<SavingGoals />} />
      </Route>
    </Routes>
  );
}

export default App;
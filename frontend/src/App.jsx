import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./Layout/Layout";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

import Expenses from "./pages/Expenses";
import ChartsPage from "./pages/Charts/ChartsPage";

import Category from "./pages/Category/Category";
import Income from "./pages/Income/Income";

import Profile from "./pages/Profile/Profile";
import Budget from "./pages/Budget/Budget";

import TransactionHistory from "./pages/History/TransactionHistory";
import SavingGoals from "./pages/Saving/SavingGoals";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          <Route path="/login" element={<Login />} />

          <Route path="/register" element={<Register />} />

          <Route path="/expenses" element={<Expenses />} />

          <Route path="/charts" element={<ChartsPage />} />

          <Route path="/categories" element={<Category />} />

          <Route path="/income" element={<Income />} />

          <Route path="/profile" element={<Profile />} />

          <Route path="/budget" element={<Budget />} />

          <Route path="/history" element={<TransactionHistory />} />

          <Route path="/saving-goals" element={<SavingGoals />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

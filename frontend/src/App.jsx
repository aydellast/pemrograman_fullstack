import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

import Expenses from "./pages/Expenses";
import ChartsPage from "./pages/Charts/ChartsPage";

import Category from "./pages/Category/Category";
import Income from "./pages/Income/Income";

import Profile from "./pages/Profile/Profile";
import Budget from "./pages/Budget/Budget";

function App() {
  return (
    <BrowserRouter>
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

      </Routes>
    </BrowserRouter>
  );
}

export default App;
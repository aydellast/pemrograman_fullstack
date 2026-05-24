import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

import Expenses from "./pages/Expenses";
import Category from "./pages/Category/Category";
import Income from "./pages/Income/Income";

import Profile from "./pages/Profile/Profile";
import Budget from "./pages/Budget/Budget";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* DASHBOARD */}
        <Route
          path="/"
          element={<Dashboard />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* EXPENSES */}
        <Route
          path="/expenses"
          element={<Expenses />}
        />

        {/* CATEGORY */}
        <Route
          path="/categories"
          element={<Category />}
        />

        {/* INCOME */}
        <Route
          path="/income"
          element={<Income />}
        />

        {/* PROFILE */}
        <Route
          path="/profile"
          element={<Profile />}
        />

        {/* BUDGET */}
        <Route
          path="/budget"
          element={<Budget />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;
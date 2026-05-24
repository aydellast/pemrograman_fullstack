import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
<<<<<<< HEAD
<<<<<<< HEAD
import Profile from "./pages/Profile/Profile";
import Budget from "./pages/Budget/Budget";
import TransactionHistory from "./pages/History/TransactionHistory";
import SavingGoals from "./pages/Saving/SavingGoals";
=======
<<<<<<< HEAD
import Expenses from './pages/Expenses';
=======
import Category from "./pages/Category/Category";
import Income from "./pages/Income/Income";
>>>>>>> 88fd08a (Selesai sprint 9)
>>>>>>> 1628fc4 (Selesai sprint 9)
=======

import Expenses from "./pages/Expenses";
import Category from "./pages/Category/Category";
import Income from "./pages/Income/Income";

import Profile from "./pages/Profile/Profile";
import Budget from "./pages/Budget/Budget";
>>>>>>> 1e4bdb4 (Up)

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

<<<<<<< HEAD
        <Route path="/register" element={<Register />} />
<<<<<<< HEAD
        <Route path="/profile" element={<Profile />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/saving-goals" element={<SavingGoals />} />
=======
<<<<<<< HEAD
        <Route path="/expenses" element={<Expenses />} />
=======
=======
        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />
>>>>>>> 1e4bdb4 (Up)

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

<<<<<<< HEAD
>>>>>>> 88fd08a (Selesai sprint 9)
>>>>>>> 1628fc4 (Selesai sprint 9)
=======
>>>>>>> 1e4bdb4 (Up)
      </Routes>

    </BrowserRouter>
  );
}

export default App;
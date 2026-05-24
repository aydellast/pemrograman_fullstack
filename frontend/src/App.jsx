import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />

        <Route path="/login" element={<Login />} />

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

        <Route path="/categories" element={<Category />} />

        <Route path="/income" element={<Income />} />

>>>>>>> 88fd08a (Selesai sprint 9)
>>>>>>> 1628fc4 (Selesai sprint 9)
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Profile from "./pages/Profile/Profile";
import Budget from "./pages/Budget/Budget";
import TransactionHistory from "./pages/History/TransactionHistory";
import SavingGoals from "./pages/Saving/SavingGoals";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/budget" element={<Budget />} />
        <Route path="/transactions" element={<TransactionHistory />} />
        <Route path="/saving-goals" element={<SavingGoals />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
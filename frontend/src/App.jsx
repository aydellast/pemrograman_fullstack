import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Expenses from './pages/Expenses';
import ChartsPage from "./pages/Charts/ChartsPage";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/expenses" element={<Expenses />} />
        <Route path="/charts" element={<ChartsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
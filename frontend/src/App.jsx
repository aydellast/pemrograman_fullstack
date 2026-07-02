import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Layout from "./Layout/Layout";

import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Dashboard from "./pages/Dashboard/Dashboard";

import Expenses from "./pages/Expenses/Expenses";
import ChartsPage from "./pages/Charts/ChartsPage";

import Category from "./pages/Category/Category";
import Income from "./pages/Income/Income";

import Profile from "./pages/Profile/Profile";
import Budget from "./pages/Budget/Budget";

import TransactionHistory from "./pages/History/TransactionHistory";
import SavingGoals from "./pages/Saving/SavingGoals";

import AdminRoute from "./components/AdminRoute";
import AdminUsers from "./pages/AdminUsers/AdminUsers";

import LandingPage from "./pages/LandingPage/LandingPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/income" element={<Income />} />

      <Route path="/expenses" element={<Expenses />} />

      <Route path="/charts" element={<ChartsPage />} />

      <Route path="/categories" element={<Category />} />

      <Route path="/budget" element={<Budget />} />

      <Route path="/history" element={<TransactionHistory />} />

      <Route path="/saving-goals" element={<SavingGoals />} />

      <Route path="/profile" element={<Profile />} />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <AdminUsers />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

function AppContent() {
  const location = useLocation();

  const hideLayoutPaths = ["/", "/login", "/register"];

  const shouldHideLayout = hideLayoutPaths.includes(location.pathname);

  if (shouldHideLayout) {
    return <AppRoutes />;
  }

  return (
    <Layout>
      <AppRoutes />
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
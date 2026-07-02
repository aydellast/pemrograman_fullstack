import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const getRoleFromToken = () => {
    try {
      const savedToken = localStorage.getItem("token");

      if (!savedToken) return null;

      const payload = JSON.parse(atob(savedToken.split(".")[1]));

      return payload.role || null;
    } catch (error) {
      return null;
    }
  };

  const role = localStorage.getItem("role") || getRoleFromToken();

  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");

    navigate("/login");
    window.location.reload();
  };

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  const menuItems = [
    { to: "/dashboard", label: "Dashboard", icon: "D" },
    { to: "/income", label: "Income", icon: "I" },
    { to: "/expenses", label: "Expense", icon: "E" },
    { to: "/charts", label: "Chart", icon: "C" },
    { to: "/categories", label: "Category", icon: "K" },
    { to: "/budget", label: "Budget", icon: "B" },
    { to: "/history", label: "History", icon: "H" },
    { to: "/saving-goals", label: "Saving Goals", icon: "S" },

    ...(role === "Admin"
      ? [
          {
            to: "/admin/users",
            label: "Admin Users",
            icon: "A",
          },
        ]
      : []),

    { to: "/profile", label: "Profile", icon: "P" },
  ];

  return (
    <>
      <header className={styles.mobileHeader}>
        <button
          className={styles.mobileMenuBtn}
          onClick={() => setMobileOpen(true)}
        >
          ☰
        </button>

        <div className={styles.mobileBrand}>
          <img src="/logo-cuppycash.svg" alt="CuppyCash" />
          <span>CuppyCash</span>
        </div>
      </header>

      {mobileOpen && (
        <div
          className={styles.overlay}
          onClick={closeMobileMenu}
        />
      )}

      <aside
        className={`
          ${styles.sidebar}
          ${collapsed ? styles.collapsed : ""}
          ${mobileOpen ? styles.mobileOpen : ""}
        `}
      >
        <div className={styles.brandArea}>
          <div className={styles.logoWrap}>
            <img src="/logo-cuppycash.svg" alt="CuppyCash Logo" />
          </div>

          <div className={styles.brandText}>
            <h2>CuppyCash</h2>
            <p>Finance Tracker</p>
          </div>

          <button
            className={styles.toggleBtn}
            onClick={() => setCollapsed(!collapsed)}
            title={collapsed ? "Tampilkan menu" : "Sembunyikan menu"}
          >
            {collapsed ? "›" : "‹"}
          </button>

          <button
            className={styles.mobileCloseBtn}
            onClick={closeMobileMenu}
          >
            ×
          </button>
        </div>

        <nav className={styles.menu}>
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              title={collapsed ? item.label : ""}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `${styles.menuItem} ${isActive ? styles.active : ""}`
              }
            >
              <span className={styles.icon}>{item.icon}</span>
              <span className={styles.label}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={styles.authArea}>
          {!token ? (
            <>
              <NavLink
                to="/login"
                className={styles.authBtn}
                onClick={closeMobileMenu}
              >
                <span className={styles.icon}>L</span>
                <span className={styles.label}>Login</span>
              </NavLink>

              <NavLink
                to="/register"
                className={styles.registerBtn}
                onClick={closeMobileMenu}
              >
                <span className={styles.icon}>R</span>
                <span className={styles.label}>Register</span>
              </NavLink>
            </>
          ) : (
            <button className={styles.logoutBtn} onClick={handleLogout}>
              <span className={styles.icon}>×</span>
              <span className={styles.label}>Logout</span>
            </button>
          )}
        </div>
      </aside>
    </>
  );
}

export default Navbar;
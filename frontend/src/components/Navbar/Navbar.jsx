import { Link, useNavigate } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
    window.location.reload();
  };

  return (
    <nav className={styles.navbar}>
      <Link to="/" className={styles.logo}>
        <span className={styles.logoIcon}>💗</span>
        CuppyCash
      </Link>

      <ul className={styles.navLinks}>
        <li>
          <Link to="/">Dashboard</Link>
        </li>
        <li>
          <Link to="/income">Income</Link>
        </li>
        <li>
          <Link to="/expenses">Expense</Link>
        </li>
        <li>
          <Link to="/charts">Chart</Link>
        </li>
        <li>
          <Link to="/categories">Category</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/budget">Budget</Link>
        </li>

        {!token ? (
          <>
            <li>
              <Link className={styles.authLink} to="/login">
                Login
              </Link>
            </li>
            <li>
              <Link className={styles.registerLink} to="/register">
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button className={styles.logoutBtn} onClick={handleLogout}>
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
import styles from "./Navbar.module.css";

import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h2>CuppyCash</h2>

      <ul className={styles["nav-links"]}>
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

        <li>
          <Link to="/history">History</Link>
        </li>

        <li>
          <Link to="/saving-goals">Saving Goals</Link>
        </li>

        <li>
          <Link to="/login">Login</Link>
        </li>

        <li>
          <Link to="/register">Register</Link>
        </li>

        <li>
          <button
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/login";
            }}
            className={styles.logoutBtn}
          >
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

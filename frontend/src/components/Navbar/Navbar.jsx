<<<<<<< HEAD
import styles from "./Navbar.module.css";
=======
import "./Navbar.css";
import { Link } from "react-router-dom";
>>>>>>> 88fd08a (Selesai sprint 9)

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h2>CuppyCash</h2>

<<<<<<< HEAD
      <ul className={styles["nav-links"]}>
        <li>Dashboard</li>
        <li>Income</li>
        <li>Expense</li>
        <li>Profile</li>
=======
      <ul className="nav-links">

        <li>
          <Link to="/">Dashboard</Link>
        </li>

        <li>
          <Link to="/income">Income</Link>
        </li>

        <li>
          <Link to="/categories">Category</Link>
        </li>

        <li>
          <Link to="/profile">Profile</Link>
        </li>

>>>>>>> 88fd08a (Selesai sprint 9)
      </ul>
    </nav>
  );
}

export default Navbar;
import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <h2>CuppyCash</h2>

      <ul className={styles["nav-links"]}>
        <li>Dashboard</li>
        <li>Income</li>
        <li>Expense</li>
        <li>Profile</li>
      </ul>
    </nav>
  );
}

export default Navbar;
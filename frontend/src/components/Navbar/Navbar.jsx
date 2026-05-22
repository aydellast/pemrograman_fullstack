import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2>CuppyCash</h2>

      <ul className="nav-links">
        <li>Dashboard</li>
        <li>Income</li>
        <li>Expense</li>
        <li>Profile</li>
      </ul>
    </nav>
  );
}

export default Navbar;
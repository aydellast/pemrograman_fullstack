import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import styles from "./Register.module.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        name,
        email,
        password,
      });

      alert("Register berhasil! Silakan login.");

      setName("");
      setEmail("");
      setPassword("");

      window.location.href = "/login";
    } catch (error) {
      alert(error.response?.data?.message || "Register gagal");
    }
  };

  return (
    <section className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.brandCircle}>🌸</div>

        <h1>Create Account</h1>
        <p>Buat akun baru untuk mulai mengatur keuangan</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className="soft-input"
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="soft-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="soft-input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary-button" type="submit">
            Register
          </button>
        </form>

        <span className={styles.bottomText}>
          Sudah punya akun? <Link to="/login">Login</Link>
        </span>
      </div>
    </section>
  );
}

export default Register;
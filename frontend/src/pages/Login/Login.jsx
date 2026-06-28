import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem(
        "username",
        response.data.user?.username || email
      );

      alert("Login berhasil!");
      window.location.href = "/";
    } catch (error) {
      alert(error.response?.data?.message || "Login gagal");
    }
  };

  return (
    <section className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.brandCircle}>💗</div>

        <h1>Welcome Back</h1>
        <p>Masuk ke akun CuppyCash kamu</p>

        <form onSubmit={handleSubmit} className={styles.form}>
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
            Login
          </button>
        </form>

        <span className={styles.bottomText}>
          Belum punya akun? <Link to="/register">Register</Link>
        </span>
      </div>
    </section>
  );
}

export default Login;
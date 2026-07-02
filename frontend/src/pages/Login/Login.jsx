import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import styles from "./Login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (!email.trim() || !password) {
      setMessage("Email dan password wajib diisi.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const token = response.data?.token;
      const user = response.data?.user;

      if (!token || !user) {
        setMessage("Response login tidak valid dari server.");
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username || email);
      localStorage.setItem("role", user.role || "User");

      alert("Login berhasil!");

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      setMessage(
        error.response?.data?.message || "Login gagal."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.brandCircle}>💗</div>

        <h1>Welcome Back</h1>

        <p>Masuk ke akun CuppyCash kamu</p>

        {message && (
          <div className={styles.errorBox}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            className="soft-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className={styles.passwordWrapper}>
            <input
              className="soft-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="button"
              className={styles.showButton}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Login"}
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
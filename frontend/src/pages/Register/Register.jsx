import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import styles from "./Register.module.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [serverErrors, setServerErrors] = useState([]);

  const passwordRules = useMemo(
    () => [
      {
        label: "Minimal 8 karakter",
        valid: password.length >= 8,
      },
      {
        label: "Memiliki huruf besar",
        valid: /[A-Z]/.test(password),
      },
      {
        label: "Memiliki huruf kecil",
        valid: /[a-z]/.test(password),
      },
      {
        label: "Memiliki angka",
        valid: /[0-9]/.test(password),
      },
      {
        label: "Memiliki simbol",
        valid: /[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]/.test(password),
      },
      {
        label: "Tidak mengandung spasi",
        valid: password.length > 0 && !/\s/.test(password),
      },
    ],
    [password]
  );

  const isPasswordStrong = passwordRules.every((rule) => rule.valid);

  const isPasswordMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setServerErrors([]);

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      setMessage("Semua field wajib diisi.");
      return;
    }

    if (!isPasswordStrong) {
      setMessage("Password belum memenuhi semua syarat keamanan.");
      return;
    }

    if (!isPasswordMatch) {
      setMessage("Konfirmasi password belum sama.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
      });

      alert("Register berhasil! Silakan login.");

      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");

      window.location.href = "/login";
    } catch (error) {
      const responseMessage =
        error.response?.data?.message || "Register gagal.";

      setMessage(responseMessage);
      setServerErrors(error.response?.data?.errors || []);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.authPage}>
      <div className={styles.authCard}>
        <div className={styles.brandCircle}>🌸</div>

        <h1>Create Account</h1>
        <p>Buat akun baru untuk mulai mengatur keuangan</p>

        {message && (
          <div className={styles.errorBox}>
            {message}
          </div>
        )}

        {serverErrors.length > 0 && (
          <ul className={styles.serverErrorList}>
            {serverErrors.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        )}

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

          <div className={styles.passwordWrapper}>
            <input
              className="soft-input"
              type={showPassword ? "text" : "password"}
              placeholder="Password kuat"
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

          <div className={styles.passwordRules}>
            {passwordRules.map((rule) => (
              <div
                key={rule.label}
                className={
                  rule.valid ? styles.ruleOk : styles.ruleBad
                }
              >
                <span>{rule.valid ? "✓" : "•"}</span>
                {rule.label}
              </div>
            ))}
          </div>

          <input
            className="soft-input"
            type={showPassword ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          {confirmPassword && (
            <div
              className={
                isPasswordMatch ? styles.matchOk : styles.matchBad
              }
            >
              {isPasswordMatch
                ? "Password sudah sama."
                : "Password belum sama."}
            </div>
          )}

          <button
            className="primary-button"
            type="submit"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Register"}
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
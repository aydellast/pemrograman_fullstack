import { useState } from "react";
import api from "../../services/api";
import styles from "./Register.module.css";

function Register() {
  // Samakan nama variabel state dan fungsi pengubahnya agar rapi
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/users/register", {
        username, // Ini sudah benar mengirim label 'username' sesuai kemauan backend
        email,
        password,
      });

      alert("Register berhasil!");
      console.log(response.data);

      // Reset form menggunakan fungsi set yang benar
      setUsername("");
      setEmail("");
      setPassword("");

    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Register gagal"
      );
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={username} // <-- Diubah menjadi username agar sinkron dengan state di atas
          onChange={(e) => setUsername(e.target.value)} // <-- Menggunakan setUsername
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
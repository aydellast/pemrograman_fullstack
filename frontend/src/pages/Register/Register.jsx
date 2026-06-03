import { useState } from "react";
import api from "../../services/api";
import styles from "./Register.module.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/register", {
        name,
        email,
        password,
      });

      alert("Register berhasil!");
      console.log(response.data);

      setName("");
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
      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >
        <h2>Register</h2>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
import styles from "./Register.module.css";

function Register() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2>Register</h2>

        <input type="text" placeholder="Full Name" />

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
import styles from "./Login.module.css";

function Login() {
  return (
    <div className={styles.container}>
      <form className={styles.form}>
        <h2>Login</h2>

        <input type="email" placeholder="Email" />

        <input type="password" placeholder="Password" />

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
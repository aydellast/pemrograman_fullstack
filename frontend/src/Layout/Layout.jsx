import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import styles from "./Layout.module.css";

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <Navbar />

      <div className={styles.content}>
        <main className={styles.main}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
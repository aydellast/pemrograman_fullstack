import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div style={{ padding: "30px" }}>
        <h1>Dashboard</h1>
        <p>Welcome to CuppyCash</p>
      </div>

      <Footer />
    </>
  );
}

export default Dashboard;
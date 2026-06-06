import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Chart from "../../components/Chart/Chart";

function Dashboard() {
  return (
    <>
      <Navbar />

      <div
        style={{
          padding: "40px",
          background: "#0f172a",
          minHeight: "100vh",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "64px",
            marginBottom: "10px",
            textAlign: "center",
          }}
        >
          Dashboard
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "#94a3b8",
            marginBottom: "40px",
          }}
        >
          Welcome to CuppyCash
        </p>

        {/* CHART CARD */}
        <div
          style={{
            background: "#1e293b",
            padding: "30px",
            borderRadius: "20px",
            boxShadow: "0 0 20px rgba(79,70,229,0.3)",
          }}
        >
          <Chart />
        </div>
      </div>

      <Footer />
    </>
  );
}

const cardStyle = {
  flex: "1",
  minWidth: "250px",
  background: "#1e293b",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 0 15px rgba(79,70,229,0.2)",
};

export default Dashboard;
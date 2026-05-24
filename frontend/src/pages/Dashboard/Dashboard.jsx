import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Chart from "../../components/Chart/Chart";

const currentExpenses = [
  {
    id: 1,
    title: "Beli Bahan Dimsum",
    amount: 150000,
    category: "Operasional",
    date: "2026-05-20",
  },
  {
    id: 2,
    title: "Gas Elpiji 3kg",
    amount: 22000,
    category: "Dapur",
    date: "2026-05-22",
  },
];

function Dashboard() {
  const totalExpenses = currentExpenses.reduce(
    (sum, item) => sum + item.amount,
    0
  );

  const operasionalTotal = currentExpenses
    .filter((item) => item.category === "Operasional")
    .reduce((sum, item) => sum + item.amount, 0);

  const dapurTotal = currentExpenses
    .filter((item) => item.category === "Dapur")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <>
      <Navbar />

      <main
        style={{
          padding: "40px",
          background: "#0f172a",
          minHeight: "100vh",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "30px",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <div>
              <h1 style={{ fontSize: "48px", margin: 0 }}>Dashboard</h1>
              <p style={{ marginTop: "8px", color: "#94a3b8" }}>
                Welcome to CuppyCash
              </p>
            </div>

            <Link
              to="/expenses"
              style={{
                padding: "12px 18px",
                background: "#22c55e",
                color: "#fff",
                textDecoration: "none",
                borderRadius: "10px",
                fontWeight: "bold",
              }}
            >
              💸 Kelola Pengeluaran
            </Link>
          </div>

          <div
            style={{
              display: "grid",
              gap: "20px",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              marginBottom: "30px",
            }}
          >
            <div style={cardStyle}>
              <h4>Total Pengeluaran Bulan Ini</h4>
              <h2>Rp {totalExpenses.toLocaleString("id-ID")}</h2>
            </div>

            <div style={cardStyle}>
              <h4>Biaya Operasional</h4>
              <h2>Rp {operasionalTotal.toLocaleString("id-ID")}</h2>
            </div>

            <div style={cardStyle}>
              <h4>Biaya Keperluan Dapur</h4>
              <h2>Rp {dapurTotal.toLocaleString("id-ID")}</h2>
            </div>
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "30px",
              borderRadius: "20px",
              boxShadow: "0 0 20px rgba(79,70,229,0.3)",
              marginBottom: "30px",
            }}
          >
            <Chart />
          </div>

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "20px",
            }}
          >
            <h3 style={{ marginBottom: "15px" }}>
              🔄 Aktivitas Transaksi Terakhir
            </h3>

            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ borderBottom: "1px solid #334155" }}>
                  <th style={thStyle}>Tanggal</th>
                  <th style={thStyle}>Deskripsi</th>
                  <th style={thStyle}>Kategori</th>
                  <th style={{ ...thStyle, textAlign: "right" }}>Nominal</th>
                </tr>
              </thead>

              <tbody>
                {currentExpenses.map((item) => (
                  <tr key={item.id} style={{ borderBottom: "1px solid #334155" }}>
                    <td style={tdStyle}>{item.date}</td>
                    <td style={tdStyle}>{item.title}</td>
                    <td style={tdStyle}>
                      <span
                        style={{
                          background: "#334155",
                          padding: "4px 10px",
                          borderRadius: "12px",
                          fontSize: "12px",
                        }}
                      >
                        {item.category}
                      </span>
                    </td>
                    <td
                      style={{
                        ...tdStyle,
                        textAlign: "right",
                        color: "#f87171",
                        fontWeight: "bold",
                      }}
                    >
                      - Rp {item.amount.toLocaleString("id-ID")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

const cardStyle = {
  background: "#1e293b",
  padding: "24px",
  borderRadius: "20px",
  boxShadow: "0 0 15px rgba(79,70,229,0.2)",
};

const thStyle = {
  padding: "12px 8px",
  textAlign: "left",
  color: "#94a3b8",
};

const tdStyle = {
  padding: "12px 8px",
  color: "#e5e7eb",
};

export default Dashboard;
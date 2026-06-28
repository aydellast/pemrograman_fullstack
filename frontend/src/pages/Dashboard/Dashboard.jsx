import React from "react";
import { Link } from "react-router-dom";
import Chart from "../../pages/Charts/ChartsPage";

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
  const username = localStorage.getItem("username") || "User";

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
    <section className="page-shell">
      <div style={heroStyle}>
        <div>
          <p style={eyebrowStyle}>Smart Finance Tracker</p>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Welcome back, {username} 💕</p>
        </div>

        <Link to="/expenses" className="primary-button">
          💸 Kelola Pengeluaran
        </Link>
      </div>

      <div style={summaryGridStyle}>
        <div style={summaryCardStyle}>
          <span style={cardIconStyle}>🧾</span>
          <h4>Total Pengeluaran Bulan Ini</h4>
          <h2>Rp {totalExpenses.toLocaleString("id-ID")}</h2>
        </div>

        <div style={summaryCardStyle}>
          <span style={cardIconStyle}>🍳</span>
          <h4>Biaya Operasional</h4>
          <h2>Rp {operasionalTotal.toLocaleString("id-ID")}</h2>
        </div>

        <div style={summaryCardStyle}>
          <span style={cardIconStyle}>🧁</span>
          <h4>Biaya Keperluan Dapur</h4>
          <h2>Rp {dapurTotal.toLocaleString("id-ID")}</h2>
        </div>
      </div>

      <div className="page-card" style={{ marginBottom: "28px" }}>
        <Chart />
      </div>

      <div className="page-card">
        <div style={sectionHeaderStyle}>
          <div>
            <h3 style={{ margin: 0, color: "var(--deep-pink)" }}>
              Aktivitas Transaksi Terakhir
            </h3>
            <p style={{ margin: "6px 0 0", color: "var(--text-muted)" }}>
              Ringkasan pengeluaran terbaru dari CuppyCash
            </p>
          </div>
        </div>

        <table className="table-soft">
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Deskripsi</th>
              <th>Kategori</th>
              <th style={{ textAlign: "right" }}>Nominal</th>
            </tr>
          </thead>

          <tbody>
            {currentExpenses.map((item) => (
              <tr key={item.id}>
                <td>{item.date}</td>
                <td>{item.title}</td>
                <td>
                  <span style={badgeStyle}>{item.category}</span>
                </td>
                <td
                  style={{
                    textAlign: "right",
                    color: "var(--dark-pink)",
                    fontWeight: "800",
                  }}
                >
                  - Rp {item.amount.toLocaleString("id-ID")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

const heroStyle = {
  width: "min(1450px, 92%)",
  margin: "0 auto 28px",
  padding: "34px",
  borderRadius: "30px",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.92), rgba(253,226,236,0.9))",
  border: "1px solid var(--border-soft)",
  boxShadow: "var(--shadow-soft)",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  flexWrap: "wrap",
};

const eyebrowStyle = {
  margin: "0 0 10px",
  color: "var(--dark-pink)",
  fontWeight: "900",
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  fontSize: "13px",
};

const summaryGridStyle = {
  width: "min(1450px, 92%)",
  margin: "0 auto 28px",
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: "20px",
};

const summaryCardStyle = {
  background: "rgba(255,255,255,0.9)",
  border: "1px solid var(--border-soft)",
  borderRadius: "26px",
  padding: "26px",
  boxShadow: "var(--shadow-card)",
  textAlign: "center",
};

const cardIconStyle = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50px",
  height: "50px",
  borderRadius: "18px",
  background: "var(--soft-pink)",
  fontSize: "24px",
};

const sectionHeaderStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "18px",
};

const badgeStyle = {
  background: "var(--soft-pink)",
  color: "var(--dark-pink)",
  padding: "6px 12px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "800",
};

export default Dashboard;
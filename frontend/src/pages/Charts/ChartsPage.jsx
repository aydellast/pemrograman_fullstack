import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

function ChartsPage() {
  const data = [
    {
      month: "Jan",
      income: 4000000,
      expense: 2500000,
    },
    {
      month: "Feb",
      income: 5000000,
      expense: 3000000,
    },
    {
      month: "Mar",
      income: 4500000,
      expense: 3500000,
    },
    {
      month: "Apr",
      income: 6000000,
      expense: 4000000,
    },
  ];

  return (
    <section className="page-shell">
      <div style={headerStyle}>
        <p style={eyebrowStyle}>Financial Analytics</p>

        <h1 className="page-title">
          Grafik Keuangan
        </h1>

        <p className="page-subtitle">
          Visualisasi perbandingan pemasukan dan pengeluaran bulanan
          pada aplikasi CuppyCash.
        </p>
      </div>

      <div style={summaryGridStyle}>
        <div style={summaryCardStyle}>
          <span style={iconStyle}>💰</span>
          <h4>Total Pemasukan</h4>
          <h2>Rp 19.500.000</h2>
        </div>

        <div style={summaryCardStyle}>
          <span style={iconStyle}>🧾</span>
          <h4>Total Pengeluaran</h4>
          <h2>Rp 13.000.000</h2>
        </div>

        <div style={summaryCardStyle}>
          <span style={iconStyle}>🌸</span>
          <h4>Sisa Saldo</h4>
          <h2>Rp 6.500.000</h2>
        </div>
      </div>

      <div className="page-card" style={chartCardStyle}>
        <div style={{ textAlign: "center", marginBottom: "22px" }}>
          <h2
            style={{
              margin: 0,
              color: "var(--deep-pink)",
              fontSize: "30px",
            }}
          >
            Financial Overview
          </h2>

          <p
            style={{
              margin: "8px 0 0",
              color: "var(--text-muted)",
            }}
          >
            Grafik pemasukan dan pengeluaran dari Januari sampai April
          </p>
        </div>

        <div style={{ width: "100%", height: 430 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="incomeColor"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor="#f48fb1"
                    stopOpacity={0.85}
                  />

                  <stop
                    offset="95%"
                    stopColor="#f48fb1"
                    stopOpacity={0.05}
                  />
                </linearGradient>
              </defs>

              <CartesianGrid
                strokeDasharray="3 3"
                stroke="#f4c2d4"
              />

              <XAxis
                dataKey="month"
                stroke="#9f315f"
              />

              <YAxis
                stroke="#9f315f"
              />

              <Tooltip
                formatter={(value) =>
                  `Rp ${value.toLocaleString("id-ID")}`
                }
              />

              <Area
                type="monotone"
                dataKey="income"
                name="Pemasukan"
                stroke="#d96c9f"
                fillOpacity={1}
                fill="url(#incomeColor)"
              />

              <Line
                type="monotone"
                dataKey="expense"
                name="Pengeluaran"
                stroke="#9f315f"
                strokeWidth={3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}

const headerStyle = {
  width: "min(1450px, 92%)",
  margin: "0 auto 28px",
  padding: "34px",
  borderRadius: "30px",
  background:
    "linear-gradient(135deg, rgba(255,255,255,0.94), rgba(253,226,236,0.92))",
  border: "1px solid var(--border-soft)",
  boxShadow: "var(--shadow-soft)",
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

const iconStyle = {
  display: "inline-flex",
  justifyContent: "center",
  alignItems: "center",
  width: "50px",
  height: "50px",
  borderRadius: "18px",
  background: "var(--soft-pink)",
  fontSize: "24px",
};

const chartCardStyle = {
  width: "min(1450px, 92%)",
  margin: "0 auto",
};

export default ChartsPage;
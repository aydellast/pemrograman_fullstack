function TransactionHistory() {
  const transactions = [
    {
      id: 1,
      type: "Pemasukan",
      category: "Gaji",
      amount: 5000000,
    },
    {
      id: 2,
      type: "Pengeluaran",
      category: "Makanan",
      amount: 100000,
    },
    {
      id: 3,
      type: "Pengeluaran",
      category: "Transportasi",
      amount: 50000,
    },
  ];

  return (
    <section className="page-shell">
      <div style={headerStyle}>
        <p style={eyebrowStyle}>Transaction Records</p>

        <h1 className="page-title">Riwayat Transaksi</h1>

        <p className="page-subtitle">
          Menampilkan daftar pemasukan dan pengeluaran terbaru
          pada aplikasi CuppyCash.
        </p>
      </div>

      <div className="page-card" style={cardWrapperStyle}>
        {transactions.map((item) => (
          <div key={item.id} style={transactionCardStyle}>
            <div>
              <h3 style={{ margin: 0, color: "var(--deep-pink)" }}>
                {item.type}
              </h3>

              <p style={{ margin: "8px 0 0", color: "var(--text-muted)" }}>
                Kategori: {item.category}
              </p>
            </div>

            <strong
              style={{
                color:
                  item.type === "Pemasukan"
                    ? "#2f9e44"
                    : "var(--dark-pink)",
                fontSize: "20px",
              }}
            >
              Rp {item.amount.toLocaleString("id-ID")}
            </strong>
          </div>
        ))}
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

const cardWrapperStyle = {
  width: "min(1450px, 92%)",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
};

const transactionCardStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  padding: "20px",
  borderRadius: "20px",
  background: "rgba(255, 250, 253, 0.9)",
  border: "1px solid var(--border-soft)",
};

export default TransactionHistory;
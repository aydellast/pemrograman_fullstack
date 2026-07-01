function SavingGoals() {
  const target = 10000000;
  const current = 4000000;

  const progress = Math.round((current / target) * 100);

  return (
    <section className="page-shell">
      <div style={headerStyle}>
        <p style={eyebrowStyle}>Saving Progress</p>

        <h1 className="page-title">Saving Goals</h1>

        <p className="page-subtitle">
          Pantau target tabungan dan progres pencapaian keuangan.
        </p>
      </div>

      <div className="page-card" style={goalCardStyle}>
        <div style={iconStyle}>💻</div>

        <h2 style={{ color: "var(--deep-pink)", marginBottom: "8px" }}>
          Laptop Gaming
        </h2>

        <p style={{ color: "var(--text-muted)" }}>
          Target tabungan yang ingin dicapai sebelum deadline.
        </p>

        <div style={amountGridStyle}>
          <div>
            <span style={labelStyle}>Target</span>
            <h3>Rp {target.toLocaleString("id-ID")}</h3>
          </div>

          <div>
            <span style={labelStyle}>Terkumpul</span>
            <h3>Rp {current.toLocaleString("id-ID")}</h3>
          </div>
        </div>

        <div style={progressOuterStyle}>
          <div
            style={{
              ...progressInnerStyle,
              width: `${progress}%`,
            }}
          />
        </div>

        <p
          style={{
            marginTop: "14px",
            color: "var(--dark-pink)",
            fontWeight: "800",
          }}
        >
          {progress}% tercapai
        </p>
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

const goalCardStyle = {
  width: "min(800px, 92%)",
  margin: "0 auto",
  textAlign: "center",
};

const iconStyle = {
  width: "70px",
  height: "70px",
  borderRadius: "24px",
  background: "var(--soft-pink)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "34px",
  margin: "0 auto 16px",
};

const amountGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "18px",
  margin: "28px 0",
};

const labelStyle = {
  display: "block",
  color: "var(--text-muted)",
  fontWeight: "700",
  marginBottom: "6px",
};

const progressOuterStyle = {
  width: "100%",
  height: "22px",
  borderRadius: "999px",
  background: "#fde2ec",
  overflow: "hidden",
};

const progressInnerStyle = {
  height: "100%",
  borderRadius: "999px",
  background: "linear-gradient(135deg, var(--primary-pink), var(--dark-pink))",
};

export default SavingGoals;
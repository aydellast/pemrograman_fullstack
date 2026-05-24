function SavingGoals() {

  const target = 10000000
  const current = 4000000

  const progress = (current / target) * 100

  return (
    <div style={{ padding: "20px" }}>
      <h1>Saving Goals</h1>

      <h3>Laptop Gaming</h3>

      <p>Target: Rp {target}</p>

      <p>Terkumpul: Rp {current}</p>

      <div
        style={{
          width: "100%",
          backgroundColor: "#ddd",
          height: "20px",
          borderRadius: "10px"
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            backgroundColor: "green",
            height: "20px",
            borderRadius: "10px"
          }}
        ></div>
      </div>

      <p>{progress}% tercapai</p>

    </div>
  )
}

export default SavingGoals
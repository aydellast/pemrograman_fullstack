import { useState } from "react";

function Income() {
  const [income, setIncome] = useState([
    { id: 1, amount: 500000, description: "Gaji Bulanan" },
    { id: 2, amount: 200000, description: "Freelance" },
  ]);

  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const addIncome = () => {
    if (!amount || !description) return;

    setIncome([
      ...income,
      {
        id: Date.now(),
        amount,
        description,
      },
    ]);

    setAmount("");
    setDescription("");
  };

  return (
    <div style={styles.container}>
      <h2>💰 Income Page</h2>

      <div style={styles.form}>
        <input
          style={styles.input}
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <input
          style={styles.input}
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button style={styles.btn} onClick={addIncome}>
          Tambah
        </button>
      </div>

      <div style={styles.list}>
        {income.map((item) => (
          <div key={item.id} style={styles.card}>
            <span>Rp {item.amount}</span>
            <span>{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    maxWidth: "500px",
    margin: "auto",
    fontFamily: "Arial",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
  },
  btn: {
    padding: "10px",
    background: "blue",
    color: "white",
    border: "none",
    cursor: "pointer",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  card: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    background: "#e6f0ff",
    borderRadius: "6px",
  },
};

export default Income;
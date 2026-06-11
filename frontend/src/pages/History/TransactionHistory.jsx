import { useEffect, useState } from "react";

function TransactionHistory() {

  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/transactions")
      .then((response) => response.json())
      .then((data) => {
        setTransactions(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Riwayat Transaksi</h1>

      {transactions.map((item) => (
        <div
  key={item.id_transaction}
  style={{
    border: "1px solid #ccc",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "10px"
  }}
>
  <h3>{item.transaction_type}</h3>

  <p>Kategori: {item.category_name}</p>

  <p>Jumlah: Rp {Number(item.amount).toLocaleString("id-ID")}</p>

  <p>
    Tanggal:
    {" "}
    {new Date(item.transaction_date).toLocaleDateString("id-ID")}
  </p>
</div>
      ))}
    </div>
  );
}

export default TransactionHistory;
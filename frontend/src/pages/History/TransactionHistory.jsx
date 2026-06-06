function TransactionHistory() {

  const transactions = [
    {
      id: 1,
      type: "Pemasukan",
      category: "Gaji",
      amount: 5000000
    },
    {
      id: 2,
      type: "Pengeluaran",
      category: "Makanan",
      amount: 100000
    },
    {
      id: 3,
      type: "Pengeluaran",
      category: "Transportasi",
      amount: 50000
    }
  ]

  return (
    <div style={{ padding: "20px" }}>
      <h1>Riwayat Transaksi</h1>

      {
        transactions.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "10px"
            }}
          >
            <h3>{item.type}</h3>
            <p>Kategori: {item.category}</p>
            <p>Jumlah: Rp {item.amount}</p>
          </div>
        ))
      }

    </div>
  )
}

export default TransactionHistory
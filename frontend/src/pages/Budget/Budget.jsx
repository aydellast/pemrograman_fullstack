import "./Budget.css";

function Budget() {

  const budgets = [
    {
      id: 1,
      category: "Makanan",
      amount: 500000
    },
    {
      id: 2,
      category: "Transport",
      amount: 300000
    },
    {
      id: 3,
      category: "Hiburan",
      amount: 200000
    },
    {
      id: 4,
      category: "Belanja",
      amount: 750000
    }
  ];

  return (
    <div className="budget-page">

      <div className="budget-header">

        <h1>Budget Management</h1>

        <p>
          Kelola pengeluaran dan pemasukan dengan mudah 💸
        </p>

      </div>

      <div className="budget-grid">

        {
          budgets.map((item) => (

            <div
              key={item.id}
              className="budget-card"
            >

              <div className="budget-icon">
                💰
              </div>

              <h2>
                {item.category}
              </h2>

              <p>Total Budget</p>

              <h3>
                Rp {item.amount.toLocaleString("id-ID")}
              </h3>

              <button>
                Detail
              </button>

            </div>

          ))
        }

      </div>

    </div>
  );
}

export default Budget;
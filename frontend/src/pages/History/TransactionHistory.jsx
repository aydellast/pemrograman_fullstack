import { useEffect, useState } from "react";
import api from "../../services/api";
import "./TransactionHistory.css";

function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);

  const [summary, setSummary] = useState({
    total_income: 0,
    total_expense: 0,
    balance: 0,
    total_transaction: 0,
  });

  const [type, setType] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  const formatRupiah = (value) => {
    return `Rp ${Number(value || 0).toLocaleString("id-ID")}`;
  };

  const fetchHistory = async () => {
    try {
      setLoading(true);
      setMessage("");

      const response = await api.get("/history", {
        params: {
          type,
          start_date: startDate,
          end_date: endDate,
          search,
        },
      });

      setTransactions(response.data?.data || []);

      setSummary(
        response.data?.summary || {
          total_income: 0,
          total_expense: 0,
          balance: 0,
          total_transaction: 0,
        }
      );
    } catch (error) {
      console.error("Gagal mengambil history:", error);

      setMessage(
        error.response?.data?.message ||
          "Gagal mengambil riwayat transaksi."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetFilter = () => {
    setType("All");
    setStartDate("");
    setEndDate("");
    setSearch("");

    setTimeout(() => {
      fetchHistory();
    }, 0);
  };

  const getTransactionLabel = (transactionType) => {
    if (transactionType === "Income") return "Pemasukan";
    if (transactionType === "Expense") return "Pengeluaran";
    return transactionType || "-";
  };

  return (
    <section className="history-page">
      <div className="history-hero">
        <div>
          <p className="history-eyebrow">Transaction Records</p>

          <h1>Riwayat Transaksi</h1>

          <p>
            Lihat seluruh pemasukan dan pengeluaran berdasarkan akun yang
            sedang login.
          </p>
        </div>
      </div>

      <div className="history-summary-grid">
        <div className="history-summary-card income">
          <span>Total Income</span>
          <h2>{formatRupiah(summary.total_income)}</h2>
        </div>

        <div className="history-summary-card expense">
          <span>Total Expense</span>
          <h2>{formatRupiah(summary.total_expense)}</h2>
        </div>

        <div className="history-summary-card balance">
          <span>Balance</span>
          <h2>{formatRupiah(summary.balance)}</h2>
        </div>

        <div className="history-summary-card total">
          <span>Total Transaksi</span>
          <h2>{summary.total_transaction}</h2>
        </div>
      </div>

      <div className="history-filter-card">
        <div className="history-filter-group">
          <label>Tipe</label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="All">Semua</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
        </div>

        <div className="history-filter-group">
          <label>Dari Tanggal</label>

          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>

        <div className="history-filter-group">
          <label>Sampai Tanggal</label>

          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>

        <div className="history-filter-group search">
          <label>Cari</label>

          <input
            type="text"
            placeholder="Cari deskripsi atau kategori..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="history-filter-actions">
          <button onClick={fetchHistory} className="history-btn-primary">
            Terapkan
          </button>

          <button onClick={resetFilter} className="history-btn-secondary">
            Reset
          </button>
        </div>
      </div>

      {message && (
        <div className="history-error">
          {message}
        </div>
      )}

      <div className="history-card">
        <div className="history-section-header">
          <div>
            <h2>Daftar Riwayat</h2>
            <p>
              Menampilkan {transactions.length} transaksi berdasarkan filter.
            </p>
          </div>
        </div>

        {loading && (
          <div className="history-state">
            Memuat riwayat transaksi...
          </div>
        )}

        {!loading && transactions.length === 0 && (
          <div className="history-state">
            Belum ada transaksi yang sesuai.
          </div>
        )}

        {!loading && transactions.length > 0 && (
          <div className="history-list">
            {transactions.map((item) => {
              const isIncome = item.transaction_type === "Income";

              return (
                <div
                  className="history-item"
                  key={item.id_transaction}
                >
                  <div className="history-left">
                    <div
                      className={
                        isIncome
                          ? "history-icon income"
                          : "history-icon expense"
                      }
                    >
                      {isIncome ? "+" : "−"}
                    </div>

                    <div>
                      <h3>{getTransactionLabel(item.transaction_type)}</h3>

                      <p>
                        {item.category_name || "Tanpa Kategori"} •{" "}
                        {item.description || "Tidak ada deskripsi"}
                      </p>

                      <small>
                        {item.transaction_date
                          ? String(item.transaction_date).slice(0, 10)
                          : "-"}
                      </small>

                      {item.image_url && (
                        <a
                          href={`http://localhost:3000/uploads/${item.image_url}`}
                          target="_blank"
                          rel="noreferrer"
                          className="history-proof-link"
                        >
                          Lihat bukti
                        </a>
                      )}
                    </div>
                  </div>

                  <strong
                    className={
                      isIncome
                        ? "history-amount income"
                        : "history-amount expense"
                    }
                  >
                    {isIncome ? "+" : "-"} {formatRupiah(item.amount)}
                  </strong>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

export default TransactionHistory;
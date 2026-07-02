import { useState, useEffect } from "react";
import api from "../../services/api";
import "./Budget.css";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [activeTab, setActiveTab] = useState("input");

  const [idCategory, setIdCategory] = useState("");
  const [amount, setAmount] = useState("");

  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchBudgets();
    fetchCategories();
  }, []);

  const formatRupiah = (value) => {
    return `Rp ${Number(value || 0).toLocaleString("id-ID")}`;
  };

  const getCurrentMonthRange = () => {
    const today = new Date();

    const year = today.getFullYear();
    const monthNumber = today.getMonth() + 1;

    const month = String(monthNumber).padStart(2, "0");
    const lastDay = new Date(year, monthNumber, 0).getDate();

    const startDate = `${year}-${month}-01`;
    const endDate = `${year}-${month}-${String(lastDay).padStart(2, "0")}`;

    return {
      startDate,
      endDate,
    };
  };

  const fetchBudgets = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await api.get("/budgets");

      const result = response.data?.data || response.data || [];

      setBudgets(Array.isArray(result) ? result : []);
    } catch (err) {
      console.error("Gagal memuat budget:", err);

      setError(
        err.response?.data?.message ||
          "Gagal memuat data anggaran dari server."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await api.get("/categories");

      const result = response.data?.data || response.data || [];

      const expenseCategories = Array.isArray(result)
        ? result.filter((cat) => cat.type === "Expense")
        : [];

      setCategories(expenseCategories);
    } catch (err) {
      console.error("Gagal memuat kategori:", err);
      setCategories([]);
    }
  };

  const handleAddBudget = async (e) => {
    e.preventDefault();

    setFormError("");

    if (!idCategory || !amount) {
      setFormError("Semua field wajib diisi.");
      return;
    }

    if (Number(amount) <= 0) {
      setFormError("Nominal budget harus lebih dari 0.");
      return;
    }

    try {
      setIsSubmitting(true);

      const { startDate, endDate } = getCurrentMonthRange();

      await api.post("/budgets", {
        id_category: Number(idCategory),
        amount: Number(amount),
        start_date: startDate,
        end_date: endDate,
      });

      setIdCategory("");
      setAmount("");

      alert("Anggaran berhasil ditambahkan.");

      await fetchBudgets();

      setActiveTab("view");
    } catch (err) {
      console.error("Error submit budget:", err);

      setFormError(
        err.response?.data?.message ||
          "Gagal menambah anggaran ke server."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBudget = async (idBudget) => {
    if (!window.confirm("Yakin ingin menghapus anggaran ini?")) return;

    try {
      await api.delete(`/budgets/${idBudget}`);

      alert("Anggaran berhasil dihapus.");

      fetchBudgets();
    } catch (err) {
      console.error("Gagal hapus budget:", err);

      alert(
        err.response?.data?.message ||
          "Gagal menghapus anggaran."
      );
    }
  };

  const totalBudget = budgets.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  const totalUsed = budgets.reduce(
    (sum, item) => sum + Number(item.terpakai || 0),
    0
  );

  const totalRemaining = Math.max(totalBudget - totalUsed, 0);

  if (loading) {
    return (
      <div className="budget-page">
        <p className="budget-loading">
          Memuat data anggaran... ⏳
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="budget-page">
        <p
          style={{
            color: "#a82e66",
            textAlign: "center",
            fontWeight: "bold",
          }}
        >
          ⚠️ {error}
        </p>
      </div>
    );
  }

  return (
    <div className="budget-page">
      <div className="budget-header">
        <h1>Budget Management</h1>
        <p>Kelola batas pengeluaran bulanan berdasarkan kategori expense 💸</p>
      </div>

      <div className="budget-tabs-container">
        <button
          className={`tab-button ${activeTab === "input" ? "active" : ""}`}
          onClick={() => setActiveTab("input")}
        >
          ➕ Buat Anggaran Baru
        </button>

        <button
          className={`tab-button ${activeTab === "view" ? "active" : ""}`}
          onClick={() => setActiveTab("view")}
        >
          🗂️ Lihat Hasil & Ringkasan ({budgets.length})
        </button>
      </div>

      {activeTab === "input" && (
        <div className="budget-form-container">
          <h3>Tambah Anggaran Bulanan</h3>

          <form onSubmit={handleAddBudget}>
            <div className="form-group">
              <label>Pilih Kategori Expense:</label>

              <select
                value={idCategory}
                onChange={(e) => setIdCategory(e.target.value)}
                style={{
                  width: "100%",
                  border: "1px solid #fbcfe8",
                  borderRadius: "14px",
                  padding: "12px 15px",
                  backgroundColor: "#ffffff",
                  color: "#8a2b59",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              >
                <option value="">-- Silakan Pilih Kategori --</option>

                {categories.map((cat) => (
                  <option key={cat.id_category} value={cat.id_category}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Nominal Budget (Rp):</label>

              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Contoh: 1000000"
              />
            </div>

            {formError && (
              <p className="error-message-text">
                {formError}
              </p>
            )}

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Menyimpan... ⏳" : "Simpan Budget"}
            </button>
          </form>
        </div>
      )}

      {activeTab === "view" && (
        <>
          <div className="budget-grid">
            <div className="budget-card">
              <span className="category-badge">💰 Total Budget</span>
              <p className="total-budget-label">Seluruh Anggaran</p>
              <h3 className="budget-amount-display">
                {formatRupiah(totalBudget)}
              </h3>
            </div>

            <div className="budget-card">
              <span className="category-badge">🧾 Total Terpakai</span>
              <p className="total-budget-label">Dari Expense</p>
              <h3 className="budget-amount-display">
                {formatRupiah(totalUsed)}
              </h3>
            </div>

            <div className="budget-card">
              <span className="category-badge">✨ Total Sisa</span>
              <p className="total-budget-label">Budget Tersisa</p>
              <h3 className="budget-amount-display">
                {formatRupiah(totalRemaining)}
              </h3>
            </div>
          </div>

          <div className="budget-grid">
            {budgets.length === 0 ? (
              <div className="empty-state-box">
                <p>
                  Belum ada data anggaran yang diatur untuk user kamu di database.
                </p>

                <button
                  onClick={() => setActiveTab("input")}
                  className="btn-redirect-input"
                >
                  Mulai Tambah Sekarang
                </button>
              </div>
            ) : (
              budgets.map((item) => {
                const budgetAmount = Number(item.amount || 0);
                const usedAmount = Number(item.terpakai || 0);
                const remainingAmount = Number(item.sisa || 0);
                const progress = Number(item.progress || 0);

                return (
                  <div
                    key={item.id_budget}
                    className="budget-card"
                  >
                    <div>
                      <span className="category-badge">
                        📌 {item.kategori || "Umum"}
                      </span>

                      <p className="total-budget-label">
                        Total Anggaran
                      </p>

                      <h3 className="budget-amount-display">
                        {formatRupiah(budgetAmount)}
                      </h3>

                      <div className="budget-progress-container">
                        <div className="progress-labels">
                          <span>Penggunaan</span>
                          <span>{progress}%</span>
                        </div>

                        <div className="budget-progress-bar">
                          <div
                            className="budget-progress-fill"
                            style={{
                              width: `${Math.min(progress, 100)}%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div
                        style={{
                          marginTop: "14px",
                          color: "#8a2b59",
                          fontWeight: "700",
                          fontSize: "14px",
                          lineHeight: "1.8",
                        }}
                      >
                        <div>Terpakai: {formatRupiah(usedAmount)}</div>
                        <div>Sisa: {formatRupiah(remainingAmount)}</div>
                        <div>
                          Status:{" "}
                          <strong
                            style={{
                              color:
                                item.status === "OVER BUDGET"
                                  ? "#d64545"
                                  : "#0ca895",
                            }}
                          >
                            {item.status}
                          </strong>
                        </div>
                      </div>
                    </div>

                    <div className="action-buttons">
                      <button
                        className="btn-detail"
                        onClick={() => {
                          alert(
                            `Kategori: ${item.kategori}\nBudget: ${formatRupiah(
                              budgetAmount
                            )}\nTerpakai: ${formatRupiah(
                              usedAmount
                            )}\nSisa: ${formatRupiah(
                              remainingAmount
                            )}\nProgress: ${progress}%`
                          );
                        }}
                      >
                        Detail
                      </button>

                      <button
                        onClick={() => handleDeleteBudget(item.id_budget)}
                        className="btn-delete"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Budget;
import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Income.css";

function Income() {
  const [incomeList, setIncomeList] = useState([]);
  const [categories, setCategories] = useState([]);

  const [amount, setAmount] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [description, setDescription] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchIncome();
    fetchIncomeCategories();
  }, []);

  const fetchIncome = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await api.get("/income");
      const result = response.data?.data || response.data;

      setIncomeList(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Gagal mengambil income:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Gagal mengambil data pemasukan dari server."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchIncomeCategories = async () => {
    try {
      const response = await api.get("/categories");
      const result = response.data?.data || response.data;

      const incomeCategories = Array.isArray(result)
        ? result.filter((item) => item.type === "Income")
        : [];

      setCategories(incomeCategories);
    } catch (error) {
      console.error("Gagal mengambil kategori income:", error);
    }
  };

  const resetForm = () => {
    setAmount("");
    setIdCategory("");
    setTransactionDate("");
    setDescription("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Nominal pemasukan harus lebih dari 0.");
      return;
    }

    if (!idCategory) {
      alert("Kategori pemasukan wajib dipilih.");
      return;
    }

    try {
      const payload = {
        amount: Number(amount),
        id_category: idCategory,
        transaction_date: transactionDate || undefined,
        description,
      };

      if (editingId) {
        await api.put(`/income/${editingId}`, payload);
        alert("Income berhasil diperbarui.");
      } else {
        await api.post("/income", payload);
        alert("Income berhasil ditambahkan.");
      }

      resetForm();
      fetchIncome();
    } catch (error) {
      console.error("Gagal menyimpan income:", error);
      alert(
        error.response?.data?.message ||
          "Gagal menyimpan income."
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id_transaction);
    setAmount(item.amount);
    setIdCategory(item.id_category);
    setDescription(item.description || "");

    if (item.transaction_date) {
      setTransactionDate(String(item.transaction_date).slice(0, 10));
    } else {
      setTransactionDate("");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus data income ini?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/income/${id}`);
      alert("Income berhasil dihapus.");
      fetchIncome();
    } catch (error) {
      console.error("Gagal menghapus income:", error);
      alert(
        error.response?.data?.message ||
          "Gagal menghapus income."
      );
    }
  };

  const totalIncome = incomeList.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return (
    <section className="income-page">
      <div className="income-header">
        <div>
          <p className="income-eyebrow">Income Management</p>
          <h1>Pemasukan</h1>
          <p>
            Catat dan kelola semua pemasukan yang masuk ke akun CuppyCash.
          </p>
        </div>

        <div className="income-total-card">
          <span>Total Income</span>
          <h2>Rp {totalIncome.toLocaleString("id-ID")}</h2>
        </div>
      </div>

      <div className="income-layout">
        <div className="income-form-card">
          <h2>{editingId ? "Edit Income" : "Tambah Income"}</h2>

          <form className="income-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nominal</label>
              <input
                type="number"
                placeholder="Contoh: 5000000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Kategori</label>
              <select
                value={idCategory}
                onChange={(e) => setIdCategory(e.target.value)}
              >
                <option value="">Pilih kategori income</option>

                {categories.map((item) => (
                  <option
                    key={item.id_category}
                    value={item.id_category}
                  >
                    {item.name}
                  </option>
                ))}
              </select>

              {categories.length === 0 && (
                <small>
                  Belum ada kategori Income. Tambahkan dulu di menu Category.
                </small>
              )}
            </div>

            <div className="form-group">
              <label>Tanggal Transaksi</label>
              <input
                type="date"
                value={transactionDate}
                onChange={(e) => setTransactionDate(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Deskripsi</label>
              <textarea
                placeholder="Contoh: Gaji bulanan, freelance, bonus..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-primary">
                {editingId ? "Update" : "Tambah"}
              </button>

              {editingId && (
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={resetForm}
                >
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="income-list-card">
          <div className="list-header">
            <div>
              <h2>Daftar Income</h2>
              <p>Total {incomeList.length} data pemasukan tersimpan.</p>
            </div>
          </div>

          {loading && (
            <div className="income-state">Memuat data income...</div>
          )}

          {errorMessage && !loading && (
            <div className="income-error">{errorMessage}</div>
          )}

          {!loading && !errorMessage && incomeList.length === 0 && (
            <div className="income-state">
              Belum ada data income. Tambahkan pemasukan pertama kamu.
            </div>
          )}

          {!loading && incomeList.length > 0 && (
            <div className="income-list">
              {incomeList.map((item) => (
                <div
                  className="income-item"
                  key={item.id_transaction}
                >
                  <div className="income-info">
                    <span className="income-icon">+</span>

                    <div>
                      <h3>
                        Rp {Number(item.amount).toLocaleString("id-ID")}
                      </h3>
                      <p>
                        {item.category_name || "Tanpa Kategori"} •{" "}
                        {item.description || "Tidak ada deskripsi"}
                      </p>
                      <small>
                        {item.transaction_date
                          ? String(item.transaction_date).slice(0, 10)
                          : "-"}
                      </small>
                    </div>
                  </div>

                  <div className="income-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(item.id_transaction)
                      }
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Income;
import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Expenses.css";

function Expenses() {
  const [expenseList, setExpenseList] = useState([]);
  const [categories, setCategories] = useState([]);

  const [amount, setAmount] = useState("");
  const [idCategory, setIdCategory] = useState("");
  const [transactionDate, setTransactionDate] = useState("");
  const [description, setDescription] = useState("");
  const [proofFile, setProofFile] = useState(null);

  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchExpenses();
    fetchExpenseCategories();
  }, []);

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await api.get("/expenses");
      const result = response.data?.data || response.data;

      setExpenseList(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Gagal mengambil expenses:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Gagal mengambil data pengeluaran dari server."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchExpenseCategories = async () => {
    try {
      const response = await api.get("/categories");
      const result = response.data?.data || response.data;

      const expenseCategories = Array.isArray(result)
        ? result.filter((item) => item.type === "Expense")
        : [];

      setCategories(expenseCategories);
    } catch (error) {
      console.error("Gagal mengambil kategori expense:", error);
    }
  };

  const resetForm = () => {
    setAmount("");
    setIdCategory("");
    setTransactionDate("");
    setDescription("");
    setProofFile(null);
    setEditingId(null);

    const fileInput = document.getElementById("bukti_pengeluaran");
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!amount || Number(amount) <= 0) {
      alert("Nominal pengeluaran harus lebih dari 0.");
      return;
    }

    if (!idCategory) {
      alert("Kategori pengeluaran wajib dipilih.");
      return;
    }

    try {
      const formData = new FormData();

      formData.append("amount", amount);
      formData.append("id_category", idCategory);
      formData.append("transaction_date", transactionDate || "");
      formData.append("description", description || "");

      if (proofFile) {
        formData.append("bukti_pengeluaran", proofFile);
      }

      if (editingId) {
        await api.put(`/expenses/${editingId}`, formData);
        alert("Expense berhasil diperbarui.");
      } else {
        await api.post("/expenses", formData);
        alert("Expense berhasil ditambahkan.");
      }

      resetForm();
      fetchExpenses();
    } catch (error) {
      console.error("Gagal menyimpan expense:", error);
      alert(
        error.response?.data?.message ||
          "Gagal menyimpan expense."
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

    setProofFile(null);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus data expense ini?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/expenses/${id}`);
      alert("Expense berhasil dihapus.");
      fetchExpenses();
    } catch (error) {
      console.error("Gagal menghapus expense:", error);
      alert(
        error.response?.data?.message ||
          "Gagal menghapus expense."
      );
    }
  };

  const totalExpense = expenseList.reduce(
    (sum, item) => sum + Number(item.amount || 0),
    0
  );

  return (
    <section className="expense-page">
      <div className="expense-header">
        <div>
          <p className="expense-eyebrow">Expense Management</p>
          <h1>Pengeluaran</h1>
          <p>
            Catat dan kelola semua pengeluaran agar arus kas tetap terkontrol.
          </p>
        </div>

        <div className="expense-total-card">
          <span>Total Expense</span>
          <h2>Rp {totalExpense.toLocaleString("id-ID")}</h2>
        </div>
      </div>

      <div className="expense-layout">
        <div className="expense-form-card">
          <h2>{editingId ? "Edit Expense" : "Tambah Expense"}</h2>

          <form className="expense-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nominal</label>
              <input
                type="number"
                placeholder="Contoh: 150000"
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
                <option value="">Pilih kategori expense</option>

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
                  Belum ada kategori Expense. Tambahkan dulu di menu Category.
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
                placeholder="Contoh: Beli bahan, transportasi, listrik..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Bukti Pengeluaran</label>
              <input
                id="bukti_pengeluaran"
                type="file"
                accept="image/*"
                onChange={(e) => setProofFile(e.target.files[0])}
              />
              <small>Opsional. Maksimal mengikuti aturan upload backend.</small>
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

        <div className="expense-list-card">
          <div className="list-header">
            <div>
              <h2>Daftar Expense</h2>
              <p>Total {expenseList.length} data pengeluaran tersimpan.</p>
            </div>
          </div>

          {loading && (
            <div className="expense-state">Memuat data expense...</div>
          )}

          {errorMessage && !loading && (
            <div className="expense-error">{errorMessage}</div>
          )}

          {!loading && !errorMessage && expenseList.length === 0 && (
            <div className="expense-state">
              Belum ada data expense. Tambahkan pengeluaran pertama kamu.
            </div>
          )}

          {!loading && expenseList.length > 0 && (
            <div className="expense-list">
              {expenseList.map((item) => (
                <div
                  className="expense-item"
                  key={item.id_transaction}
                >
                  <div className="expense-info">
                    <span className="expense-icon">−</span>

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

                      {item.image_url && (
                        <a
                          href={`http://localhost:3000/uploads/${item.image_url}`}
                          target="_blank"
                          rel="noreferrer"
                          className="proof-link"
                        >
                          Lihat bukti
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="expense-actions">
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

export default Expenses;
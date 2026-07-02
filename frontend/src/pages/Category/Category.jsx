import { useEffect, useState } from "react";
import api from "../../services/api";
import "./Category.css";

function Category() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("Expense");
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setErrorMessage("");

      const response = await api.get("/categories");

      const result = response.data?.data || response.data;

      setCategories(Array.isArray(result) ? result : []);
    } catch (error) {
      console.error("Gagal mengambil kategori:", error);
      setErrorMessage(
        error.response?.data?.message ||
          "Gagal mengambil data kategori dari server."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setType("Expense");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Nama kategori wajib diisi.");
      return;
    }

    try {
      const payload = {
        name: name.trim(),
        type,
      };

      if (editingId) {
        await api.put(`/categories/${editingId}`, payload);
        alert("Kategori berhasil diperbarui.");
      } else {
        await api.post("/categories", payload);
        alert("Kategori berhasil ditambahkan.");
      }

      resetForm();
      fetchCategories();
    } catch (error) {
      console.error("Gagal menyimpan kategori:", error);
      alert(
        error.response?.data?.message ||
          "Gagal menyimpan kategori."
      );
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.id_category);
    setName(item.name);
    setType(item.type || "Expense");
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Yakin ingin menghapus kategori ini?"
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/categories/${id}`);
      alert("Kategori berhasil dihapus.");
      fetchCategories();
    } catch (error) {
      console.error("Gagal menghapus kategori:", error);
      alert(
        error.response?.data?.message ||
          "Gagal menghapus kategori. Pastikan kategori tidak sedang dipakai transaksi/budget."
      );
    }
  };

  return (
    <section className="category-page">
      <div className="category-header">
        <div>
          <p className="category-eyebrow">Transaction Category</p>
          <h1>Manajemen Kategori</h1>
          <p>
            Kelola kategori pemasukan dan pengeluaran untuk transaksi
            CuppyCash.
          </p>
        </div>
      </div>

      <div className="category-layout">
        <div className="category-form-card">
          <h2>{editingId ? "Edit Kategori" : "Tambah Kategori"}</h2>

          <form onSubmit={handleSubmit} className="category-form">
            <div className="form-group">
              <label>Nama Kategori</label>
              <input
                type="text"
                placeholder="Contoh: Makanan, Gaji, Transportasi"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Tipe Kategori</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="Expense">Expense</option>
                <option value="Income">Income</option>
              </select>
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

        <div className="category-list-card">
          <div className="list-header">
            <div>
              <h2>Daftar Kategori</h2>
              <p>Total {categories.length} kategori tersimpan.</p>
            </div>
          </div>

          {loading && (
            <div className="category-state">
              Memuat kategori...
            </div>
          )}

          {errorMessage && !loading && (
            <div className="category-error">
              {errorMessage}
            </div>
          )}

          {!loading && !errorMessage && categories.length === 0 && (
            <div className="category-state">
              Belum ada kategori. Tambahkan kategori pertama kamu.
            </div>
          )}

          {!loading && categories.length > 0 && (
            <div className="category-list">
              {categories.map((item) => (
                <div
                  className="category-item"
                  key={item.id_category}
                >
                  <div className="category-info">
                    <span
                      className={
                        item.type === "Income"
                          ? "category-icon income"
                          : "category-icon expense"
                      }
                    >
                      {item.type === "Income" ? "+" : "-"}
                    </span>

                    <div>
                      <h3>{item.name}</h3>
                      <p>{item.type}</p>
                    </div>
                  </div>

                  <div className="category-actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(item)}
                    >
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() =>
                        handleDelete(item.id_category)
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

export default Category;
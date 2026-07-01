import { useState, useEffect } from "react";
import { getBudgets } from "../../services/budgetService";
import api from "../../services/api"; 
import "./Budget.css";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [categories, setCategories] = useState([]); // State tambahan untuk menampung daftar kategori resmi
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fitur Pemisah Menu Tampilan (Sub-Tab)
  const [activeTab, setActiveTab] = useState("input"); // Pilihan: "input" atau "view"

  // State Form Input
  const [idCategory, setIdCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. Ambil data Anggaran dari Server
  const fetchBudgets = async () => {
    try {
      setLoading(true);
      const response = await getBudgets();
      if (response && Array.isArray(response.data)) {
        setBudgets(response.data);
      } else if (Array.isArray(response)) {
        setBudgets(response);
      } else {
        setBudgets([]);
      }
    } catch (err) {
      console.error(err);
      setError("Gagal memuat data anggaran dari server.");
    } finally {
      setLoading(false);
    }
  };

  // 2. Ambil data Kategori resmi dari Server (Agar form input menjadi menu Dropdown/Select)
  const fetchCategories = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.get("/categories", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (response && Array.isArray(response.data?.data)) {
        setCategories(response.data.data);
      } else if (response && Array.isArray(response.data)) {
        setCategories(response.data);
      }
    } catch (err) {
      console.error("Gagal memuat kategori untuk dropdown:", err);
    }
  };

  useEffect(() => {
    fetchBudgets();
    fetchCategories();
  }, []);

  const handleAddBudget = async (e) => {
    e.preventDefault();
    setFormError("");

    if (String(idCategory).trim() === "" || String(amount).trim() === "") {
      setFormError("⚠️ Semua field wajib diisi di form!");
      return;
    }

    try {
      setIsSubmitting(true);
      const token = localStorage.getItem("token");
      
      const hariIni = new Date();
      const tahun = hariIni.getFullYear();
      const bulan = String(hariIni.getMonth() + 1).padStart(2, '0');
      
      const tanggalMulai = `${tahun}-${bulan}-01`;
      const tanggalSelesai = `${tahun}-${bulan}-30`;

      const payloadData = { 
        id_category: Number(idCategory),
        idCategory: Number(idCategory),
        amount: Number(amount),
        start_date: tanggalMulai,
        end_date: tanggalSelesai,
        startDate: tanggalMulai,
        endDate: tanggalSelesai   
      };

      await api.post("/budgets", payloadData, { 
        headers: { Authorization: `Bearer ${token}` } 
      });

      setIdCategory("");
      setAmount("");
      alert("Anggaran berhasil ditambahkan! 🎉");
      fetchBudgets();
      setActiveTab("view"); // Otomatis pindah tab ke tampilan hasil setelah sukses input!
    } catch (err) {
      console.error("Error submit budget:", err);
      setFormError(err.response?.data?.message || "Gagal menambah anggaran ke server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteBudget = async (idBudget) => {
    if (!window.confirm("Apakah kamu yakin ingin menghapus anggaran ini?")) return;

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/budgets/${idBudget}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Anggaran berhasil dihapus! 🗑️");
      fetchBudgets();
    } catch (err) {
      console.error(err);
      alert("Gagal menghapus anggaran.");
    }
  };

  if (loading) {
    return <div className="budget-page"><p className="budget-loading">Memuat data anggaran... ⏳</p></div>;
  }

  if (error) {
    return <div className="budget-page"><p style={{ color: '#a82e66', textAlign: 'center', fontWeight: 'bold' }}>⚠️ {error}</p></div>;
  }

  return (
    <div className="budget-page">
      <div className="budget-header">
        <h1>Budget Management</h1>
        <p>Kelola pengeluaran dan pemasukan dengan mudah 💸</p>
      </div>

      {/* SUB-TAB MENU NAVIGATION */}
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

      {/* TAB 1: FORM INPUT */}
      {activeTab === "input" && (
        <div className="budget-form-container">
          <h3>Tambah Anggaran Bulanan</h3>
          <form onSubmit={handleAddBudget}>
            <div className="form-group">
              <label>Pilih Kategori:</label>
              {/* Mengubah elemen input teks biasa menjadi dropdown <select> yang otomatis memetakan ID */}
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
                  boxSizing: "border-box"
                }}
              >
                <option value="">-- Silakan Pilih Kategori --</option>
                {categories.map((cat) => (
                  <option key={cat.id_category || cat.idCategory || cat.id} value={cat.id_category || cat.idCategory || cat.id}>
                    {cat.name || cat.name_category || cat.nama_kategori || `Kategori ${cat.id}`}
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
                placeholder="Contoh: 50000"
              />
            </div>

            {formError && (
              <p className="error-message-text">
                {formError}
              </p>
            )}

            <button 
              type="submit" 
              disabled={isSubmitting} 
            >
              {isSubmitting ? "Menyimpan... ⏳" : "Simpan Budget"}
            </button>
          </form>
        </div>
      )}

      {/* TAB 2: DAFTAR HASIL INPUT */}
      {activeTab === "view" && (
        <div className="budget-grid">
          {budgets.length === 0 ? (
            <div className="empty-state-box">
              <p>Belum ada data anggaran yang diatur untuk user kamu di database.</p>
              <button onClick={() => setActiveTab("input")} className="btn-redirect-input">Mulai Tambah Sekarang</button>
            </div>
          ) : (
            budgets.map((item) => (
              <div key={item.id_budget || item.idBudget || item.id} className="budget-card">
                <div>
                  {/* PERBAIKAN UTAMA: Penanganan komprehensif pelacakan nama kategori dan ID fallback (camelCase & snake_case) */}
                  <span className="category-badge">
                    📌 {item.kategori || "Umum"}
                  </span>
                  
                  <p className="total-budget-label">Total Anggaran</p>
                  
                  <h3 className="budget-amount-display">
                    Rp {item.amount ? Number(item.amount).toLocaleString("id-ID") : "0"}
                  </h3>
                  
                  <div className="budget-progress-container">
                    <div className="progress-labels">
                      <span>Penggunaan</span>
                      <span>70%</span>
                    </div>
                    <div className="budget-progress-bar">
                      <div className="budget-progress-fill"></div>
                    </div>
                  </div>
                </div>
                
                <div className="action-buttons">
                  <button className="btn-detail">Detail</button>
                  {/* PERBAIKAN AMAN: Menjamin pengiriman ID yang valid saat menghapus data anggaran */}
                  <button onClick={() => handleDeleteBudget(item.id_budget || item.idBudget || item.id)} className="btn-delete">
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default Budget;
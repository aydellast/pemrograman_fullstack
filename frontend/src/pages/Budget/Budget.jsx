import { useState, useEffect } from "react";
import { getBudgets } from "../../services/budgetService";
import api from "../../services/api"; 
import "./Budget.css";

function Budget() {
  const [budgets, setBudgets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State Form Input
  const [idCategory, setIdCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  useEffect(() => {
    fetchBudgets();
  }, []);

  // Handler Tambah Budget
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
      
      // Membuat format tanggal otomatis untuk bulan ini (YYYY-MM-DD)
      const hariIni = new Date();
      const tahun = hariIni.getFullYear();
      const bulan = String(hariIni.getMonth() + 1).padStart(2, '0');
      
      const tanggalMulai = `${tahun}-${bulan}-01`; // Awal bulan
      const tanggalSelesai = `${tahun}-${bulan}-30`; // Akhir bulan (bisa disesuaikan)

      // Mengirim payload lengkap beserta tanggal demi memenuhi syarat backend
      const payloadData = { 
        id_category: Number(idCategory),
        idCategory: Number(idCategory), // Cadangan camelCase
        amount: Number(amount),
        start_date: tanggalMulai,
        end_date: tanggalSelesai,
        startDate: tanggalMulai, // Cadangan camelCase
        endDate: tanggalSelesai   // Cadangan camelCase
      };

      console.log("Menembak API dengan data lengkap:", payloadData);

      await api.post("/budgets", payloadData, { 
        headers: { Authorization: `Bearer ${token}` } 
      });

      setIdCategory("");
      setAmount("");
      alert("Anggaran berhasil ditambahkan! 🎉");
      fetchBudgets();
    } catch (err) {
      console.error("Error submit budget:", err);
      setFormError(err.response?.data?.message || "Gagal menambah anggaran ke server.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handler Hapus Budget
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
    return <div className="budget-page"><p>Memuat data anggaran... ⏳</p></div>;
  }

  if (error) {
    return <div className="budget-page"><p style={{ color: 'red', textAlign: 'center' }}>⚠️ {error}</p></div>;
  }

  return (
    <div className="budget-page">
      <div className="budget-header">
        <h1>Budget Management</h1>
        <p>Kelola pengeluaran dan pemasukan dengan mudah 💸</p>
      </div>

      {/* Form Tambah Budget Baru */}
      <div className="budget-form-container" style={{ maxWidth: "500px", margin: "0 auto 30px", padding: "20px", background: "#f9f9f9", borderRadius: "10px", boxShadow: "0 2px 5px rgba(0,0,0,0.05)" }}>
        <h3 style={{ textAlign: "center", marginBottom: "15px" }}>➕ Tambah Anggaran Bulanan</h3>
        <form onSubmit={handleAddBudget}>
          <div style={{ marginBottom: "12px" }}>
            <label style={{ fontWeight: "bold", display: "block" }}>ID Kategori:</label>
            <input 
              type="number" 
              value={idCategory} 
              onChange={(e) => setIdCategory(e.target.value)} 
              placeholder="Contoh: 4"
              style={{ width: "100%", padding: "10px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: "15px" }}>
            <label style={{ fontWeight: "bold", display: "block" }}>Nominal Budget (Rp):</label>
            <input 
              type="number" 
              value={amount} 
              onChange={(e) => setAmount(e.target.value)} 
              placeholder="Contoh: 50000"
              style={{ width: "100%", padding: "10px", marginTop: "5px", border: "1px solid #ccc", borderRadius: "5px", boxSizing: "border-box" }}
            />
          </div>

          {/* Munculkan pesan error jika validasi gagal */}
          {formError && (
            <p style={{ color: "red", fontSize: "14px", fontWeight: "bold", textAlign: "center", margin: "10px 0" }}>
              {formError}
            </p>
          )}

          <button 
            type="submit" 
            disabled={isSubmitting} 
            style={{ width: "100%", background: "#4e43e7", color: "white", border: "none", padding: "12px", borderRadius: "5px", fontSize: "16px", fontWeight: "bold", cursor: "pointer", opacity: isSubmitting ? 0.7 : 1 }}
          >
            {isSubmitting ? "Menyimpan... ⏳" : "Simpan Budget"}
          </button>
        </form>
      </div>

      {/* BAGIAN YANG DIGANTI: Grid List Kartu Budget Desain Baru */}
      <div className="budget-grid">
        {budgets.length === 0 ? (
          <p style={{ textAlign: "center", gridColumn: "1/-1", color: "#666" }}>
            Belum ada data anggaran yang diatur untuk user kamu di database.
          </p>
        ) : (
          budgets.map((item) => (
            <div key={item.id_budget || item.id} className="budget-card">
              <div>
                <span className="category-badge">
                  {item.category_name || item.Category?.name || item.category || `ID: ${item.id_category}`}
                </span>
                
                <p style={{ color: "#64748b", fontSize: "14px", margin: "10px 0 5px 0" }}>Total Anggaran</p>
                
                <h3 style={{ fontSize: "1.8rem", color: "#1e293b", margin: 0, fontWeight: "700" }}>
                  Rp {item.amount ? Number(item.amount).toLocaleString("id-ID") : "0"}
                </h3>
                
                {/* Visual progress bar bulanan */}
                <div className="budget-progress-container">
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#64748b", marginBottom: "4px" }}>
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
                <button onClick={() => handleDeleteBudget(item.id_budget || item.id)} className="btn-delete">
                  Hapus
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Budget;
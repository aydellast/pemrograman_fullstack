import { useState, useEffect, useRef } from "react";
import { getProfile, uploadProfilePicture } from "../../services/profileService";
import "./Profile.css";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log("Data dari backend:", data);
        
        if (data && data.data) {
          setProfile(data.data);
        } else if (data) {
          setProfile(data);
        } else {
          setErrorMessage("Data profil kosong atau tidak ditemukan.");
        }
      } catch (err) {
        console.error("Gagal memuat profil:", err);
        setErrorMessage("Gagal tersambung ke server atau session kamu habis.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 1. Validasi Ukuran File (Maksimal 2MB sesuai aturan backend)
    const maxSizeInBytes = 2 * 1024 * 1024; 
    if (file.size > maxSizeInBytes) {
      alert("⚠️ Gagal mengunggah! Ukuran foto terlalu besar. Maksimal 2MB.");
      return;
    }

    // 2. Bungkus Semua Data (Gambar + Data Profil) agar tidak terkena Error 400 Bad Request
    const formData = new FormData();
    formData.append("profile_picture", file);
    formData.append("username", profile?.username || "cinta");
    formData.append("email", profile?.email || "cinta@gmail.com");

    try {
      alert("Sedang mengunggah foto... ⏳");
      await uploadProfilePicture(formData);
      alert("Foto profil berhasil diperbarui! 🎉");
      window.location.reload(); 
    } catch (err) {
      console.error("Gagal mengunggah gambar:", err);
      alert("Gagal mengunggah foto! Server menolak permintaan (Error 400/500).");
    }
  };

  if (loading) {
    return <div className="bento-wrapper-page"><h2>Memuat profil pengguna... ⏳</h2></div>;
  }

  if (errorMessage) {
    return (
      <div className="bento-wrapper-page" style={{ textAlign: "center", color: "red", marginTop: "100px" }}>
        <h2>⚠️ Terjadi Kesalahan</h2>
        <p>{errorMessage}</p>
        <p style={{ color: "#555", fontSize: "14px" }}>Silakan coba login ulang terlebih dahulu.</p>
      </div>
    );
  }

  const base_url = "http://localhost:3000/uploads/";
  const imageSrc = profile?.profile_picture 
    ? (profile.profile_picture.startsWith("http") ? profile.profile_picture : `${base_url}${profile.profile_picture}`)
    : "https://i.pravatar.cc/300";

  return (
    <div className="bento-wrapper-page">
      <div className="bento-profile-container">
        
        {/* KOTAK 1: Hero Card (Foto Profil, Nama, Email - Memanjang Kebawah) */}
        <div className="bento-card card-hero" onClick={handleImageClick} title="Klik untuk ubah foto profil">
          <div className="bento-avatar-wrapper">
            <img src={imageSrc} alt="Profile" />
          </div>
          <h2>{profile?.username || "User"}</h2>
          <p className="bento-hero-email">{profile?.email || "Email tidak tersedia"}</p>
          <span className="bento-badge-premium">📷 Klik Foto untuk Ganti</span>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            style={{ display: "none" }}
          />
        </div>

        {/* KOTAK 2: About Me (Tengah Atas) */}
        <div className="bento-card card-about">
          <div className="bento-card-icon">📝</div>
          <h3>About Me</h3>
          <p>{profile?.bio || "Mahasiswa Teknik Informatika yang sedang belajar Fullstack Developer 🚀"}</p>
        </div>

        {/* KOTAK 3: Stats Saving (Kanan Atas) */}
        <div className="bento-card card-stat-saving">
          <div className="bento-card-icon">📈</div>
          <p className="stat-label">Saving Rate</p>
          <h2 className="stat-value">89%</h2>
          <span className="stat-desc">Sangat Hemat!</span>
        </div>

        {/* KOTAK 4: Stats Budget (Bawah Tengah) */}
        <div className="bento-card card-stat-budget">
          <div className="bento-card-icon">💰</div>
          <p className="stat-label">Active Budget</p>
          <h2 className="stat-value">12</h2>
          <span className="stat-desc">Anggaran Bulanan</span>
        </div>

        {/* KOTAK 5: Stats Category (Bawah Kanan) */}
        <div className="bento-card card-stat-category">
          <div className="bento-card-icon">🗂️</div>
          <p className="stat-label">Categories</p>
          <h2 className="stat-value">5</h2>
          <span className="stat-desc">Alokasi Pos Dana</span>
        </div>

      </div>
    </div>
  );
}

export default Profile;
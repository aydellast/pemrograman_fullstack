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

    const maxSizeInBytes = 2 * 1024 * 1024; 
    if (file.size > maxSizeInBytes) {
      alert("⚠️ Gagal mengunggah! Ukuran foto terlalu besar. Maksimal 2MB.");
      return;
    }

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
    return (
      <div className="bento-wrapper-page">
        <div className="profile-loading-box">
          <div className="spinner"></div>
          <h2>Memetakan Finansialmu... ⏳</h2>
        </div>
      </div>
    );
  }

  if (errorMessage) {
    return (
      <div className="bento-wrapper-page">
        <div className="profile-error-box">
          <h2>⚠️ Sesi Berakhir</h2>
          <p>{errorMessage}</p>
          <span className="error-hint">Silakan lakukan Login ulang pada menu utama CuppyCash.</span>
        </div>
      </div>
    );
  }

  const base_url = "http://localhost:3000/uploads/";
  const imageSrc = profile?.profile_picture 
    ? (profile.profile_picture.startsWith("http") ? profile.profile_picture : `${base_url}${profile.profile_picture}`)
    : "https://i.pravatar.cc/300";

  return (
    <div className="bento-wrapper-page">
      {/* Teks sambutan dinamis atas */}
      <div className="profile-welcome-header">
        <h1>Halo, {profile?.username || "Cinta Melati"}! ✨</h1>
        <p>Ini adalah rangkuman performa akun dan pengaturan finansial pribadimu bulan ini.</p>
      </div>

      <div className="bento-profile-container">
        
        {/* CARD 1: Hero Card Kiri (Kunci Utama Visual) */}
        <div className="bento-card card-hero" onClick={handleImageClick} title="Klik untuk ubah foto profil">
          <div className="card-glare"></div>
          
          {/* Tombol Input File Rahasia (Sekarang Sudah Ada & Siap Dipicu) */}
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            style={{ display: "none" }} 
          />

          <div className="bento-avatar-wrapper">
            <img src={imageSrc} alt="Profile" />
            <div className="avatar-overlay">
              <span>GANTI FOTO</span>
            </div>
          </div>
          <h2>{profile?.username || "Cinta Melati"}</h2>
          <p className="bento-hero-email">{profile?.email || "cinta1@gmail.com"}</p>
          <span className="bento-badge-premium">👑 Premium Member</span>
        </div>

        {/* CARD 2: About Me (Gaya Quote Mewah) */}
        <div className="bento-card card-about">
          <div className="bento-card-icon-top">✨</div>
          <h3>Bio & Pengembang</h3>
          <p>"{profile?.bio || "Mahasiswa Teknik Informatika yang sedang belajar Fullstack Developer 🚀"}"</p>
          <div className="card-badge-footer">CuppyCash Team</div>
        </div>

        {/* CARD 3: Stats Saving (Warna Gradasi Soft Pink) */}
        <div className="bento-card card-stat card-pink-glow">
          <div className="stat-header">
            <span className="stat-icon-box">📈</span>
            <p className="stat-label">Saving Rate</p>
          </div>
          <h2 className="stat-value">89%</h2>
          <div className="stat-progress-bar-mini">
            <div className="stat-fill-mini" style={{width: "89%"}}></div>
          </div>
          <span className="stat-desc">🎯 Menuju target kebebasan finansial!</span>
        </div>

        {/* CARD 4: Stats Budget (Bersih & Elegan) */}
        <div className="bento-card card-stat card-maroon-glow">
          <div className="stat-header">
            <span className="stat-icon-box">💰</span>
            <p className="stat-label">Active Budget</p>
          </div>
          <h2 className="stat-value">12</h2>
          <span className="stat-desc">Alokasi anggaran belanja aktif.</span>
        </div>

        {/* CARD 5: Stats Category (Lebar penuh di baris baru untuk menutup grid dengan cantik) */}
        <div className="bento-card card-stat card-full-width">
          <div className="card-flex-row">
            <div className="stat-icon-box large">🗂️</div>
            <div className="stat-text-side">
              <p className="stat-label">Kategori Dompet</p>
              <h2 className="stat-value">5 Pos Dana</h2>
              <span className="stat-desc">Makanan, Kosan, Kuliah, Hiburan, Tabungan</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Profile;
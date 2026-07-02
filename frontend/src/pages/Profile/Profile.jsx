import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  uploadProfilePicture,
} from "../../services/profileService";
import "./Profile.css";

function Profile() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setErrorMessage(null);

      const data = await getProfile();

      if (data && data.data) {
        setProfile(data.data);
      } else if (data) {
        setProfile(data);
      } else {
        setErrorMessage("Data profil kosong atau tidak ditemukan.");
      }
    } catch (err) {
      console.error("Gagal memuat profil:", err);

      if (err.response?.status === 404) {
        setErrorMessage(
          err.response?.data?.message ||
          "Endpoint profile tidak ditemukan. Cek route backend /api/manajemen-users/profile."
        );
      } else if (err.response?.status === 401) {
        setErrorMessage(
          err.response?.data?.message ||
          "Sesi kamu habis atau token tidak valid. Silakan login ulang."
        );
      } else {
        setErrorMessage(
          err.response?.data?.message ||
          "Gagal tersambung ke server."
        );
      }
    } finally {
      setLoading(false);
    }
  };

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
      alert("⚠️ Ukuran foto terlalu besar. Maksimal 2MB.");
      return;
    }

    const formData = new FormData();

    formData.append("profile_picture", file);
    formData.append("username", profile?.username || "");
    formData.append("email", profile?.email || "");

    if (profile?.password) {
      formData.append("password", profile.password);
    }

    try {
      alert("Sedang mengunggah foto... ⏳");

      await uploadProfilePicture(formData);

      alert("Foto profil berhasil diperbarui! 🎉");

      fetchProfile();
    } catch (err) {
      console.error("Gagal mengunggah foto:", err);
      console.log("STATUS:", err.response?.status);
      console.log("DATA ERROR:", err.response?.data);

      alert(
        err.response?.data?.message ||
        "Gagal mengunggah foto. Cek koneksi server atau format file."
      );
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
          <h2>⚠️ Profile Tidak Dapat Dimuat</h2>

          <p>{errorMessage}</p>

          <span className="error-hint">
            Coba login ulang atau cek route backend profile.
          </span>

          <br />
          <br />

          <button
            className="primary-button"
            onClick={() => {
              localStorage.removeItem("token");
              localStorage.removeItem("username");
              navigate("/login");
            }}
          >
            Login Ulang
          </button>
        </div>
      </div>
    );
  }

  const baseUrl = "http://localhost:3000/uploads/";

  const profilePhoto =
    profile?.profile_picture || profile?.foto_profil;

  const imageSrc = profilePhoto
    ? profilePhoto.startsWith("http")
      ? profilePhoto
      : `${baseUrl}${profilePhoto}`
    : "https://i.pravatar.cc/300";

  return (
    <div className="bento-wrapper-page">
      <div className="profile-welcome-header">
        <h1>
          Halo, {profile?.username || "User"}! ✨
        </h1>

        <p>
          Ini adalah rangkuman performa akun dan pengaturan finansial
          pribadimu bulan ini.
        </p>
      </div>

      <div className="bento-profile-container">
        <div
          className="bento-card card-hero"
          onClick={handleImageClick}
          title="Klik untuk ubah foto profil"
        >
          <div className="card-glare"></div>

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

          <h2>{profile?.username || "User"}</h2>

          <p className="bento-hero-email">
            {profile?.email || "email belum tersedia"}
          </p>

          <span className="bento-badge-premium">
            👑 Premium Member
          </span>
        </div>

        <div className="bento-card card-about">
          <div className="bento-card-icon-top">✨</div>

          <h3>Bio & Pengembang</h3>

          <p>
            "
            {profile?.bio ||
              "Mahasiswa Teknik Informatika yang sedang belajar Fullstack Developer 🚀"}
            "
          </p>

          <div className="card-badge-footer">
            CuppyCash Team
          </div>
        </div>

        <div className="bento-card card-stat card-pink-glow">
          <div className="stat-header">
            <span className="stat-icon-box">📈</span>

            <p className="stat-label">Saving Rate</p>
          </div>

          <h2 className="stat-value">
            {profile?.saving_rate || 0}%
          </h2>
          <div className="stat-progress-bar-mini">
            <div
              className="stat-fill-mini"
              style={{ width: `${profile?.saving_rate || 0}%` }}
            ></div>
          </div>

          <span className="stat-desc">
            🎯 Menuju target kebebasan finansial!
          </span>
        </div>

        <div className="bento-card card-stat card-maroon-glow">
          <div className="stat-header">
            <span className="stat-icon-box">💰</span>

            <p className="stat-label">Active Budget</p>
          </div>

          <h2 className="stat-value">
            {profile?.active_budget || 0}
          </h2>

          <span className="stat-desc">
            Alokasi anggaran belanja aktif.
          </span>
        </div>

        <div className="bento-card card-stat card-full-width">
          <div className="card-flex-row">
            <div className="stat-icon-box large">🗂️</div>

            <div className="stat-text-side">
              <p className="stat-label">Kategori Dompet</p>

              <h2 className="stat-value">
                {profile?.category_count || 0} Pos Dana
              </h2>

              <span className="stat-desc">
               {profile?.category_names || "Belum ada kategori"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
import api from "./api";

// 1. Fungsi Ambil Data Profil (GET)
export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get(
    "/manajemen-users/profile",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

// 2. Fungsi Update & Upload Foto Profil (PUT) - VERSI REVISI TOTAL
export const uploadProfilePicture = async (formData) => {
  const token = localStorage.getItem("token");

  const response = await api.put(
    "/manajemen-users/profile",
    formData,
    {
      headers: {
        "Authorization": `Bearer ${token}`,
        // Biarkan browser yang mendefinisikan content-type multipart beserta boundary-nya secara otomatis
        "Content-Type": "multipart/form-data" 
      }
    }
  );

  return response.data;
};
import api from "./api";

export const getProfile = async () => {
  const response = await api.get("/manajemen-users/profile");
  return response.data;
};

export const uploadProfilePicture = async (formData) => {
  const response = await api.put(
    "/manajemen-users/profile",
    formData
  );

  return response.data;
};
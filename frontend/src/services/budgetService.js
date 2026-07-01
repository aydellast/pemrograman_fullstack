import api from "./api";

export const getBudgets = async () => {
  const token = localStorage.getItem("token");
  
  const response = await api.get("/budgets", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  
  return response.data;
};
import api from "./api";

export const getBudgets = async () => {
  const response = await api.get("/budgets");
  return response.data;
};
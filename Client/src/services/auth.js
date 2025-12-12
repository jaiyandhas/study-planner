import api from "./axios";

export const loginUser = async (username, password) => {
  const res = await api.post("/login", { username, password });
  return res.data;
};

import axios from "axios";

const api = axios.create({
  baseURL: "https://google-auth-backend-loxg.onrender.com/auth",
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);

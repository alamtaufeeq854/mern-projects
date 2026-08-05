import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.DEV
    ? "http://localhost:5001/api"
    : "https://thinkboard-backend-tb9x.onrender.com/api",
});

export default api;

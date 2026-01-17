import axios from "axios";

const backendOrigins = [
  "http://localhost:7000",
  "https://note-ai-rk04.onrender.com"
];

const api = axios.create({
  baseURL: backendOrigins[1], // Use the deployed backend URL

  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

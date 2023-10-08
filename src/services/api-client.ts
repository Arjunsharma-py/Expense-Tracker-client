import axios from "axios";
const isProd = import.meta.env.PROD;
const backendURL = import.meta.env.VITE_BACKEND_URL;
const frontendURL = import.meta.env.VITE_FRONTEND_URL;

const apiClient = axios.create({
  baseURL: (isProd ? backendURL : "http://localhost:3000") + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.clear();
      window.location.href = isProd
        ? frontendURL
        : "http://localhost:5173" + "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

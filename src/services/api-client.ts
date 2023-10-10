import axios from "axios";
const isProd = import.meta.env.PROD;

const apiClient = axios.create({
  baseURL:
    (isProd
      ? "https://expense-tracker-uha4.onrender.com"
      : "http://localhost:3000") + "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.token
    ) {
      localStorage.clear();
      window.location.href =
        (isProd
          ? "https://expense-tracker-client-theta.vercel.app"
          : "http://localhost:5173") + "/auth/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

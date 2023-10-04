import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://expense-tracker-uha4.onrender.com/api",
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
      window.location.href =
        "https://expense-tracker-client-theta.vercel.app/auth/login";
    }
    return Promise.reject(error);
  }
);

export default apiClient;

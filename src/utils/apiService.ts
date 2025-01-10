import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ApiConfig } from "@/configs/apiConfig";
// import { logOut } from "@/services/userService";

const apiService = axios.create({
  baseURL: ApiConfig.baseUrl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

const getCsrfToken = (): string | null => {
  const csrfCookie = document.cookie
    .split(";")
    .find((cookie) => cookie.trim().startsWith("csrf-token="));
  if (csrfCookie) {
    return csrfCookie.split("=")[1] ?? null;
  }
  return null;
};
const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};
apiService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    const csrfToken = getCsrfToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    if (csrfToken) {
      config.headers["X-CSRF-TOKEN"] = csrfToken;
    }

    // Debugging: log headers
    console.log(config.headers);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiService.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // logOut();
    }
    return Promise.reject(error);
  }
);

export { apiService };

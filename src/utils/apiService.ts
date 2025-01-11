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

const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

const logout = () => {
  localStorage.removeItem("token");
};

apiService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

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
      logout();
    }
    return Promise.reject(error);
  }
);

export { apiService };

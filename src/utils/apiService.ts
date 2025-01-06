import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { ApiConfig } from "@/configs/apiConfig";

const apiService = axios.create({
  baseURL: ApiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

apiService.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = getAuthToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      //   logout();
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
      // Token is expired or invalid, log out
      //   logout();
    }
    return Promise.reject(error);
  }
);

export { apiService };

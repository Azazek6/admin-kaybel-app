import { env } from "@/config/config";
import { ApiResponse } from "@/shared/types/general";
import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

const apiClient: AxiosInstance = axios.create({
  baseURL: `${env.apiUrl}/v1`,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

apiClient.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data;
  },
  (error: AxiosError) => {
    const customError: ApiResponse = {
      success: false,
      message: "Ocurrió un error inesperado",
    };

    if (error.response) {
      const serverData = error.response.data as any;
      customError.message = serverData?.message || "Error en el servidor";
      customError.errors = serverData?.errors;

      if (error.response.status === 401) {
        console.warn("Sesión expirada");
      }
    } else if (error.request) {
      customError.message = "No se pudo conectar con el servidor";
    }

    return Promise.reject(customError);
  },
);

export default apiClient;

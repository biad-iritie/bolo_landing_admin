import axios, { AxiosError } from "axios";
import {
  AuthResponse,
  LoginCredentials,
  RegisterData,
  ApiError,
} from "./types";
import { mockAuthApi } from "./mock-api";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";
const USE_MOCK_API = process.env.NODE_ENV === "development";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // This is important for cookies
});

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error: AxiosError<ApiError>) => {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    }
    throw new Error("Une erreur est survenue");
  }
);

// Real API implementation using Axios
const realAuthApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    return axiosInstance.post("/auth/login", credentials);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    return axiosInstance.post("/auth/register", data);
  },

  async refreshToken(): Promise<AuthResponse> {
    return axiosInstance.post("/auth/refresh");
  },

  async logout(): Promise<void> {
    await axiosInstance.post("/auth/logout");
  },

  async verifyToken(): Promise<AuthResponse> {
    return axiosInstance.get("/auth/verify");
  },
};

// Export the appropriate API implementation based on environment
export const authApi = USE_MOCK_API ? mockAuthApi : realAuthApi;

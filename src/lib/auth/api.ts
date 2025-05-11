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

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = await response.json();
    throw new Error(error.message || "Une erreur est survenue");
  }
  return response.json();
}

// Real API implementation
const realAuthApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
      credentials: "include",
    });
    return handleResponse<AuthResponse>(response);
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });
    return handleResponse<AuthResponse>(response);
  },

  async refreshToken(): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });
    return handleResponse<AuthResponse>(response);
  },

  async logout(): Promise<void> {
    await fetch(`${API_URL}/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  },

  async verifyToken(): Promise<AuthResponse> {
    const response = await fetch(`${API_URL}/auth/verify`, {
      credentials: "include",
    });
    return handleResponse<AuthResponse>(response);
  },
};

// Export the appropriate API implementation based on environment
export const authApi = USE_MOCK_API ? mockAuthApi : realAuthApi;

import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";
import { ErrorResponse } from "./types";

// API base configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "";

// Custom error class for API errors
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public data?: ErrorResponse
  ) {
    super(message);
    this.name = "ApiError";
  }
}

// Create axios instance with default config
const createApiClient = (): AxiosInstance => {
  const client = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      "Content-Type": "application/json",
    },
    timeout: 10000, // 10 seconds timeout
  });

  // Request interceptor
  client.interceptors.request.use(
    (config) => {
      // You can add auth token here
      const token = localStorage.getItem("auth_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor
  client.interceptors.response.use(
    (response: AxiosResponse) => {
      return response;
    },
    (error: AxiosError<ErrorResponse>) => {
      if (error.response) {
        // Handle specific HTTP error codes
        const status = error.response.status;
        const message = error.response.data?.message || "An error occurred";

        switch (status) {
          case 401:
            // Handle unauthorized
            // You might want to redirect to login or refresh token
            break;
          case 403:
            // Handle forbidden
            break;
          case 404:
            // Handle not found
            break;
          case 500:
            // Handle server error
            break;
        }

        return Promise.reject(
          new ApiError(status, message, error.response.data)
        );
      }

      if (error.request) {
        // Request was made but no response received
        return Promise.reject(
          new ApiError(0, "No response received from server")
        );
      }

      // Something happened in setting up the request
      return Promise.reject(new ApiError(0, "Error setting up request"));
    }
  );

  return client;
};

// Create and export the API client instance
export const apiClient = createApiClient();

// Generic request wrapper with type safety
export const apiRequest = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await apiClient.request<T>(config);
    return response.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(0, "Unknown error occurred");
  }
};

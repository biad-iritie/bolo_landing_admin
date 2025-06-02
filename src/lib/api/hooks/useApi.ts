import { useState, useCallback } from "react";
import { AxiosRequestConfig } from "axios";
import { apiRequest, ApiError } from "../client";
import { ApiResponse } from "../types";

interface UseApiState<T> {
  data: T | null;
  loading: boolean;
  error: ApiError | null;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (config?: AxiosRequestConfig) => Promise<void>;
  reset: () => void;
}

export function useApi<T>(defaultConfig?: AxiosRequestConfig): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const execute = useCallback(
    async (config?: AxiosRequestConfig) => {
      try {
        setState((prev) => ({ ...prev, loading: true, error: null }));

        const response = await apiRequest<ApiResponse<T>>({
          ...defaultConfig,
          ...config,
        });

        setState({
          data: response.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setState({
          data: null,
          loading: false,
          error:
            error instanceof ApiError
              ? error
              : new ApiError(0, "Unknown error occurred"),
        });
      }
    },
    [defaultConfig]
  );

  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}

// Example usage:
/*
const { data, loading, error, execute } = useApi<User>({
  method: 'GET',
  url: '/api/users',
});

// Later in your component:
useEffect(() => {
  execute();
}, [execute]);
*/

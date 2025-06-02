// Common API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

// Pagination types
export interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Common CRUD operations response types
export interface CreateResponse<T> {
  data: T;
  message: string;
}

export interface UpdateResponse<T> {
  data: T;
  message: string;
}

export interface DeleteResponse {
  message: string;
  id: string;
}

// Error response type
export interface ErrorResponse {
  message: string;
  code?: string;
  details?: Record<string, unknown>;
  status: number;
}

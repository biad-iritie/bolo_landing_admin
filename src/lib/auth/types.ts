export type User = {
  id: string;
  email: string;
  businessName: string;
  storeStatus: "pending" | "approved" | "rejected";
  role: "owner" | "staff";
};

export type AuthResponse = {
  accessToken: string;
  refreshToken: string;
  user: User;
};

export type LoginCredentials = {
  email: string;
  password: string;
};

export type RegisterData = {
  email: string;
  password: string;
  businessName: string;
  businessType: string;
  address: string;
  city: string;
  postalCode: string;
};

export type ApiError = {
  message: string;
  code: string;
  status: number;
};

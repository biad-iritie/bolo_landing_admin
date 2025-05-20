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
};

export type PartnerProfile = {
  phoneNumber?: string;
  openingHours?: {
    [key: string]: { open: string; close: string };
  };
  parkingAvailable?: boolean;
  deliveryAvailable?: boolean;
  paymentMethods?: string[];
  storeDescription?: string;
  storeLogo?: string;
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  location?: {
    latitude: number;
    longitude: number;
  }; // Additional services offered
};

export type ApiError = {
  message: string;
  code: string;
  status: number;
};

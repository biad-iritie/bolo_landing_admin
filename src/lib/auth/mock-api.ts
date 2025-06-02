import { AuthResponse, LoginCredentials, RegisterData, User } from "./types";

// Mock user database
const mockUsers: User[] = [
  {
    id: "1",
    email: "test@example.com",
    businessName: "Super Marché Test",
    storeStatus: "approved",
    role: "owner",
  },
];

// Helper to get cookie value
const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || null;
  return null;
};

// Mock token storage (simulating cookies)
let mockTokenStore = {
  token: null as string | null,
};

// Initialize token store from cookies
const initializeTokenStore = () => {
  mockTokenStore = {
    token: getCookie("token"),
  };
};

// Call initialization
if (typeof document !== "undefined") {
  initializeTokenStore();
}

// Simulate network delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Helper to generate tokens
const generateTokens = () => ({
  token: `mock-token-${Date.now()}`,
});

// Helper to set cookies in document
const setCookies = (token: string) => {
  document.cookie = `token=${token}; path=/`;
};

// Helper to clear cookies
const clearCookies = () => {
  document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  mockTokenStore = { token: null };
};

// Mock API service
export const mockAuthApi = {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    await delay(1000);

    // Simulate validation
    if (
      credentials.email !== "test@example.com" ||
      credentials.password !== "testtest"
    ) {
      throw new Error("Email ou mot de passe incorrect");
    }

    const user = mockUsers.find((u) => u.email === credentials.email);
    if (!user) {
      throw new Error("Utilisateur non trouvé");
    }

    // Generate new tokens
    const tokens = generateTokens();
    mockTokenStore = tokens;
    setCookies(tokens.token);

    return {
      token: tokens.token,
      user,
    };
  },

  async register(data: RegisterData): Promise<AuthResponse> {
    await delay(1500);

    // Check if email already exists
    if (mockUsers.some((u) => u.email === data.email)) {
      throw new Error("Cet email est déjà utilisé");
    }

    // Create new user
    const newUser: User = {
      id: String(mockUsers.length + 1),
      email: data.email,
      businessName: data.businessName,
      storeStatus: "pending",
      role: "owner",
    };

    mockUsers.push(newUser);

    // Generate new tokens
    const tokens = generateTokens();
    mockTokenStore = tokens;
    setCookies(tokens.token);

    return {
      token: tokens.token,
      user: newUser,
    };
  },

  async refreshToken(): Promise<AuthResponse> {
    await delay(800);

    // Check if we have a refresh token
    if (!mockTokenStore.token) {
      throw new Error("Non authentifié");
    }

    // Generate new tokens
    const tokens = generateTokens();
    mockTokenStore = tokens;
    setCookies(tokens.token);

    // Return the first user for simplicity
    return {
      token: tokens.token,
      user: mockUsers[0],
    };
  },

  async logout(): Promise<void> {
    await delay(500);
    clearCookies();
  },

  async verifyToken(): Promise<AuthResponse> {
    await delay(800);

    // Re-initialize from cookies before verifying
    initializeTokenStore();

    // Check if we have an access token
    if (!mockTokenStore.token) {
      throw new Error("Non authentifié");
    }

    // In a real app, we would validate the token
    // For mock purposes, we'll just return the user if we have a token
    return {
      token: mockTokenStore.token!,
      user: mockUsers[0],
    };
  },

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    initializeTokenStore();
    return !!mockTokenStore.token;
  },
};

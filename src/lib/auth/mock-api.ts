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
  accessToken: null as string | null,
  refreshToken: null as string | null,
};

// Initialize token store from cookies
const initializeTokenStore = () => {
  mockTokenStore = {
    accessToken: getCookie("accessToken"),
    refreshToken: getCookie("refreshToken"),
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
  accessToken: `mock-access-token-${Date.now()}`,
  refreshToken: `mock-refresh-token-${Date.now()}`,
});

// Helper to set cookies in document
const setCookies = (accessToken: string, refreshToken: string) => {
  // In a real app, these would be HTTP-only cookies set by the backend
  // For mock purposes, we'll simulate the cookie behavior
  document.cookie = `accessToken=${accessToken}; path=/`;
  document.cookie = `refreshToken=${refreshToken}; path=/`;
};

// Helper to clear cookies
const clearCookies = () => {
  document.cookie =
    "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  document.cookie =
    "refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
  mockTokenStore = { accessToken: null, refreshToken: null };
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
    setCookies(tokens.accessToken, tokens.refreshToken);

    return {
      ...tokens,
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
    setCookies(tokens.accessToken, tokens.refreshToken);

    return {
      ...tokens,
      user: newUser,
    };
  },

  async refreshToken(): Promise<AuthResponse> {
    await delay(800);

    // Check if we have a refresh token
    if (!mockTokenStore.refreshToken) {
      throw new Error("Non authentifié");
    }

    // Generate new tokens
    const tokens = generateTokens();
    mockTokenStore = tokens;
    setCookies(tokens.accessToken, tokens.refreshToken);

    // Return the first user for simplicity
    return {
      ...tokens,
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
    if (!mockTokenStore.accessToken || !mockTokenStore.refreshToken) {
      throw new Error("Non authentifié");
    }

    // In a real app, we would validate the token
    // For mock purposes, we'll just return the user if we have a token
    return {
      accessToken: mockTokenStore.accessToken,
      refreshToken: mockTokenStore.refreshToken,
      user: mockUsers[0],
    };
  },

  // Helper method to check if user is authenticated
  isAuthenticated(): boolean {
    // Re-initialize from cookies before checking
    initializeTokenStore();
    return !!mockTokenStore.accessToken;
  },
};

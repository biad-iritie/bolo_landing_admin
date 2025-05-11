import { create } from "zustand";
import { User, LoginCredentials, RegisterData } from "./types";
import { authApi } from "./api";
import { toast } from "sonner";

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  verifyAuth: () => Promise<void>;
}

type AuthStore = {
  set: (state: Partial<AuthState>) => void;
};

export const useAuth = create<AuthState>((set: AuthStore["set"]) => ({
  user: null,
  isLoading: false,
  isAuthenticated: false,

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true });
    try {
      const { user } = await authApi.login(credentials);
      set({ user, isAuthenticated: true });
      toast.success("Connexion réussie");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur de connexion";
      toast.error(message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (data: RegisterData) => {
    set({ isLoading: true });
    try {
      const { user } = await authApi.register(data);
      set({ user, isAuthenticated: true });
      toast.success("Inscription réussie");
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erreur d'inscription";
      toast.error(message);
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await authApi.logout();
      set({ user: null, isAuthenticated: false });
      toast.success("Déconnexion réussie");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Erreur lors de la déconnexion";
      toast.error(message);
    } finally {
      set({ isLoading: false });
    }
  },

  verifyAuth: async () => {
    set({ isLoading: true });
    try {
      const { user } = await authApi.verifyToken();
      set({ user, isAuthenticated: true });
    } catch {
      set({ user: null, isAuthenticated: false });
    } finally {
      set({ isLoading: false });
    }
  },
}));

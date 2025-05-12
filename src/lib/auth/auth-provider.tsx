"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginCredentials, RegisterData, User } from "./types";
import { mockAuthApi } from "./mock-api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const verifyToken = async () => {
      try {
        if (!mockAuthApi.isAuthenticated()) {
          if (mounted) {
            setUser(null);
            setIsLoading(false);
          }
          return;
        }

        const response = await mockAuthApi.verifyToken();
        if (mounted) {
          setUser(response.user);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        if (mounted) {
          setUser(null);
          setIsLoading(false);
        }
      }
    };

    verifyToken();
    return () => {
      mounted = false;
    };
  }, []);

  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await mockAuthApi.login(credentials);
      setUser(response.user);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: RegisterData) => {
    setIsLoading(true);
    try {
      const response = await mockAuthApi.register(data);
      setUser(response.user);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await mockAuthApi.logout();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

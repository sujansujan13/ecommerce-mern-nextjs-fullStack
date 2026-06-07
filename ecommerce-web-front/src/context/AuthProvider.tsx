"use client";
import { getMe, logoutUser } from "@/api/authApi";
import React, { createContext, useContext, useEffect, useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => Promise<void>;
}

interface MeResponse {
  user: User;
}
const AuthContext = createContext<AuthContextType | null>(null);
export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setLoading(false);
        return;
      }
      try {
        const { data }: { data: MeResponse } = await getMe();
        setUser(data.user);
      } catch {
        localStorage.removeItem("accessToken");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  // Called after login or register — sets state + saves token
  const login = (userData: User, token: string) => {
    localStorage.setItem("accessToken", token);
    setUser(userData);
  };

  // called on Logout button click
  const logout = async () => {
    try {
      await logoutUser();
    } catch {}
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook — use this anywhere in the app
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

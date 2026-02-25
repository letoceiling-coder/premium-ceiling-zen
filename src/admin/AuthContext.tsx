import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import { authApi } from "@/api/http";
import type { AuthUser } from "@/api/types";

interface AuthCtx {
  user: AuthUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<string | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx>({
  user: null,
  token: null,
  loading: true,
  login: async () => "no provider",
  logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("admin_token"));
  const [loading, setLoading] = useState(true);

  const fetchMe = useCallback(async () => {
    if (!token) { setLoading(false); return; }
    const { data, error } = await authApi.me();
    if (error) {
      localStorage.removeItem("admin_token");
      setToken(null);
      setUser(null);
    } else {
      setUser(data);
    }
    setLoading(false);
  }, [token]);

  useEffect(() => { fetchMe(); }, [fetchMe]);

  const login = async (email: string, password: string) => {
    const { data, error } = await authApi.login({ email, password });
    if (error) return error.message;
    if (data) {
      localStorage.setItem("admin_token", data.token);
      setToken(data.token);
      setUser(data.user);
    }
    return null;
  };

  const logout = async () => {
    await authApi.logout();
    localStorage.removeItem("admin_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

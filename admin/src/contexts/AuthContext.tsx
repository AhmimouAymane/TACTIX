import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { auth, AdminApi } from '../services/api';
import type { User } from '../types/api';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [, setToken, clearToken] = useLocalStorage<string | null>('ladmin_token', null);
  const [user, setUser] = useLocalStorage<User | null>('ladmin_user', null);

  const login = async (email: string, password: string) => {
    const res = await AdminApi.login({ email, password });
    auth.setToken(res.access_token);
    setToken(res.access_token);
    setUser(res.user);
  };

  const logout = () => {
    auth.clearToken();
    clearToken();
    setUser(null);
  };

  const value = useMemo(
    () => ({ user, loading: false, login, logout }),
    [user, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}

import { useCallback, useMemo, useState } from "react";
import type { ReactNode } from "react";

import {
  getSession,
  login as loginService,
  logout as logoutService,
} from "./authService";

import { AuthContext } from "./AuthContextStore";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [session, setSession] = useState(() => getSession());

  const login = useCallback((email: string, password: string) => {
    const result = loginService(email, password);

    if (result.success && result.session) {
      setSession(result.session);
    }

    return {
      success: result.success,
      message: result.message,
    };
  }, []);

  const logout = useCallback(() => {
    logoutService();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      session,
      isAuthenticated: Boolean(session),
      login,
      logout,
    }),
    [session, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

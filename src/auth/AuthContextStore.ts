import { createContext } from "react";

import type { AuthSession, AuthUser } from "./authService";

export interface AuthContextValue {
  user: AuthUser | null;
  session: AuthSession | null;
  isAuthenticated: boolean;

  login: (
    email: string,
    password: string,
  ) => {
    success: boolean;
    message?: string;
  };

  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(
  undefined,
);

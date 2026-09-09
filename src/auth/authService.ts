const AUTH_STORAGE_KEY = "super_admin_auth";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "super_admin";
}

export interface AuthSession {
  user: AuthUser;
  token: string;
}

const DEMO_USER = {
  email: "admin@superadmin.com",
  password: "Admin@123",
};

const DEMO_SESSION: AuthSession = {
  user: {
    id: "super-admin-001",
    name: "Super Administrator",
    email: "admin@superadmin.com",
    role: "super_admin",
  },
  token: "demo-super-admin-token",
};

export function login(
  email: string,
  password: string,
): { success: boolean; message?: string } {
  if (
    email.trim().toLowerCase() === DEMO_USER.email &&
    password === DEMO_USER.password
  ) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(DEMO_SESSION));

    return {
      success: true,
    };
  }

  return {
    success: false,
    message: "Invalid email or password.",
  };
}

export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

export function getSession(): AuthSession | null {
  const session = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!session) {
    return null;
  }

  try {
    return JSON.parse(session) as AuthSession;
  } catch {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function getCurrentUser(): AuthUser | null {
  return getSession()?.user ?? null;
}

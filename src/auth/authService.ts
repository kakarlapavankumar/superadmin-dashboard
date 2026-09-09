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
  loginAt: string;
}

const DEMO_EMAIL = "admin@superadmin.com";
const DEMO_PASSWORD = "Admin@123";

export function login(
  email: string,
  password: string,
): {
  success: boolean;
  session?: AuthSession;
  message?: string;
} {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === DEMO_EMAIL && password === DEMO_PASSWORD) {
    const session: AuthSession = {
      user: {
        id: "super-admin-001",
        name: "Super Administrator",
        email: DEMO_EMAIL,
        role: "super_admin",
      },
      token: "demo-super-admin-token",
      loginAt: new Date().toISOString(),
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));

    return {
      success: true,
      session,
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
  const storedSession = localStorage.getItem(AUTH_STORAGE_KEY);

  if (!storedSession) {
    return null;
  }

  try {
    const session = JSON.parse(storedSession) as AuthSession;

    if (
      !session ||
      !session.user ||
      !session.token ||
      session.user.role !== "super_admin"
    ) {
      logout();
      return null;
    }

    return session;
  } catch {
    logout();
    return null;
  }
}

export function getCurrentUser(): AuthUser | null {
  return getSession()?.user ?? null;
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

export function getDemoCredentials() {
  return {
    email: DEMO_EMAIL,
    password: DEMO_PASSWORD,
  };
}

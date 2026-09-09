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

/**
 * Login user
 */
export function login(
  email: string,
  password: string,
): {
  success: boolean;
  message?: string;
} {
  const normalizedEmail = email.trim().toLowerCase();

  if (normalizedEmail === DEMO_USER.email && password === DEMO_USER.password) {
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

/**
 * Logout user
 */
export function logout(): void {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}

/**
 * Get current authentication session
 */
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
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return session;
  } catch (error) {
    console.error("Invalid authentication session:", error);

    localStorage.removeItem(AUTH_STORAGE_KEY);

    return null;
  }
}

/**
 * Check whether user is authenticated
 */
export function isAuthenticated(): boolean {
  return getSession() !== null;
}

/**
 * Get currently logged-in user
 */
export function getCurrentUser(): AuthUser | null {
  return getSession()?.user ?? null;
}

import { api, getToken, setToken } from "@/lib/api";
import type { AdminUser } from "@/types";

interface LoginResponse {
  access_token: string;
  token_type: string;
  user: AdminUser;
}

/** Signs in against the FastAPI backend and stores the returned JWT. */
export async function signIn(email: string, password: string): Promise<AdminUser> {
  const result = await api.post<LoginResponse>("/api/auth/login", {
    email: email.trim().toLowerCase(),
    password,
  });
  setToken(result.access_token);
  return result.user;
}

export function signOut() {
  setToken(null);
}

/** Validates the stored token with the server; returns null when it is missing or expired. */
export async function getCurrentUser(): Promise<AdminUser | null> {
  if (!getToken()) return null;
  try {
    return await api.adminGet<AdminUser>("/api/auth/me");
  } catch {
    return null;
  }
}

export function changePassword(currentPassword: string, newPassword: string) {
  return api.adminPost<{ ok: boolean }>("/api/auth/change-password", {
    currentPassword,
    newPassword,
  });
}

import type { AdminUser } from "@/types";
import { STORAGE_KEYS, isBrowser } from "./storage";

/**
 * DEMO AUTHENTICATION — NOT SECURE.
 * Credentials are checked in the browser and the "session" is just a
 * localStorage flag. There is no server, no token verification and no real
 * protection of admin data.
 * BACKEND SWAP: replace with Supabase Auth (signInWithPassword + session listener).
 */
export const DEMO_CREDENTIALS = {
  email: "admin@maverickmanju.in",
  password: "admin123",
};

const DEMO_USER: AdminUser = {
  id: "demo-admin",
  email: DEMO_CREDENTIALS.email,
  name: "Maverick Manju",
  role: "admin",
};

export function signIn(email: string, password: string): AdminUser {
  if (
    email.trim().toLowerCase() !== DEMO_CREDENTIALS.email ||
    password !== DEMO_CREDENTIALS.password
  ) {
    throw new Error("Invalid email or password.");
  }
  if (isBrowser()) localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(DEMO_USER));
  return DEMO_USER;
}

export function signOut() {
  if (isBrowser()) localStorage.removeItem(STORAGE_KEYS.session);
}

export function getCurrentUser(): AdminUser | null {
  if (!isBrowser()) return null;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.session);
    return raw ? (JSON.parse(raw) as AdminUser) : null;
  } catch {
    return null;
  }
}

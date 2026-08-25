import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import * as authService from "@/services/authService";
import type { AdminUser } from "@/types";

interface AdminAuthValue {
  user: AdminUser | null;
  /** False until the stored token has been validated against the backend. */
  ready: boolean;
  signIn: (email: string, password: string) => Promise<AdminUser>;
  signOut: () => void;
}

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    authService.getCurrentUser().then((current) => {
      if (!active) return;
      setUser(current);
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  const value = useMemo<AdminAuthValue>(
    () => ({
      user,
      ready,
      signIn: async (email, password) => {
        const signedIn = await authService.signIn(email, password);
        setUser(signedIn);
        return signedIn;
      },
      signOut: () => {
        authService.signOut();
        setUser(null);
      },
    }),
    [user, ready],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used inside AdminAuthProvider");
  return ctx;
}

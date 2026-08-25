import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import * as authService from "@/services/authService";
import type { AdminUser } from "@/types";

interface AdminAuthValue {
  user: AdminUser | null;
  ready: boolean;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

const AdminAuthContext = createContext<AdminAuthValue | null>(null);

/** Demo-only session context. Swap the body for Supabase Auth later. */
export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setUser(authService.getCurrentUser());
    setReady(true);
  }, []);

  const value = useMemo<AdminAuthValue>(
    () => ({
      user,
      ready,
      signIn: (email, password) => setUser(authService.signIn(email, password)),
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

import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Loader2, Lock } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminButton, adminInput, adminLabel } from "@/components/admin/ui";
import { Particles } from "@/components/site/primitives";
import { useAdminAuth } from "@/hooks/useAdminAuth";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Maverick Manju" },
      { name: "description", content: "Admin sign in for the Maverick Manju dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { signIn, user, ready } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (ready && user) navigate({ to: "/admin/dashboard" });
  }, [ready, user, navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await signIn(email, password);
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="relative grid min-h-screen place-items-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 spotlight" />
      <Particles count={12} />
      <div className="relative w-full max-w-md">
        <Link to="/" className="block text-center font-display text-xl tracking-[0.18em]">
          MAVERICK<span className="text-primary">.MANJU</span>
        </Link>
        <form onSubmit={onSubmit} className="card-mm mt-6 border-t-2 border-t-primary p-7">
          <h1 className="font-display text-2xl">Admin Sign In</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage gallery, testimonials and booking enquiries.
          </p>

          <div className="mt-6 space-y-4">
            <label className="flex flex-col gap-1.5">
              <span className={adminLabel}>Email</span>
              <input
                type="email"
                className={adminInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                placeholder="admin@maverickmanju.in"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className={adminLabel}>Password</span>
              <input
                type="password"
                className={adminInput}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                placeholder="••••••••"
              />
            </label>
          </div>

          {error && <p className="mt-4 text-sm text-primary-glow">{error}</p>}

          <AdminButton type="submit" className="mt-6 w-full" disabled={submitting}>
            {submitting ? <Loader2 size={14} className="animate-spin" /> : <Lock size={14} />}
            {submitting ? "Signing in…" : "Sign in"}
          </AdminButton>
        </form>
      </div>
    </div>
  );
}

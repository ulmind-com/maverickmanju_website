import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { Lock, ShieldAlert } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminButton, adminInput, adminLabel } from "@/components/admin/ui";
import { Particles } from "@/components/site/primitives";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { DEMO_CREDENTIALS } from "@/services/authService";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Admin Login | Maverick Manju" },
      { name: "description", content: "Demo admin sign in for the Maverick Manju dashboard." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const { signIn, user, ready } = useAdminAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState(DEMO_CREDENTIALS.email);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (ready && user) navigate({ to: "/admin/dashboard" });
  }, [ready, user, navigate]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      signIn(email, password);
      navigate({ to: "/admin/dashboard" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed.");
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
                className={adminInput}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
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

          <AdminButton type="submit" className="mt-6 w-full">
            <Lock size={14} /> Sign in
          </AdminButton>

          <div className="mt-6 border border-dashed border-border p-4 text-xs text-muted-foreground">
            <p className="mb-2 flex items-center gap-2 font-bold text-foreground/80">
              <ShieldAlert size={14} className="text-primary" /> Demo authentication
            </p>
            <p>
              Email: <span className="text-foreground">{DEMO_CREDENTIALS.email}</span>
              <br />
              Password: <span className="text-foreground">{DEMO_CREDENTIALS.password}</span>
            </p>
            <p className="mt-2">
              This is a frontend-only demo session stored in your browser. It is not secure
              authentication and must be replaced by a real auth provider before going live.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

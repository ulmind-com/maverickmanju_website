import { createFileRoute } from "@tanstack/react-router";
import { KeyRound, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminButton, AdminField, AdminPageHeader, adminInput } from "@/components/admin/ui";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { changePassword } from "@/services/authService";
import { updateSettings } from "@/services/siteService";
import type { SiteSettings } from "@/types";

export const Route = createFileRoute("/admin/settings")({
  head: () => ({
    meta: [
      { title: "Site Settings | Maverick Manju Admin" },
      { name: "description", content: "Edit contact details, socials and site copy." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminShell>
      <AdminSettings />
    </AdminShell>
  ),
});

const FIELDS: { key: keyof SiteSettings; label: string; textarea?: boolean }[] = [
  { key: "artistName", label: "Artist name" },
  { key: "tagline", label: "Tagline" },
  { key: "phone", label: "Phone" },
  { key: "whatsapp", label: "WhatsApp (country code + number, digits only)" },
  { key: "email", label: "Email" },
  { key: "instagram", label: "Instagram URL" },
  { key: "facebook", label: "Facebook URL" },
  { key: "youtube", label: "YouTube URL" },
  { key: "website", label: "Website" },
  { key: "googleReviewLink", label: "Google review link" },
  { key: "footerCopyright", label: "Footer copyright" },
  { key: "defaultBookingMessage", label: "Default booking / WhatsApp message", textarea: true },
];

function AdminSettings() {
  return (
    <>
      <AdminPageHeader
        title="Site Settings"
        description="Contact details and socials used by every public page."
      />
      <SettingsForm />
      <PasswordForm />
    </>
  );
}

function SettingsForm() {
  const settings = useSiteSettings();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => setForm(settings), [settings]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await updateSettings(form);
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={save} className="mb-12">
      <div className="grid gap-4 md:grid-cols-2">
        {FIELDS.map((f) => (
          <AdminField
            key={f.key}
            label={f.label}
            className={f.textarea ? "md:col-span-2" : undefined}
          >
            {f.textarea ? (
              <textarea
                className={`${adminInput} min-h-24`}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            ) : (
              <input
                className={adminInput}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            )}
          </AdminField>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-3">
        <AdminButton type="submit" disabled={saving}>
          <Save size={14} /> {saving ? "Saving…" : "Save settings"}
        </AdminButton>
        {saved && <span className="text-sm text-emerald-300">Settings saved.</span>}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </form>
  );
}

function PasswordForm() {
  const [current, setCurrent] = useState("");
  const [next, setNext] = useState("");
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setMessage("");
    if (next.length < 8) return setError("Use at least 8 characters.");
    if (next !== confirm) return setError("The two new passwords do not match.");

    setBusy(true);
    try {
      await changePassword(current, next);
      setMessage("Password updated. Use it the next time you sign in.");
      setCurrent("");
      setNext("");
      setConfirm("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not change the password.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="border-t border-border pt-8">
      <h2 className="font-display text-xl">Admin password</h2>
      <p className="mt-1 mb-5 text-sm text-muted-foreground">
        Change the password used to sign in to this panel.
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        <AdminField label="Current password">
          <input
            type="password"
            className={adminInput}
            value={current}
            autoComplete="current-password"
            onChange={(e) => setCurrent(e.target.value)}
          />
        </AdminField>
        <AdminField label="New password (min 8 characters)">
          <input
            type="password"
            className={adminInput}
            value={next}
            autoComplete="new-password"
            onChange={(e) => setNext(e.target.value)}
          />
        </AdminField>
        <AdminField label="Confirm new password">
          <input
            type="password"
            className={adminInput}
            value={confirm}
            autoComplete="new-password"
            onChange={(e) => setConfirm(e.target.value)}
          />
        </AdminField>
      </div>

      <div className="mt-5 flex items-center gap-3">
        <AdminButton type="submit" variant="outline" disabled={busy || !current || !next}>
          <KeyRound size={14} /> {busy ? "Updating…" : "Change password"}
        </AdminButton>
        {message && <span className="text-sm text-emerald-300">{message}</span>}
        {error && <span className="text-sm text-destructive">{error}</span>}
      </div>
    </form>
  );
}

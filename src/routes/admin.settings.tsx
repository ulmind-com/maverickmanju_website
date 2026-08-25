import { createFileRoute } from "@tanstack/react-router";
import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { AdminButton, AdminField, AdminPageHeader, adminInput } from "@/components/admin/ui";
import { useSiteSettings } from "@/hooks/useSiteSettings";
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
  const settings = useSiteSettings();
  const [form, setForm] = useState<SiteSettings>(settings);
  const [saved, setSaved] = useState(false);

  useEffect(() => setForm(settings), [settings]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    await updateSettings(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <form onSubmit={save}>
      <AdminPageHeader
        title="Site Settings"
        description="These values are read by every public page through siteService.getSettings()."
        actions={
          <AdminButton type="submit">
            <Save size={14} /> Save settings
          </AdminButton>
        }
      />

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

      {saved && <p className="mt-4 text-sm text-emerald-300">Settings saved.</p>}
    </form>
  );
}

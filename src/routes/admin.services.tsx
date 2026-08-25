import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminButton,
  AdminField,
  AdminModal,
  AdminPageHeader,
  FileUploader,
  adminInput,
  adminLabel,
} from "@/components/admin/ui";
import { useServiceData } from "@/hooks/useServiceData";
import {
  PACKAGES_KEY,
  createPackage,
  deletePackage,
  getPackages,
  updatePackage,
} from "@/services/packageService";
import {
  SERVICE_IMAGES_KEY,
  getServiceImages,
  setServiceImage,
} from "@/services/serviceImageService";
import type { EventPackage, EventPackageInput, ServiceImage } from "@/types";

export const Route = createFileRoute("/admin/services")({
  head: () => ({
    meta: [
      { title: "Services & Packages | Maverick Manju Admin" },
      {
        name: "description",
        content: "Swap the core performance images and manage the event packages.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminShell>
      <AdminServices />
    </AdminShell>
  ),
});

function AdminServices() {
  return (
    <>
      <AdminPageHeader
        title="Services & Packages"
        description="Swap the four core performance images, and add or edit the event packages shown under Formats by occasion."
      />
      <CoreImages />
      <Packages />
    </>
  );
}

/* ---------------------------------------------------------------- core four */

function CoreImages() {
  const { data: images, error } = useServiceData<ServiceImage[]>(
    SERVICE_IMAGES_KEY,
    getServiceImages,
    [],
  );
  const [saved, setSaved] = useState<string | null>(null);
  const [failed, setFailed] = useState<string | null>(null);

  async function apply(slug: string, url: string, publicId: string) {
    setFailed(null);
    try {
      await setServiceImage(slug, url, publicId);
      setSaved(slug);
      setTimeout(() => setSaved((s) => (s === slug ? null : s)), 2500);
    } catch (err) {
      setFailed(err instanceof Error ? err.message : "Could not update the image.");
    }
  }

  return (
    <section className="mb-12">
      <h2 className="font-display text-xl">Core performance images</h2>
      <p className="mt-1 mb-5 text-sm text-muted-foreground">
        The copy for these four sections is fixed. Upload a new image and the services page updates
        immediately.
      </p>

      {error && <p className="mb-4 text-sm text-destructive">{error}</p>}
      {failed && <p className="mb-4 text-sm text-destructive">{failed}</p>}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {images.map((image) => (
          <div key={image.slug} className="card-mm flex flex-col p-4">
            <p className={adminLabel}>{image.label}</p>
            <img
              src={image.imageUrl}
              alt={image.title}
              className="mt-3 h-40 w-full border border-border object-cover"
            />
            <div className="mt-4">
              <FileUploader
                label="Replace image"
                accept="image/*"
                folder="services"
                onChange={(result) => apply(image.slug, result.url, result.publicId)}
                hint="The previous upload is deleted from Cloudinary."
              />
            </div>
            {saved === image.slug && (
              <p className="mt-2 text-xs text-emerald-300">Image updated.</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- event packages */

const emptyPackage = (): EventPackageInput => ({
  title: "",
  shortDescription: "",
  fullDescription: "",
  highlights: [],
  imageUrl: "",
  publicId: "",
  ctaLabel: "Enquire Now",
  ctaLink: "/book",
  status: "published",
  sortOrder: 0,
});

function Packages() {
  const {
    data: packages,
    loading,
    error,
  } = useServiceData<EventPackage[]>(PACKAGES_KEY, getPackages, []);
  const [draft, setDraft] = useState<EventPackageInput | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [highlightsText, setHighlightsText] = useState("");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  function openNew() {
    setEditingId(null);
    setSaveError("");
    setHighlightsText("");
    setDraft(emptyPackage());
  }

  function openEdit(p: EventPackage) {
    setEditingId(p.id);
    setSaveError("");
    setHighlightsText(p.highlights.join("\n"));
    const { id: _id, createdAt: _c, ...rest } = p;
    setDraft(rest);
  }

  async function save() {
    if (!draft) return;
    const payload: EventPackageInput = {
      ...draft,
      highlights: highlightsText
        .split("\n")
        .map((h) => h.trim())
        .filter(Boolean),
    };
    setSaving(true);
    setSaveError("");
    try {
      if (editingId) await updatePackage(editingId, payload);
      else await createPackage(payload);
      setDraft(null);
      setEditingId(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Could not save this package.");
    } finally {
      setSaving(false);
    }
  }

  function remove(p: EventPackage) {
    if (!window.confirm(`Delete “${p.title}”? This cannot be undone.`)) return;
    void deletePackage(p.id);
  }

  return (
    <section>
      <div className="mb-5 flex flex-col gap-3 border-t border-border pt-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-xl">Event packages</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Every field on these cards is editable — add as many packages as you need.
          </p>
        </div>
        <AdminButton onClick={openNew}>
          <Plus size={14} /> Add package
        </AdminButton>
      </div>

      {error && (
        <p className="mb-5 border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="space-y-4">
        {packages.map((p) => (
          <article key={p.id} className="card-mm grid gap-5 p-5 md:grid-cols-[200px_1fr]">
            {p.imageUrl ? (
              <img
                src={p.imageUrl}
                alt={p.title}
                className="h-36 w-full border border-border object-cover md:h-full"
              />
            ) : (
              <div className="grid h-36 place-items-center border border-dashed border-border text-xs text-muted-foreground">
                No image
              </div>
            )}
            <div className="min-w-0">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="font-display text-xl">{p.title}</h3>
                  <p className="text-sm text-primary-glow">{p.shortDescription}</p>
                </div>
                <span className="text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {p.status} • #{p.sortOrder}
                </span>
              </div>
              <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">{p.fullDescription}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.highlights.map((h) => (
                  <span
                    key={h}
                    className="border border-border px-2 py-1 text-[10px] tracking-[0.1em] text-muted-foreground uppercase"
                  >
                    {h}
                  </span>
                ))}
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <AdminButton
                  variant="outline"
                  onClick={() =>
                    updatePackage(p.id, {
                      status: p.status === "published" ? "draft" : "published",
                    })
                  }
                >
                  {p.status === "published" ? "Unpublish" : "Publish"}
                </AdminButton>
                <AdminButton variant="outline" onClick={() => openEdit(p)}>
                  Edit
                </AdminButton>
                <AdminButton variant="danger" onClick={() => remove(p)}>
                  Delete
                </AdminButton>
              </div>
            </div>
          </article>
        ))}
      </div>

      {!loading && packages.length === 0 && (
        <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No event packages yet.
        </p>
      )}

      {draft && (
        <AdminModal
          title={editingId ? "Edit package" : "Add package"}
          onClose={() => setDraft(null)}
          wide
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Title *" className="sm:col-span-2">
              <input
                className={adminInput}
                value={draft.title}
                placeholder="Corporate Entertainment"
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </AdminField>
            <AdminField label="Short description (red line)" className="sm:col-span-2">
              <input
                className={adminInput}
                value={draft.shortDescription}
                placeholder="Annual days, award nights, conferences and dealer meets."
                onChange={(e) => setDraft({ ...draft, shortDescription: e.target.value })}
              />
            </AdminField>
            <AdminField label="Full description" className="sm:col-span-2">
              <textarea
                className={`${adminInput} min-h-24`}
                value={draft.fullDescription}
                onChange={(e) => setDraft({ ...draft, fullDescription: e.target.value })}
              />
            </AdminField>
            <AdminField label="Highlight tags — one per line" className="sm:col-span-2">
              <textarea
                className={`${adminInput} min-h-28`}
                value={highlightsText}
                placeholder={"Annual days\nAward nights\nConferences"}
                onChange={(e) => setHighlightsText(e.target.value)}
              />
            </AdminField>

            <div className="sm:col-span-2">
              <FileUploader
                label="Package image"
                accept="image/*"
                folder="packages"
                value={draft.imageUrl}
                onChange={(result) =>
                  setDraft({ ...draft, imageUrl: result.url, publicId: result.publicId })
                }
                onClear={() => setDraft({ ...draft, imageUrl: "", publicId: "" })}
              />
            </div>

            <AdminField label="Button label">
              <input
                className={adminInput}
                value={draft.ctaLabel}
                onChange={(e) => setDraft({ ...draft, ctaLabel: e.target.value })}
              />
            </AdminField>
            <AdminField label="Button link">
              <input
                className={adminInput}
                value={draft.ctaLink}
                placeholder="/book"
                onChange={(e) => setDraft({ ...draft, ctaLink: e.target.value })}
              />
            </AdminField>
            <AdminField label="Sort order (lower shows first)">
              <input
                type="number"
                className={adminInput}
                value={draft.sortOrder}
                onChange={(e) => setDraft({ ...draft, sortOrder: Number(e.target.value) })}
              />
            </AdminField>
            <AdminField label="Status">
              <select
                className={adminInput}
                value={draft.status}
                onChange={(e) =>
                  setDraft({ ...draft, status: e.target.value as EventPackage["status"] })
                }
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </AdminField>
          </div>

          {saveError && <p className="mt-4 text-sm text-destructive">{saveError}</p>}

          <div className="mt-6 flex justify-end gap-2">
            <AdminButton variant="outline" onClick={() => setDraft(null)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={save} disabled={saving || !draft.title.trim()}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Add package"}
            </AdminButton>
          </div>
        </AdminModal>
      )}
    </section>
  );
}

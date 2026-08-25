import { createFileRoute } from "@tanstack/react-router";
import { MessageSquareQuote, Video } from "lucide-react";
import { useMemo, useState } from "react";
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
import { TestimonialCard } from "@/components/site/TestimonialCard";
import { useServiceData } from "@/hooks/useServiceData";
import {
  TESTIMONIALS_KEY,
  createTestimonial,
  deleteTestimonial,
  getTestimonials,
  updateTestimonial,
} from "@/services/testimonialService";
import {
  TESTIMONIAL_CATEGORIES,
  type Testimonial,
  type TestimonialCategory,
  type TestimonialInput,
} from "@/types";

export const Route = createFileRoute("/admin/testimonials")({
  head: () => ({
    meta: [
      { title: "Testimonials Management | Maverick Manju Admin" },
      { name: "description", content: "Add, publish and order client testimonials." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminShell>
      <AdminTestimonials />
    </AdminShell>
  ),
});

const emptyDraft = (): TestimonialInput => ({
  category: "Corporates",
  clientName: "",
  company: "",
  role: "",
  eventType: "",
  rating: 5,
  text: "",
  photoUrl: "",
  videoUrl: "",
  publicId: "",
  photoPublicId: "",
  status: "published",
  sortOrder: 0,
});

function AdminTestimonials() {
  const {
    data: items,
    loading,
    error,
  } = useServiceData<Testimonial[]>(TESTIMONIALS_KEY, getTestimonials, []);
  const [draft, setDraft] = useState<TestimonialInput | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [categoryFilter, setCategoryFilter] = useState<"all" | TestimonialCategory>("all");
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  const visible = useMemo(
    () =>
      items.filter(
        (t) =>
          (statusFilter === "all" || t.status === statusFilter) &&
          (categoryFilter === "all" || t.category === categoryFilter) &&
          `${t.clientName} ${t.company} ${t.eventType} ${t.text}`
            .toLowerCase()
            .includes(search.toLowerCase()),
      ),
    [items, search, statusFilter, categoryFilter],
  );

  /** Counts per heading, so it is obvious which category is still empty. */
  const counts = useMemo(
    () =>
      TESTIMONIAL_CATEGORIES.map((category) => ({
        category,
        total: items.filter((t) => t.category === category).length,
        published: items.filter((t) => t.category === category && t.status === "published").length,
      })),
    [items],
  );

  function openNew(kind: "text" | "video") {
    setEditingId(null);
    setSaveError("");
    setDraft(kind === "video" ? { ...emptyDraft(), rating: 0 } : emptyDraft());
  }

  function openEdit(t: Testimonial) {
    setEditingId(t.id);
    setSaveError("");
    const { id: _id, createdAt: _c, ...rest } = t;
    setDraft(rest);
  }

  async function save() {
    if (!draft) return;
    setSaving(true);
    setSaveError("");
    try {
      if (editingId) await updateTestimonial(editingId, draft);
      else await createTestimonial(draft);
      setDraft(null);
      setEditingId(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Could not save this testimonial.");
    } finally {
      setSaving(false);
    }
  }

  function remove(t: Testimonial) {
    const name = t.clientName || "this testimonial";
    if (!window.confirm(`Delete ${name}? Uploaded media is removed from Cloudinary too.`)) return;
    void deleteTestimonial(t.id);
  }

  // A testimonial needs either words or a video to be worth publishing.
  const canSave = Boolean(draft && (draft.text.trim() || draft.videoUrl));

  return (
    <>
      <AdminPageHeader
        title="Testimonials"
        description="Written or video. The category you pick decides which heading the testimonial appears under on the public page."
        actions={
          <>
            <AdminButton onClick={() => openNew("text")}>
              <MessageSquareQuote size={14} /> Add written
            </AdminButton>
            <AdminButton variant="outline" onClick={() => openNew("video")}>
              <Video size={14} /> Add video
            </AdminButton>
          </>
        }
      />

      {error && (
        <p className="mb-5 border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mb-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {counts.map((c) => (
          <button
            key={c.category}
            type="button"
            onClick={() =>
              setCategoryFilter((current) => (current === c.category ? "all" : c.category))
            }
            className={`card-mm p-4 text-left transition-colors ${
              categoryFilter === c.category ? "border-primary" : "hover:border-primary/50"
            }`}
          >
            <p className={adminLabel}>{c.category}</p>
            <p className="mt-2 font-display text-2xl">{c.total}</p>
            <p className="text-[11px] text-muted-foreground">{c.published} published</p>
          </button>
        ))}
      </div>

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <input
          className={adminInput}
          placeholder="Search name, company, text…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={adminInput}
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value as typeof categoryFilter)}
        >
          <option value="all">All categories</option>
          {TESTIMONIAL_CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          className={adminInput}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((t) => (
          <div key={t.id} className="card-mm flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-display text-lg">
                  {t.clientName || (t.videoUrl ? "Video testimonial" : "Untitled")}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  {[t.role, t.company, t.eventType].filter(Boolean).join(" • ") || "—"}
                </p>
              </div>
              <span className="shrink-0 border border-primary/40 px-2 py-1 text-[10px] tracking-[0.12em] text-primary uppercase">
                {t.category}
              </span>
            </div>

            {t.videoUrl && (
              <video
                src={t.videoUrl}
                controls
                preload="none"
                {...(t.photoUrl ? { poster: t.photoUrl } : {})}
                className="mt-3 w-full border border-border"
              />
            )}
            {t.text && (
              <p className="mt-3 line-clamp-4 flex-1 text-sm text-muted-foreground">“{t.text}”</p>
            )}
            {t.rating > 0 && (
              <p className="mt-3 text-xs text-[var(--star)]">{"★".repeat(t.rating)}</p>
            )}

            <div className="mt-4 flex flex-wrap gap-2">
              <AdminButton
                variant="outline"
                onClick={() =>
                  updateTestimonial(t.id, {
                    status: t.status === "published" ? "draft" : "published",
                  })
                }
              >
                {t.status === "published" ? "Unpublish" : "Publish"}
              </AdminButton>
              <AdminButton variant="outline" onClick={() => openEdit(t)}>
                Edit
              </AdminButton>
              <AdminButton variant="danger" onClick={() => remove(t)}>
                Delete
              </AdminButton>
            </div>
          </div>
        ))}
      </div>

      {!loading && visible.length === 0 && (
        <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          {items.length === 0
            ? "No testimonials yet — add a written or video testimonial."
            : "No testimonials match your filters."}
        </p>
      )}

      {draft && (
        <AdminModal
          title={editingId ? "Edit testimonial" : "Add testimonial"}
          onClose={() => setDraft(null)}
          wide
        >
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="grid gap-4 sm:grid-cols-2">
              <AdminField label="Category *" className="sm:col-span-2">
                <select
                  className={adminInput}
                  value={draft.category}
                  onChange={(e) =>
                    setDraft({ ...draft, category: e.target.value as TestimonialCategory })
                  }
                >
                  {TESTIMONIAL_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Client name (optional)">
                <input
                  className={adminInput}
                  value={draft.clientName}
                  onChange={(e) => setDraft({ ...draft, clientName: e.target.value })}
                />
              </AdminField>
              <AdminField label="Company (optional)">
                <input
                  className={adminInput}
                  value={draft.company}
                  onChange={(e) => setDraft({ ...draft, company: e.target.value })}
                />
              </AdminField>
              <AdminField label="Role (optional)">
                <input
                  className={adminInput}
                  value={draft.role}
                  onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                />
              </AdminField>
              <AdminField label="Event type (optional)">
                <input
                  className={adminInput}
                  value={draft.eventType}
                  onChange={(e) => setDraft({ ...draft, eventType: e.target.value })}
                />
              </AdminField>
              <AdminField label="Rating">
                <select
                  className={adminInput}
                  value={draft.rating}
                  onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
                >
                  <option value={0}>No stars</option>
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} star{r > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Sort order (lower shows first)">
                <input
                  type="number"
                  className={adminInput}
                  value={draft.sortOrder}
                  onChange={(e) => setDraft({ ...draft, sortOrder: Number(e.target.value) })}
                />
              </AdminField>
              <AdminField
                label="Testimonial text (optional if a video is added)"
                className="sm:col-span-2"
              >
                <textarea
                  className={`${adminInput} min-h-28`}
                  value={draft.text}
                  onChange={(e) => setDraft({ ...draft, text: e.target.value })}
                />
              </AdminField>

              <FileUploader
                label="Profile photo (optional)"
                accept="image/*"
                folder="testimonials"
                value={draft.photoUrl}
                onChange={(result) =>
                  setDraft({ ...draft, photoUrl: result.url, photoPublicId: result.publicId })
                }
                onClear={() => setDraft({ ...draft, photoUrl: "", photoPublicId: "" })}
              />
              <FileUploader
                label="Video testimonial (optional)"
                accept="video/*"
                folder="testimonials"
                value={draft.videoUrl}
                onChange={(result) =>
                  setDraft({ ...draft, videoUrl: result.url, publicId: result.publicId })
                }
                onClear={() => setDraft({ ...draft, videoUrl: "", publicId: "" })}
              />

              <AdminField label="Status">
                <select
                  className={adminInput}
                  value={draft.status}
                  onChange={(e) =>
                    setDraft({ ...draft, status: e.target.value as Testimonial["status"] })
                  }
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </AdminField>
            </div>

            <div>
              <p className="mb-2 text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                Live preview
              </p>
              <TestimonialCard
                testimonial={{ ...draft, id: "preview", createdAt: new Date().toISOString() }}
              />
            </div>
          </div>

          {saveError && <p className="mt-4 text-sm text-destructive">{saveError}</p>}

          <div className="mt-6 flex justify-end gap-2">
            <AdminButton variant="outline" onClick={() => setDraft(null)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={save} disabled={saving || !canSave}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Add testimonial"}
            </AdminButton>
          </div>
          {!canSave && (
            <p className="mt-2 text-right text-[11px] text-muted-foreground">
              Add testimonial text or upload a video to save.
            </p>
          )}
        </AdminModal>
      )}
    </>
  );
}

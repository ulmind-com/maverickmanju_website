import { createFileRoute } from "@tanstack/react-router";
import { Plus, Star } from "lucide-react";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminButton,
  AdminField,
  AdminModal,
  AdminPageHeader,
  FileUploader,
  adminInput,
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
import type { Testimonial } from "@/types";

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

type Draft = Omit<Testimonial, "id" | "createdAt">;

const emptyDraft = (sortOrder: number): Draft => ({
  clientName: "",
  company: "",
  role: "",
  eventType: "",
  rating: 5,
  text: "",
  photoUrl: "",
  videoUrl: "",
  featured: false,
  status: "published",
  sortOrder,
});

function AdminTestimonials() {
  const { data: items } = useServiceData<Testimonial[]>(TESTIMONIALS_KEY, getTestimonials, []);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [sortBy, setSortBy] = useState<"order" | "newest" | "rating">("order");

  const visible = useMemo(() => {
    let list = items.filter(
      (t) =>
        (statusFilter === "all" || t.status === statusFilter) &&
        `${t.clientName} ${t.company ?? ""} ${t.eventType ?? ""} ${t.text}`
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
    if (sortBy === "newest")
      list = [...list].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [items, search, statusFilter, sortBy]);

  async function save() {
    if (!draft) return;
    if (editingId) await updateTestimonial(editingId, draft);
    else await createTestimonial(draft);
    setDraft(null);
    setEditingId(null);
  }

  return (
    <>
      <AdminPageHeader
        title="Testimonials"
        description="Only published testimonials render on the public site."
        actions={
          <AdminButton
            onClick={() => {
              setEditingId(null);
              setDraft(emptyDraft(items.length + 1));
            }}
          >
            <Plus size={14} /> Add testimonial
          </AdminButton>
        }
      />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <input
          className={adminInput}
          placeholder="Search name, company, text…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className={adminInput}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
        >
          <option value="all">All statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select
          className={adminInput}
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
        >
          <option value="order">Sort: display order</option>
          <option value="newest">Sort: newest</option>
          <option value="rating">Sort: rating</option>
        </select>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visible.map((t) => (
          <div key={t.id} className="card-mm flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="truncate font-display text-lg">{t.clientName}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {[t.role, t.company, t.eventType].filter(Boolean).join(" • ") || "—"}
                </p>
              </div>
              <button
                type="button"
                aria-label="Toggle featured"
                onClick={() => updateTestimonial(t.id, { featured: !t.featured })}
                className={t.featured ? "text-[var(--star)]" : "text-muted-foreground/40"}
              >
                <Star size={16} fill={t.featured ? "currentColor" : "none"} />
              </button>
            </div>
            <p className="mt-3 line-clamp-4 flex-1 text-sm text-muted-foreground">“{t.text}”</p>
            <p className="mt-3 text-xs text-[var(--star)]">{"★".repeat(t.rating)}</p>
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
              <AdminButton
                variant="outline"
                onClick={() => {
                  setEditingId(t.id);
                  const { id: _id, createdAt: _c, ...rest } = t;
                  setDraft(rest);
                }}
              >
                Edit
              </AdminButton>
              <AdminButton variant="danger" onClick={() => deleteTestimonial(t.id)}>
                Delete
              </AdminButton>
            </div>
          </div>
        ))}
      </div>

      {visible.length === 0 && (
        <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No testimonials match your filters.
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
              <AdminField label="Client name">
                <input
                  className={adminInput}
                  value={draft.clientName}
                  onChange={(e) => setDraft({ ...draft, clientName: e.target.value })}
                />
              </AdminField>
              <AdminField label="Company">
                <input
                  className={adminInput}
                  value={draft.company ?? ""}
                  onChange={(e) => setDraft({ ...draft, company: e.target.value })}
                />
              </AdminField>
              <AdminField label="Role">
                <input
                  className={adminInput}
                  value={draft.role ?? ""}
                  onChange={(e) => setDraft({ ...draft, role: e.target.value })}
                />
              </AdminField>
              <AdminField label="Event type">
                <input
                  className={adminInput}
                  value={draft.eventType ?? ""}
                  onChange={(e) => setDraft({ ...draft, eventType: e.target.value })}
                />
              </AdminField>
              <AdminField label="Rating">
                <select
                  className={adminInput}
                  value={draft.rating}
                  onChange={(e) => setDraft({ ...draft, rating: Number(e.target.value) })}
                >
                  {[5, 4, 3, 2, 1].map((r) => (
                    <option key={r} value={r}>
                      {r} star{r > 1 ? "s" : ""}
                    </option>
                  ))}
                </select>
              </AdminField>
              <AdminField label="Display order">
                <input
                  type="number"
                  className={adminInput}
                  value={draft.sortOrder}
                  onChange={(e) => setDraft({ ...draft, sortOrder: Number(e.target.value) })}
                />
              </AdminField>
              <AdminField label="Testimonial" className="sm:col-span-2">
                <textarea
                  className={`${adminInput} min-h-28`}
                  value={draft.text}
                  onChange={(e) => setDraft({ ...draft, text: e.target.value })}
                />
              </AdminField>
              <FileUploader
                label="Client photo"
                accept="image/*"
                value={draft.photoUrl}
                onChange={(url) => setDraft({ ...draft, photoUrl: url })}
              />
              <FileUploader
                label="Video testimonial (optional)"
                accept="video/*"
                onChange={(url) => setDraft({ ...draft, videoUrl: url })}
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
              <label className="mt-6 flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={draft.featured}
                  onChange={(e) => setDraft({ ...draft, featured: e.target.checked })}
                  className="accent-[var(--primary)]"
                />
                Featured
              </label>
            </div>

            <div>
              <p className="mb-2 text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                Live preview
              </p>
              <TestimonialCard
                testimonial={{
                  ...draft,
                  id: "preview",
                  createdAt: new Date().toISOString(),
                  clientName: draft.clientName || "Client name",
                  text: draft.text || "Testimonial text will appear here.",
                }}
                featured={draft.featured}
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <AdminButton variant="outline" onClick={() => setDraft(null)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={save} disabled={!draft.clientName || !draft.text}>
              {editingId ? "Save changes" : "Add testimonial"}
            </AdminButton>
          </div>
        </AdminModal>
      )}
    </>
  );
}

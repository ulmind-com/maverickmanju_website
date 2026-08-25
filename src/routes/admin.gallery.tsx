import { createFileRoute } from "@tanstack/react-router";
import { Eye, Film, ImagePlus, Pencil, Star, Trash2 } from "lucide-react";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import {
  AdminButton,
  AdminField,
  AdminModal,
  AdminPageHeader,
  FileUploader,
  adminInput,
} from "@/components/admin/ui";
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { useServiceData } from "@/hooks/useServiceData";
import {
  GALLERY_KEY,
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItems,
  updateGalleryItem,
} from "@/services/galleryService";
import { GALLERY_CATEGORIES, type GalleryItem, type MediaType } from "@/types";

export const Route = createFileRoute("/admin/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery Management | Maverick Manju Admin" },
      { name: "description", content: "Add, edit and publish gallery images and videos." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: () => (
    <AdminShell>
      <AdminGallery />
    </AdminShell>
  ),
});

type Draft = Omit<GalleryItem, "id" | "createdAt">;

const emptyDraft = (type: MediaType, sortOrder: number): Draft => ({
  type,
  title: "",
  description: "",
  mediaUrl: "",
  thumbnailUrl: "",
  category: "Stage Magic",
  featured: false,
  status: "published",
  layout: "medium",
  sortOrder,
});

function AdminGallery() {
  const { data: items } = useServiceData<GalleryItem[]>(GALLERY_KEY, getGalleryItems, []);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [preview, setPreview] = useState<number | null>(null);

  const openNew = (type: MediaType) => {
    setEditingId(null);
    setDraft(emptyDraft(type, items.length + 1));
  };

  const openEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    const { id: _id, createdAt: _createdAt, ...rest } = item;
    setDraft(rest);
  };

  async function save() {
    if (!draft) return;
    if (editingId) await updateGalleryItem(editingId, draft);
    else await createGalleryItem(draft);
    setDraft(null);
    setEditingId(null);
  }

  return (
    <>
      <AdminPageHeader
        title="Gallery Management"
        description="Items marked published appear on the public gallery immediately."
        actions={
          <>
            <AdminButton onClick={() => openNew("image")}>
              <ImagePlus size={14} /> Add Image
            </AdminButton>
            <AdminButton variant="outline" onClick={() => openNew("video")}>
              <Film size={14} /> Add Video
            </AdminButton>
          </>
        }
      />

      {/* Desktop table */}
      <div className="hidden overflow-hidden border border-border lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0b0b0d] text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            <tr>
              {["Thumb", "Type", "Title", "Category", "Featured", "Status", "Order", "Created", "Actions"].map(
                (h) => (
                  <th key={h} className="px-3 py-3 font-bold">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((item, i) => (
              <tr key={item.id} className="border-t border-border hover:bg-card/60">
                <td className="px-3 py-2">
                  <img
                    src={item.thumbnailUrl || item.mediaUrl}
                    alt=""
                    loading="lazy"
                    className="h-11 w-16 border border-border object-cover"
                  />
                </td>
                <td className="px-3 py-2 text-xs uppercase">{item.type}</td>
                <td className="max-w-[220px] truncate px-3 py-2">{item.title}</td>
                <td className="px-3 py-2 text-xs text-muted-foreground">{item.category}</td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() => updateGalleryItem(item.id, { featured: !item.featured })}
                    aria-label="Toggle featured"
                    className={item.featured ? "text-[var(--star)]" : "text-muted-foreground/40"}
                  >
                    <Star size={16} fill={item.featured ? "currentColor" : "none"} />
                  </button>
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    onClick={() =>
                      updateGalleryItem(item.id, {
                        status: item.status === "published" ? "draft" : "published",
                      })
                    }
                    className={`border px-2 py-1 text-[10px] tracking-[0.14em] uppercase ${
                      item.status === "published"
                        ? "border-emerald-400/60 text-emerald-300"
                        : "border-border text-muted-foreground"
                    }`}
                  >
                    {item.status}
                  </button>
                </td>
                <td className="px-3 py-2 text-xs">{item.sortOrder}</td>
                <td className="px-3 py-2 text-xs text-muted-foreground">
                  {new Date(item.createdAt).toLocaleDateString()}
                </td>
                <td className="px-3 py-2">
                  <div className="flex gap-1">
                    <IconBtn label="Preview" onClick={() => setPreview(i)}>
                      <Eye size={14} />
                    </IconBtn>
                    <IconBtn label="Edit" onClick={() => openEdit(item)}>
                      <Pencil size={14} />
                    </IconBtn>
                    <IconBtn label="Delete" danger onClick={() => deleteGalleryItem(item.id)}>
                      <Trash2 size={14} />
                    </IconBtn>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {items.map((item, i) => (
          <div key={item.id} className="card-mm p-4">
            <div className="flex gap-3">
              <img
                src={item.thumbnailUrl || item.mediaUrl}
                alt=""
                loading="lazy"
                className="h-16 w-24 shrink-0 border border-border object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-display">{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.type.toUpperCase()} • {item.category} • #{item.sortOrder}
                </p>
                <p className="mt-1 text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {item.status}
                  {item.featured && " • featured"}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <AdminButton variant="outline" onClick={() => setPreview(i)}>
                Preview
              </AdminButton>
              <AdminButton variant="outline" onClick={() => openEdit(item)}>
                Edit
              </AdminButton>
              <AdminButton variant="danger" onClick={() => deleteGalleryItem(item.id)}>
                Delete
              </AdminButton>
            </div>
          </div>
        ))}
      </div>

      {items.length === 0 && (
        <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No gallery items yet — add your first image or video.
        </p>
      )}

      {preview !== null && items[preview] && (
        <GalleryLightbox
          items={items}
          index={preview}
          onIndexChange={setPreview}
          onClose={() => setPreview(null)}
        />
      )}

      {draft && (
        <AdminModal
          title={editingId ? "Edit gallery item" : `Add ${draft.type}`}
          onClose={() => setDraft(null)}
          wide
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <AdminField label="Title" className="sm:col-span-2">
              <input
                className={adminInput}
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </AdminField>
            <AdminField label="Description" className="sm:col-span-2">
              <textarea
                className={`${adminInput} min-h-20`}
                value={draft.description ?? ""}
                onChange={(e) => setDraft({ ...draft, description: e.target.value })}
              />
            </AdminField>
            <AdminField label="Media type">
              <select
                className={adminInput}
                value={draft.type}
                onChange={(e) => setDraft({ ...draft, type: e.target.value as MediaType })}
              >
                <option value="image">Image</option>
                <option value="video">Video</option>
              </select>
            </AdminField>
            <AdminField label="Category">
              <select
                className={adminInput}
                value={draft.category}
                onChange={(e) =>
                  setDraft({ ...draft, category: e.target.value as GalleryItem["category"] })
                }
              >
                {GALLERY_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </AdminField>

            <div className="sm:col-span-2">
              <FileUploader
                label={draft.type === "video" ? "Upload video" : "Upload image"}
                accept={draft.type === "video" ? "video/*" : "image/*"}
                onChange={(url) => setDraft({ ...draft, mediaUrl: url })}
              />
            </div>
            <AdminField label="…or paste a media URL" className="sm:col-span-2">
              <input
                className={adminInput}
                value={draft.mediaUrl.startsWith("data:") ? "" : draft.mediaUrl}
                placeholder="https://…"
                onChange={(e) => setDraft({ ...draft, mediaUrl: e.target.value })}
              />
            </AdminField>
            {draft.type === "video" && (
              <div className="sm:col-span-2">
                <FileUploader
                  label="Video thumbnail / poster"
                  accept="image/*"
                  value={draft.thumbnailUrl}
                  onChange={(url) => setDraft({ ...draft, thumbnailUrl: url })}
                />
              </div>
            )}

            <AdminField label="Layout size">
              <select
                className={adminInput}
                value={draft.layout}
                onChange={(e) =>
                  setDraft({ ...draft, layout: e.target.value as GalleryItem["layout"] })
                }
              >
                {["small", "medium", "large", "tall", "wide"].map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Sort order">
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
                  setDraft({ ...draft, status: e.target.value as GalleryItem["status"] })
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
              Featured item
            </label>

            {draft.mediaUrl && (
              <div className="sm:col-span-2">
                <p className="mb-2 text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  Live preview
                </p>
                {draft.type === "video" ? (
                  <video
                    src={draft.mediaUrl}
                    poster={draft.thumbnailUrl}
                    controls
                    className="max-h-64 w-full border border-border"
                  />
                ) : (
                  <img
                    src={draft.mediaUrl}
                    alt="Preview"
                    className="max-h-64 w-full border border-border object-cover"
                  />
                )}
              </div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <AdminButton variant="outline" onClick={() => setDraft(null)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={save} disabled={!draft.title || !draft.mediaUrl}>
              {editingId ? "Save changes" : "Add to gallery"}
            </AdminButton>
          </div>
        </AdminModal>
      )}
    </>
  );
}

function IconBtn({
  children,
  label,
  onClick,
  danger,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`grid h-8 w-8 place-items-center border border-border transition-colors ${
        danger ? "hover:border-destructive hover:text-destructive" : "hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

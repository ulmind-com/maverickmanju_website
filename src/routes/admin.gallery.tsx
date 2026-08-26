import { createFileRoute } from "@tanstack/react-router";
import { Eye, Film, ImagePlus, Pencil, Trash2 } from "lucide-react";
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
import { GalleryLightbox } from "@/components/gallery/GalleryLightbox";
import { useServiceData } from "@/hooks/useServiceData";
import {
  GALLERY_KEY,
  createGalleryItem,
  deleteGalleryItem,
  getGalleryItems,
  updateGalleryItem,
} from "@/services/galleryService";
import {
  GALLERY_CATEGORIES,
  type GalleryCategory,
  type GalleryInput,
  type GalleryItem,
  type MediaType,
} from "@/types";

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

const emptyDraft = (type: MediaType): GalleryInput => ({
  type,
  category: "Stage Magic",
  title: "",
  description: "",
  mediaUrl: "",
  thumbnailUrl: "",
  publicId: "",
  thumbnailPublicId: "",
  layout: "medium",
  status: "published",
  sortOrder: 0,
});

function AdminGallery() {
  const {
    data: items,
    loading,
    error,
  } = useServiceData<GalleryItem[]>(GALLERY_KEY, getGalleryItems, []);
  const [draft, setDraft] = useState<GalleryInput | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<"all" | GalleryCategory>("all");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [preview, setPreview] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const visible = useMemo(
    () => (categoryFilter === "all" ? items : items.filter((i) => i.category === categoryFilter)),
    [items, categoryFilter],
  );

  const openNew = (type: MediaType) => {
    setEditingId(null);
    setSaveError("");
    setDraft(emptyDraft(type));
  };

  const openEdit = (item: GalleryItem) => {
    setEditingId(item.id);
    setSaveError("");
    const { id: _id, createdAt: _createdAt, ...rest } = item;
    setDraft(rest);
  };

  async function save() {
    if (!draft) return;
    setSaving(true);
    setSaveError("");
    try {
      if (editingId) await updateGalleryItem(editingId, draft);
      else await createGalleryItem(draft);
      setDraft(null);
      setEditingId(null);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : "Could not save this item.");
    } finally {
      setSaving(false);
    }
  }

  async function run(id: string, action: () => Promise<unknown>) {
    setBusyId(id);
    try {
      await action();
    } finally {
      setBusyId(null);
    }
  }

  const remove = (item: GalleryItem) => {
    const name = item.title || `this ${item.type}`;
    if (!window.confirm(`Delete ${name}? The file is removed from Cloudinary too.`)) return;
    void run(item.id, () => deleteGalleryItem(item.id));
  };

  const togglePublish = (item: GalleryItem) =>
    void run(item.id, () =>
      updateGalleryItem(item.id, {
        status: item.status === "published" ? "draft" : "published",
      }),
    );

  return (
    <>
      <AdminPageHeader
        title="Gallery"
        description="The category you pick decides which heading the item appears under in Moments of Magic. Items show at the size they were uploaded — add as many as you like."
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

      {error && (
        <p className="mb-5 border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
          {error}
        </p>
      )}

      <div className="mb-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {GALLERY_CATEGORIES.map((c) => {
          const total = items.filter((i) => i.category === c).length;
          return (
            <button
              key={c}
              type="button"
              onClick={() => setCategoryFilter((cur) => (cur === c ? "all" : c))}
              className={`card-mm p-4 text-left transition-colors ${
                categoryFilter === c ? "border-primary" : "hover:border-primary/50"
              }`}
            >
              <p className="text-[10px] font-bold tracking-[0.14em] text-muted-foreground uppercase">
                {c}
              </p>
              <p className="mt-2 font-display text-2xl">{total}</p>
              <p className="text-[11px] text-muted-foreground">
                {items.filter((i) => i.category === c && i.status === "published").length} published
              </p>
            </button>
          );
        })}
        {categoryFilter !== "all" && (
          <AdminButton variant="outline" onClick={() => setCategoryFilter("all")}>
            Show all categories
          </AdminButton>
        )}
      </div>

      {/* Desktop table */}
      <div className="hidden overflow-hidden border border-border lg:block">
        <table className="w-full text-left text-sm">
          <thead className="bg-[#0b0b0d] text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            <tr>
              {["Thumb", "Type", "Category", "Title", "Status", "Order", "Added", "Actions"].map(
                (h) => (
                  <th key={h} className="px-3 py-3 font-bold">
                    {h}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {visible.map((item, i) => (
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
                <td className="px-3 py-2 text-xs whitespace-nowrap text-primary">
                  {item.category}
                </td>
                <td className="max-w-[260px] truncate px-3 py-2">
                  {item.title || <span className="text-muted-foreground">— untitled —</span>}
                </td>
                <td className="px-3 py-2">
                  <button
                    type="button"
                    disabled={busyId === item.id}
                    onClick={() => togglePublish(item)}
                    className={`border px-2 py-1 text-[10px] tracking-[0.14em] uppercase disabled:opacity-50 ${
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
                    <IconBtn label="Delete" danger onClick={() => remove(item)}>
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
        {visible.map((item, i) => (
          <div key={item.id} className="card-mm p-4">
            <div className="flex gap-3">
              <img
                src={item.thumbnailUrl || item.mediaUrl}
                alt=""
                loading="lazy"
                className="h-16 w-24 shrink-0 border border-border object-cover"
              />
              <div className="min-w-0">
                <p className="truncate font-display">{item.title || "— untitled —"}</p>
                <p className="text-xs text-muted-foreground">
                  {item.type.toUpperCase()} • {item.category} • #{item.sortOrder}
                </p>
                <p className="mt-1 text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  {item.status}
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
              <AdminButton variant="danger" onClick={() => remove(item)}>
                Delete
              </AdminButton>
            </div>
          </div>
        ))}
      </div>

      {!loading && visible.length === 0 && (
        <p className="border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          {items.length === 0
            ? "No gallery items yet — add your first image or video."
            : `Nothing in ${categoryFilter} yet.`}
        </p>
      )}

      {preview !== null && visible[preview] && (
        <GalleryLightbox
          items={visible}
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
            <AdminField label="Category *" className="sm:col-span-2">
              <select
                className={adminInput}
                value={draft.category}
                onChange={(e) =>
                  setDraft({ ...draft, category: e.target.value as GalleryCategory })
                }
              >
                {GALLERY_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </AdminField>
            <AdminField label="Title (optional)" className="sm:col-span-2">
              <input
                className={adminInput}
                value={draft.title}
                placeholder="Leave blank to show the media on its own"
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
            </AdminField>
            <AdminField label="Description (optional)" className="sm:col-span-2">
              <textarea
                className={`${adminInput} min-h-20`}
                value={draft.description}
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

            <div className="sm:col-span-2">
              <FileUploader
                label={draft.type === "video" ? "Upload video *" : "Upload image *"}
                accept={draft.type === "video" ? "video/*" : "image/*"}
                folder="gallery"
                onChange={(result) =>
                  setDraft({
                    ...draft,
                    type: result.type,
                    mediaUrl: result.url,
                    publicId: result.publicId,
                    ...(result.type === "video" ? { thumbnailUrl: result.thumbnailUrl } : {}),
                  })
                }
              />
            </div>
            <AdminField label="…or paste a media URL" className="sm:col-span-2">
              <input
                className={adminInput}
                value={draft.mediaUrl}
                placeholder="https://…"
                onChange={(e) => setDraft({ ...draft, mediaUrl: e.target.value, publicId: "" })}
              />
            </AdminField>
            {draft.type === "video" && (
              <div className="sm:col-span-2">
                <FileUploader
                  label="Video thumbnail / poster (optional)"
                  accept="image/*"
                  folder="gallery/posters"
                  value={draft.thumbnailUrl}
                  onChange={(result) =>
                    setDraft({
                      ...draft,
                      thumbnailUrl: result.url,
                      thumbnailPublicId: result.publicId,
                    })
                  }
                  onClear={() => setDraft({ ...draft, thumbnailUrl: "", thumbnailPublicId: "" })}
                  hint="Left blank, Cloudinary uses the first frame of the video."
                />
              </div>
            )}

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
                  setDraft({ ...draft, status: e.target.value as GalleryItem["status"] })
                }
              >
                <option value="published">Published</option>
                <option value="draft">Draft</option>
              </select>
            </AdminField>

            {draft.mediaUrl && (
              <div className="sm:col-span-2">
                <p className="mb-2 text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                  Live preview
                </p>
                {draft.type === "video" ? (
                  <video
                    src={draft.mediaUrl}
                    {...(draft.thumbnailUrl ? { poster: draft.thumbnailUrl } : {})}
                    controls
                    preload="metadata"
                    className="max-h-64 w-auto border border-border"
                  />
                ) : (
                  <img
                    src={draft.mediaUrl}
                    alt="Preview"
                    className="max-h-64 w-auto border border-border object-contain"
                  />
                )}
              </div>
            )}
          </div>

          {saveError && <p className="mt-4 text-sm text-destructive">{saveError}</p>}

          <div className="mt-6 flex justify-end gap-2">
            <AdminButton variant="outline" onClick={() => setDraft(null)}>
              Cancel
            </AdminButton>
            <AdminButton onClick={save} disabled={saving || !draft.mediaUrl}>
              {saving ? "Saving…" : editingId ? "Save changes" : "Add to gallery"}
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
        danger
          ? "hover:border-destructive hover:text-destructive"
          : "hover:border-primary hover:text-primary"
      }`}
    >
      {children}
    </button>
  );
}

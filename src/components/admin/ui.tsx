import { X } from "lucide-react";
import { useEffect, type ReactNode } from "react";
import { fileToDataUrl } from "@/services/storage";
import type { BookingStatus } from "@/types";
import { cn } from "@/lib/utils";

export const adminInput =
  "w-full border border-input bg-[#09090b] px-3 py-2.5 text-sm text-foreground outline-none transition-colors focus:border-primary";
export const adminLabel =
  "text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground";

export function AdminField({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <label className={cn("flex flex-col gap-1.5", className)}>
      <span className={adminLabel}>{label}</span>
      {children}
    </label>
  );
}

export function StatsCard({
  label,
  value,
  icon,
  accent,
}: {
  label: string;
  value: number | string;
  icon: ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "card-mm p-5",
        accent && "border-t-2 border-t-primary bg-gradient-to-b from-accent/40 to-card",
      )}
    >
      <div className="flex items-start justify-between">
        <p className={adminLabel}>{label}</p>
        <span className="text-primary">{icon}</span>
      </div>
      <p className="mt-3 font-display text-3xl">{value}</p>
    </div>
  );
}

export function AdminModal({
  title,
  onClose,
  children,
  wide,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
  wide?: boolean;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[90] flex items-start justify-center overflow-y-auto bg-black/80 p-4 backdrop-blur-sm sm:p-8">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={cn("w-full border border-border bg-[#111114]", wide ? "max-w-4xl" : "max-w-2xl")}
      >
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="font-display text-lg">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 place-items-center border border-border transition-colors hover:border-primary hover:text-primary"
          >
            <X size={16} />
          </button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
}

export function BookingStatusBadge({ status }: { status: BookingStatus }) {
  const styles: Record<BookingStatus, string> = {
    new: "border-primary text-primary",
    contacted: "border-amber-400/60 text-amber-300",
    confirmed: "border-emerald-400/60 text-emerald-300",
    completed: "border-sky-400/60 text-sky-300",
    cancelled: "border-border text-muted-foreground",
  };
  return (
    <span
      className={cn(
        "inline-block border px-2.5 py-1 text-[10px] font-bold tracking-[0.14em] uppercase",
        styles[status],
      )}
    >
      {status}
    </span>
  );
}

/**
 * FileUploader — demo only.
 * Reads the selected file in the browser and returns a data URL.
 * BACKEND SWAP: upload to Cloudinary/S3/Supabase Storage and return the public URL.
 */
export function FileUploader({
  label,
  accept,
  value,
  onChange,
  hint,
}: {
  label: string;
  accept: string;
  value?: string | undefined;
  onChange: (dataUrl: string) => void;
  hint?: string | undefined;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <span className={adminLabel}>{label}</span>
      <input
        type="file"
        accept={accept}
        onChange={async (e) => {
          const file = e.target.files?.[0];
          if (file) onChange(await fileToDataUrl(file));
        }}
        className="w-full border border-input bg-[#09090b] px-3 py-2 text-xs text-muted-foreground file:mr-3 file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-xs file:font-bold file:text-primary-foreground file:uppercase"
      />
      <span className="text-[10px] text-muted-foreground/70">
        {hint ?? "Stored in this browser (frontend demo storage)."}
      </span>
      {value && (
        <img
          src={value}
          alt="Preview"
          className="mt-1 h-24 w-full border border-border object-cover"
        />
      )}
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  actions,
}: {
  title: string;
  description?: string | undefined;
  actions?: ReactNode | undefined;
}) {
  return (
    <div className="mb-7 flex flex-col gap-4 border-b border-border pb-5 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <h1 className="font-display text-2xl sm:text-3xl">{title}</h1>
        {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  );
}

export function AdminButton({
  children,
  variant = "solid",
  className,
  ...rest
}: {
  variant?: "solid" | "outline" | "danger";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const variants = {
    solid: "border-primary bg-primary text-primary-foreground hover:bg-primary-glow",
    outline: "border-border text-foreground hover:border-primary hover:text-primary",
    danger: "border-destructive/60 text-destructive hover:bg-destructive hover:text-white",
  };
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 border px-4 py-2.5 text-[11px] font-bold tracking-[0.12em] uppercase transition-colors",
        variants[variant],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

import { Link } from "@tanstack/react-router";
import * as motion from "motion/react-client";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-12 max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className="text-[11px] font-bold tracking-[0.3em] text-primary-glow uppercase">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.02] font-bold">{title}</h2>
      {description && <p className="mt-4 text-base text-muted-foreground sm:text-lg">{description}</p>}
    </div>
  );
}

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

type ButtonProps = {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  className?: string;
};

const buttonBase =
  "inline-flex items-center justify-center gap-2 px-6 py-3.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-all duration-300";

const variants = {
  solid:
    "border border-primary bg-primary text-primary-foreground hover:-translate-y-0.5 hover:bg-foreground hover:text-background glow-red",
  outline:
    "border border-border bg-transparent text-foreground hover:-translate-y-0.5 hover:border-primary hover:text-primary",
  ghost: "text-muted-foreground hover:text-primary",
};

export function ButtonLink({
  to,
  children,
  variant = "solid",
  className,
}: ButtonProps & { to: string }) {
  return (
    <Link to={to} className={cn(buttonBase, variants[variant], className)}>
      {children}
    </Link>
  );
}

export function ActionButton({
  children,
  variant = "solid",
  className,
  ...rest
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cn(buttonBase, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

/** Floating spark particles — subtle stage-dust effect. */
export function Particles({ count = 18 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }).map((_, i) => (
        <span
          key={i}
          className="absolute block h-[3px] w-[3px] rounded-full bg-primary-glow"
          style={{
            left: `${(i * 37) % 100}%`,
            bottom: `${(i * 13) % 60}%`,
            animation: `mm-float ${9 + (i % 7)}s linear ${i * 0.7}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

export function Stars({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <span
      className="inline-flex items-center gap-0.5 text-[var(--star)]"
      aria-label={`${rating} out of 5`}
      style={{ fontSize: size }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={i < rating ? "opacity-100" : "opacity-25"}>
          ★
        </span>
      ))}
    </span>
  );
}

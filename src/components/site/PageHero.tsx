import type { ReactNode } from "react";
import { Particles } from "./primitives";

export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border pt-36 pb-20">
      {image && (
        <img
          src={image}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/40" />
      <div className="absolute inset-0 spotlight" />
      <Particles count={10} />
      <div className="container-mm relative">
        <p className="text-[11px] font-bold tracking-[0.32em] text-primary-glow uppercase">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-4xl text-[clamp(2.4rem,7vw,5rem)] leading-[0.94] font-bold">
          {title}
        </h1>
        {subtitle && <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{subtitle}</p>}
        {children && <div className="mt-8 flex flex-wrap gap-3">{children}</div>}
      </div>
    </section>
  );
}

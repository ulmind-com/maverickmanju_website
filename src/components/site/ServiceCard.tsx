import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { ServiceType } from "@/types";

export function ServiceCard({ service }: { service: ServiceType }) {
  const body = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden bg-black">
        <img
          src={service.imageUrl}
          alt={service.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-[900ms] group-hover:scale-110"
        />
        <span className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="flex items-start justify-between gap-2 font-display text-xl leading-tight">
          {service.title}
          <ArrowUpRight
            size={18}
            className="mt-1 shrink-0 text-primary opacity-0 transition-all group-hover:translate-x-1 group-hover:opacity-100"
          />
        </h3>
        <p className="mt-2 flex-1 text-sm text-muted-foreground">{service.shortDescription}</p>
        <div className="mt-5 flex flex-wrap gap-1.5">
          {service.highlights.slice(0, 3).map((h) => (
            <span
              key={h}
              className="border border-border px-2.5 py-1 text-[10px] tracking-[0.12em] text-muted-foreground uppercase"
            >
              {h}
            </span>
          ))}
        </div>
      </div>
    </>
  );

  const className =
    "card-mm group flex h-full flex-col overflow-hidden hover:-translate-y-1 hover:border-primary/60 hover:glow-red";

  return service.page ? (
    <Link to={service.page} className={className}>
      {body}
    </Link>
  ) : (
    <Link to="/book" className={className}>
      {body}
    </Link>
  );
}

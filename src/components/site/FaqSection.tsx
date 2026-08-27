/**
 * FaqSection — A visible FAQ section for the homepage.
 *
 * Renders FAQ questions and answers in an accessible accordion-like layout.
 * The same data is used for JSON-LD FAQPage schema (see SeoSchemas.tsx).
 * This serves dual purpose: users see it AND Google indexes it as rich snippets.
 */

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Reveal, SectionHeader } from "@/components/site/primitives";
import { FAQ_DATA } from "@/components/site/SeoSchemas";

export function FaqSection() {
  return (
    <section
      id="faq"
      className="scroll-mt-[72px] border-t border-border bg-surface py-20 sm:py-24"
    >
      <div className="container-mm">
        <SectionHeader
          eyebrow="Frequently Asked Questions"
          title="Everything you need to know"
          description="Common questions about booking a magician, emcee and mentalist for your event in Bangalore."
        />

        <div className="mx-auto mt-12 max-w-3xl space-y-3">
          {FAQ_DATA.map((faq, i) => (
            <Reveal key={i} delay={i * 0.04}>
              <FaqItem question={faq.question} answer={faq.answer} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="card-mm overflow-hidden border border-border transition-colors hover:border-primary/40">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={open}
      >
        <span className="text-sm font-semibold text-foreground sm:text-base">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-primary transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className={`grid transition-all duration-300 ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

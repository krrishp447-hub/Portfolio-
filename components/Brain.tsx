"use client";

import { useState } from "react";
import { thoughts, type Thought } from "@/data/thoughts";
import { SectionHeader } from "./SectionHeader";
import { ThoughtPanel } from "./ThoughtPanel";
import { Reveal } from "./Reveal";

/**
 * Open questions, set as an index rather than a card grid, this reads as a
 * contents page, which is what a list of unfinished thoughts actually is.
 * The underline and arrow are the whole hover interaction; nothing moves.
 */
export function Brain() {
  const [open, setOpen] = useState<Thought | null>(null);

  return (
    <section
      id="brain"
      className="scroll-mt-16 bg-paper-sunk px-5 py-20 sm:px-6 sm:py-28 md:px-12 md:py-52"
      style={{ ["--section-bg" as string]: "var(--paper-sunk)" }}
    >
      <SectionHeader
        num="03"
        label="Brain"
        heading="Things currently occupying my brain."
        aside="Open questions"
      />

      <ul className="border-t border-line">
        {thoughts.map((t, i) => (
          <Reveal as="li" key={t.id} delay={i * 0.07}>
            <button
              type="button"
              onClick={() => setOpen(t)}
              className="group flex w-full items-baseline gap-5 border-b border-line py-7 text-left md:gap-8"
            >
              <span className="meta shrink-0">{t.id}</span>

              <span className="flex-1">
                <span className="display block text-[clamp(1.25rem,3.6vw,2.25rem)]">
                  <span className="bg-gradient-to-r from-accent to-accent bg-[length:0%_38%] bg-left-bottom bg-no-repeat transition-[background-size] duration-500 group-hover:bg-[length:100%_38%]">
                    {t.title}
                  </span>
                </span>
                {/* Visible by default on touch, where there is no hover to reveal it. */}
                <span className="mt-2 block max-w-2xl text-sm leading-snug text-ink-muted transition-opacity duration-300 md:text-base md:opacity-0 md:group-hover:opacity-100">
                  {t.excerpt}
                </span>
              </span>

              <span className="meta hidden shrink-0 opacity-0 transition-opacity group-hover:opacity-100 sm:block">
                {t.date}
              </span>
              <span
                aria-hidden="true"
                className="shrink-0 text-lg transition-transform duration-300 group-hover:translate-x-1"
              >
                →
              </span>
            </button>
          </Reveal>
        ))}
      </ul>

      <p className="annotation mt-8">These are fragments, not conclusions</p>

      <ThoughtPanel thought={open} onClose={() => setOpen(null)} onSelect={setOpen} />
    </section>
  );
}

"use client";

import { stats } from "@/data/profile";
import { RevealGroup, revealChild } from "./Reveal";
import { RevealText } from "./RevealText";
import { motion } from "motion/react";

/**
 * Proof, set as editorial copy rather than a KPI dashboard: a horizontal band of
 * figures with the qualifier printed underneath each one, so nothing is claimed
 * without its scope.
 */
export function Stats() {
  return (
    <section className="border-y border-line px-5 py-16 sm:px-6 sm:py-20 md:px-12 md:py-32">
      <RevealText className="display max-w-2xl text-[clamp(1.75rem,5vw,3.25rem)] uppercase">
        Some things I&rsquo;ve made move.
      </RevealText>

      <RevealGroup className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4" stagger={0.15}>
        {stats.map((s) => (
          <motion.div key={s.label} variants={revealChild}>
            <div className="border-t border-ink pt-4">
              <p className="display text-[clamp(2rem,5vw,3rem)]">{s.value}</p>
              <p className="mt-3 text-sm leading-snug">{s.label}</p>
              <p className="annotation mt-2">{s.note}</p>
            </div>
          </motion.div>
        ))}
      </RevealGroup>
    </section>
  );
}

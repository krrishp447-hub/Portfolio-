"use client";

import { useState } from "react";
import { RevealText } from "./RevealText";

/**
 * Section chapter marker + headline.
 *
 * The chapter rule sticks to the top of the viewport while its section scrolls
 * underneath, so you always know which chapter you are in, and the page reads
 * as a set of rooms rather than one long scroll. The headline sets itself word
 * by word as it arrives.
 *
 * Easter egg: clicking the section number three times admits it noticed.
 * A real button, so it is keyboard reachable rather than a mouse-only secret.
 */
export function SectionHeader({
  num,
  label,
  heading,
  aside,
}: {
  num: string;
  label: string;
  heading: string;
  aside?: string;
}) {
  const [clicks, setClicks] = useState(0);
  const found = clicks >= 3;

  return (
    <header className="mb-12 sm:mb-16 md:mb-28">
      <div className="sticky top-0 z-20 flex items-baseline gap-4 border-b border-line bg-[var(--section-bg,var(--paper))] pb-3 pt-4 backdrop-blur-[2px]">
        <button
          type="button"
          onClick={() => setClicks((c) => c + 1)}
          className="meta transition-colors hover:text-accent-ink"
          aria-label={`Section ${num}, ${label}`}
        >
          {num} / {label}
        </button>
        {found && (
          <span className="annotation text-accent-ink" role="status">
            You found this. Why?
          </span>
        )}
        {aside && !found && <span className="annotation ml-auto hidden sm:block">{aside}</span>}
      </div>

      <RevealText className="display mt-8 text-[clamp(2rem,7vw,4.5rem)] uppercase">
        {heading}
      </RevealText>
    </header>
  );
}

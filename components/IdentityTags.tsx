"use client";

import { tags } from "@/data/profile";

/**
 * Fragments of identity. Each sits at a slight fixed angle so the row reads as
 * scattered rather than aligned, and straightens on hover, the interaction is
 * the point, so it stays on the element itself rather than moving neighbours.
 */
export function IdentityTags() {
  return (
    <ul className="flex flex-wrap gap-2.5">
      {tags.map((tag, i) => {
        // Deterministic per-index tilt: no randomness, so server and client agree.
        const tilt = [-2.5, 1.5, -1, 2, -1.75, 1.25, -2][i % 7];
        return (
          <li key={tag}>
            <span
              className="meta inline-block rounded-full border border-line bg-paper px-3.5 py-2 text-ink transition-[transform,border-color,background-color] duration-300 hover:rotate-0 hover:border-ink hover:bg-accent"
              style={{ transform: `rotate(${tilt}deg)` }}
            >
              {tag}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

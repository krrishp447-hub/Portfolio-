"use client";

import { useSyncExternalStore } from "react";

const MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(MOTION);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Sakura drifting over the page.
 *
 * Purely decorative, so it is the first thing to go under reduced motion. The
 * server snapshot reports "reduced" so nothing renders during SSR and the
 * petals appear only once the client has confirmed motion is welcome.
 */
export function Petals() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOTION).matches,
    () => true,
  );

  if (reduced) return null;

  return (
    <div className="anime-petals" aria-hidden="true">
      {Array.from({ length: 14 }).map((_, i) => (
        <span
          key={i}
          style={{
            // Deterministic per index: no randomness, so server and client agree.
            left: `${(i * 7.3) % 100}%`,
            animationDelay: `${(i * 1.7) % 12}s`,
            animationDuration: `${9 + ((i * 3) % 7)}s`,
            scale: `${0.6 + (i % 4) * 0.2}`,
          }}
        />
      ))}
    </div>
  );
}

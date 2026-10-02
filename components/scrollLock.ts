"use client";

/**
 * Lets overlays pause the smooth-scroll engine.
 *
 * Lenis listens for wheel and touch events on the window and drives the page
 * itself, so while it is running a fixed overlay with its own `overflow-y:auto`
 * never receives those events: Lenis swallows them and scrolls a body that the
 * overlay has locked. The overlay looks frozen.
 *
 * Two things fix that together, and both are needed:
 *   1. `data-lenis-prevent` on the overlay's scroll container, so Lenis ignores
 *      events that start inside it and native scrolling takes over.
 *   2. `lockScroll()` here, so the page behind genuinely stops.
 */

type Engine = { stop: () => void; start: () => void };

let engine: Engine | null = null;
let locks = 0;

export function registerScrollEngine(next: Engine | null) {
  engine = next;
  // An overlay may already be open when the engine arrives or leaves.
  if (engine && locks > 0) engine.stop();
}

export function lockScroll() {
  locks += 1;
  if (locks === 1) engine?.stop();
}

export function unlockScroll() {
  locks = Math.max(0, locks - 1);
  if (locks === 0) engine?.start();
}

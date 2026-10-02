"use client";

import { useEffect, useRef } from "react";

/**
 * A small follower dot that expands over interactive elements and swaps to a
 * word over images and outbound links.
 *
 * Deliberately state-free: every update writes straight to the DOM through refs.
 * Driving this with React state would re-render the tree on pointermove, which
 * is the one certain way to make the page feel slow.
 *
 * Constraints it respects, because a cursor that ignores them is just an
 * annoyance: fine pointers only (never touch), never under reduced motion, and
 * the native cursor is hidden only once this is confirmed running.
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = dot.current;
    const text = label.current;
    if (!el || !text) return;

    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;

    document.documentElement.dataset.cursor = "custom";
    el.style.opacity = "1";

    let frame = 0;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let tx = x;
    let ty = y;
    let mode = "";

    const setMode = (next: string) => {
      if (next === mode) return;
      mode = next;

      const word = next === "view" ? "View" : next === "open" ? "Open ↗" : "";
      text.textContent = word;

      const size = next === "" ? 10 : word ? 64 : 36;
      el.style.width = `${size}px`;
      el.style.height = `${size}px`;
      el.style.backgroundColor = word ? "var(--ink)" : "color-mix(in srgb, var(--ink) 5%, transparent)";
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;

      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest("[data-cursor='view']")) setMode("view");
      else if (target.closest("[data-cursor='open']")) setMode("open");
      else if (target.closest("a, button, [role='button']")) setMode("hover");
      else setMode("");
    };

    // Light easing so the dot trails the pointer slightly instead of snapping.
    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      frame = requestAnimationFrame(loop);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
      delete document.documentElement.dataset.cursor;
    };
  }, []);

  return (
    <div
      ref={dot}
      aria-hidden="true"
      style={{ width: 10, height: 10, opacity: 0 }}
      className="pointer-events-none fixed left-0 top-0 z-[100] flex items-center justify-center rounded-full border border-ink/40 bg-ink/5 transition-[width,height,background-color] duration-200 ease-out"
    >
      <span
        ref={label}
        className="whitespace-nowrap text-[9px] uppercase tracking-[0.14em] text-paper"
        style={{ fontFamily: "var(--font-display)" }}
      />
    </div>
  );
}

"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { thoughts, type Thought } from "@/data/thoughts";
import { lockScroll, unlockScroll } from "./scrollLock";

/** A quiet reading panel. Slides in from the right on desktop, full-width on mobile. */
export function ThoughtPanel({
  thought,
  onClose,
  onSelect,
}: {
  thought: Thought | null;
  onClose: () => void;
  onSelect: (t: Thought) => void;
}) {
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!thought) return;

    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    lockScroll();
    panel.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      unlockScroll();
      previous?.focus();
    };
  }, [thought, onClose]);

  const related = thoughts.filter((t) => t.id !== thought?.id).slice(0, 3);

  return (
    <AnimatePresence>
      {thought && (
        <>
          <motion.div
            className="fixed inset-0 z-[70] bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
          />

          <motion.div
            ref={panel}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-label={thought.title}
            className="fixed inset-y-0 right-0 z-[71] w-full max-w-xl overflow-y-auto overscroll-contain border-l border-line bg-paper outline-none"
            data-lenis-prevent
            initial={reduce ? { opacity: 0 } : { x: "100%" }}
            animate={reduce ? { opacity: 1 } : { x: 0 }}
            exit={reduce ? { opacity: 0 } : { x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="sticky top-0 flex items-center justify-between border-b border-line bg-paper/95 px-6 py-4 backdrop-blur">
              <span className="meta">Thought / {thought.id}</span>
              <button type="button" onClick={onClose} className="meta text-ink hover:text-accent-ink">
                Close ✕
              </button>
            </div>

            <article className="px-6 py-10 md:px-10">
              <p className="annotation">{thought.date}</p>
              <h3 className="display mt-3 text-[clamp(1.75rem,5vw,2.75rem)]">{thought.title}</h3>

              <p className="editorial mt-7 text-xl leading-[1.35] text-ink-muted">
                {thought.excerpt}
              </p>

              <div className="mt-9 space-y-4 border-t border-line pt-7">
                {thought.note.map((p) => (
                  <p
                    key={p}
                    className={
                      p.startsWith("[")
                        ? "meta text-accent-ink"
                        : "text-base leading-relaxed text-ink-muted"
                    }
                  >
                    {p}
                  </p>
                ))}
              </div>

              {thought.link && (
                <a
                  href={thought.link.href}
                  data-cursor="open"
                  target="_blank"
                  rel="noreferrer"
                  className="meta mt-8 inline-block border-b border-ink pb-0.5 text-ink"
                >
                  {thought.link.label} ↗
                </a>
              )}

              <div className="mt-14 border-t border-line pt-6">
                <p className="annotation mb-4">Related thoughts</p>
                <ul className="space-y-2">
                  {related.map((t) => (
                    <li key={t.id}>
                      <button
                        type="button"
                        onClick={() => onSelect(t)}
                        className="text-left text-base text-ink-muted transition-colors hover:text-ink"
                      >
                        <span className="meta mr-3">{t.id}</span>
                        {t.title}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

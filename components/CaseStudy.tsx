"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Asset, Project } from "@/data/projects";
import { AssetFrame } from "./AssetFrame";
import { InstagramEmbed } from "./InstagramEmbed";
import { lockScroll, unlockScroll } from "./scrollLock";
import { ImageLightbox } from "./ImageLightbox";

/**
 * Full case study, opened over the page.
 *
 * Handles the things an overlay has to handle or it becomes a trap: Escape to
 * close, scroll lock on the page behind, focus moved in on open and returned to
 * the trigger on close.
 */
export function CaseStudy({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  const reduce = useReducedMotion();
  const panel = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<Asset | null>(null);

  // Read through a ref inside the key handler, so opening the lightbox does not
  // re-run the effect below, re-running it would steal focus back from the
  // lightbox the moment it opened.
  const lightboxOpen = useRef(false);
  useEffect(() => {
    lightboxOpen.current = lightbox !== null;
  }, [lightbox]);

  useEffect(() => {
    if (!project) return;

    const previous = document.activeElement as HTMLElement | null;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    lockScroll();
    panel.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      // Let the lightbox take Escape first when it is open.
      if (e.key === "Escape" && !lightboxOpen.current) onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      unlockScroll();
      previous?.focus();
    };
  }, [project, onClose]);

  return (
    <>
      <AnimatePresence>
        {project && (
          <motion.div
            className="fixed inset-0 z-[80] overflow-y-auto overscroll-contain bg-paper"
            // Without this Lenis eats the wheel events and the overlay cannot scroll.
            data-lenis-prevent
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              ref={panel}
              tabIndex={-1}
              role="dialog"
              aria-modal="true"
              aria-label={`${project.title} case study`}
              className="min-h-full outline-none"
            >
              <div className="sticky top-0 z-10 flex items-center justify-between border-b border-line bg-paper/95 px-6 py-4 backdrop-blur md:px-12">
                <span className="meta">
                  Case study / {project.title} · {project.year}
                </span>
                <button type="button" onClick={onClose} className="meta text-ink hover:text-accent-ink">
                  Close ✕
                </button>
              </div>

              <div className="px-6 py-14 md:px-12 md:py-20">
                <h2 className="display max-w-4xl text-[clamp(2.25rem,8vw,5.5rem)] uppercase">
                  {project.title}
                </h2>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {project.categories.map((c) => (
                    <li key={c} className="meta border border-line px-2.5 py-1">
                      {c}
                    </li>
                  ))}
                </ul>

                <p className="editorial mt-10 max-w-3xl text-[clamp(1.35rem,3vw,2rem)] leading-[1.2]">
                  {project.description}
                </p>

                {/* Asset strip */}
                <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {project.assets.length > 0
                    ? project.assets.map((a) => (
                        <div
                          key={a.src}
                          className={a.span ? "sm:col-span-2 lg:col-span-4" : undefined}
                        >
                          <AssetFrame asset={a} onOpen={setLightbox} />
                        </div>
                      ))
                    : Array.from({ length: project.placeholderFrames }).map((_, i) => (
                        <AssetFrame
                          key={i}
                          hint={i === 0 ? project.placeholderHint : undefined}
                        />
                      ))}
                </div>

                {project.embeds && project.embeds.length > 0 && (
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {project.embeds.map((e) => (
                      <InstagramEmbed key={e.url} url={e.url} title={e.title} />
                    ))}
                  </div>
                )}

                {/* The five beats */}
                <div className="mt-20 grid gap-14 lg:grid-cols-2 lg:gap-20">
                  <Block title="The context" body={project.context} />
                  <Block title="The problem" body={project.problem} />
                  <Block title="What I did" list={project.work} />
                  <Block title="What changed" list={project.outcomes} />
                </div>

                <div className="mt-16 max-w-3xl border-t border-ink pt-6">
                  <p className="meta mb-3">What I learned</p>
                  <p className="editorial text-[clamp(1.25rem,2.6vw,1.75rem)] leading-[1.25]">
                    {project.learnings}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="meta mt-16 rounded-full border border-line px-6 py-3.5 text-ink transition-colors hover:border-ink"
                >
                  ← Back to work
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ImageLightbox asset={lightbox} onClose={() => setLightbox(null)} />
    </>
  );
}

function Block({ title, body, list }: { title: string; body?: string; list?: string[] }) {
  return (
    <div>
      <p className="meta border-b border-line pb-2">{title}</p>
      {body && <p className="mt-4 text-lg leading-relaxed text-ink-muted">{body}</p>}
      {list && (
        <ul className="mt-4 space-y-3">
          {list.map((item) => (
            <li key={item} className="flex gap-3 text-lg leading-relaxed text-ink-muted">
              <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent-ink" />
              <span className={item.startsWith("[") ? "text-accent-ink" : undefined}>{item}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

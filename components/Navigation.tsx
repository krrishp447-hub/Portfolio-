"use client";

import { useEffect, useState } from "react";
import { sections } from "@/data/sections";

/**
 * Chapter navigation. Fixed and tiny on desktop, a compact sheet on mobile.
 *
 * The active chapter comes from an IntersectionObserver rather than scroll
 * arithmetic, cheaper, and it stays correct when sections are different
 * heights. Links are plain anchors so the URL updates and the back button works.
 */
export function Navigation() {
  const [active, setActive] = useState<string>("me");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Close the mobile sheet after a jump, otherwise it covers the destination.
  const close = () => setOpen(false);

  return (
    <>
      {/* desktop */}
      <nav
        aria-label="Sections"
        className="fixed right-8 top-8 z-50 hidden flex-col gap-1.5 md:flex"
      >
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <a
              key={id}
              href={`#${id}`}
              aria-current={isActive ? "true" : undefined}
              className="group flex items-center gap-2 py-0.5 text-right"
            >
              <span
                aria-hidden="true"
                className={`ml-auto inline-block h-1.5 w-1.5 rounded-full transition-colors ${
                  isActive ? "bg-accent-ink" : "bg-line group-hover:bg-ink-muted"
                }`}
              />
              <span
                className={`meta w-20 text-left transition-colors ${
                  isActive ? "text-ink" : "group-hover:text-ink"
                }`}
              >
                {label}
              </span>
            </a>
          );
        })}
      </nav>

      {/* mobile */}
      <div className="fixed right-4 top-4 z-50 md:hidden">
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          className="meta rounded-full border border-line bg-paper-raised px-4 py-2 text-ink"
        >
          {open ? "Close" : "Index"}
        </button>

        {open && (
          <div
            id="mobile-nav"
            className="absolute right-0 mt-2 w-44 overflow-hidden rounded-xl border border-line bg-paper-raised shadow-lg"
          >
            {sections.map(({ id, num, label }) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={close}
                className={`flex items-baseline gap-3 border-b border-line px-4 py-3 last:border-0 ${
                  active === id ? "text-ink" : "text-ink-muted"
                }`}
              >
                <span className="meta">{num}</span>
                <span className="meta text-current">{label}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

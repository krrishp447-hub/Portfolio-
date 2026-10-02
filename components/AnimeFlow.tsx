"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { animePanels } from "@/data/anime";
import { FigureSilhouette, ImpactLines, KatanaSlash, Sunrise } from "./AnimeArt";


/**
 * The anime-mode panel sequence.
 *
 * GSAP is imported dynamically so it lands in its own chunk rather than the
 * initial bundle, and is skipped entirely under reduced motion.
 *
 * ScrollTrigger rather than hand-rolled scroll maths because this is exactly
 * what it is for: a pinned section with a scrubbed timeline running several
 * elements in sequence, reversible, cleaned up on unmount.
 */

const MOTION = "(prefers-reduced-motion: reduce)";

function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia(MOTION);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

const ART = {
  slash: KatanaSlash,
  figure: FigureSilhouette,
  impact: ImpactLines,
  sunrise: Sunrise,
} as const;

export function AnimeFlow() {
  const reduced = useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia(MOTION).matches,
    () => true,
  );
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reduced || !root.current) return;

    const el = root.current;
    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(".anime-panel");

        panels.forEach((panel) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              start: "top 78%",
              end: "top 28%",
              scrub: 0.6,
            },
          });

          // The panel snaps in like a frame being laid down.
          tl.fromTo(
            panel.querySelector(".anime-frame"),
            { scale: 0.92, rotate: -1.5, opacity: 0 },
            { scale: 1, rotate: 0, opacity: 1, duration: 1, ease: "power3.out" },
            0,
          );

          // Katana travels, then the slash draws itself behind it.
          const katana = panel.querySelector(".fx-katana");
          if (katana) {
            tl.fromTo(
              katana,
              { xPercent: -30, yPercent: 22, opacity: 0 },
              { xPercent: 0, yPercent: 0, opacity: 1, duration: 0.9, ease: "power4.out" },
              0.1,
            );
          }

          const slashes = panel.querySelectorAll<SVGPathElement>(".fx-slash");
          slashes.forEach((p, i) => {
            const len = p.getTotalLength();
            gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
            tl.to(p, { strokeDashoffset: 0, duration: 0.5, ease: "power2.inOut" }, 0.45 + i * 0.08);
          });

          // Figure rises, disc swells, ground settles.
          tl.fromTo(
            panel.querySelector(".fx-figure"),
            { yPercent: 14, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
            0.2,
          );
          tl.fromTo(
            panel.querySelector(".fx-disc"),
            { scale: 0.4, transformOrigin: "50% 45%" },
            { scale: 1, duration: 1, ease: "power2.out" },
            0.1,
          );
          tl.fromTo(
            panel.querySelector(".fx-ground"),
            { scaleX: 0, transformOrigin: "50% 50%" },
            { scaleX: 1, duration: 0.6, ease: "power2.out" },
            0.5,
          );

          // Impact burst and radiating lines.
          tl.fromTo(
            panel.querySelector(".fx-burst"),
            { scale: 0, transformOrigin: "50% 50%" },
            { scale: 1, duration: 0.5, ease: "back.out(2)" },
            0.15,
          );
          tl.fromTo(
            panel.querySelectorAll(".fx-lines line"),
            { scaleX: 0, scaleY: 0, transformOrigin: "50% 50%", opacity: 0 },
            {
              scaleX: 1,
              scaleY: 1,
              opacity: 1,
              duration: 0.5,
              ease: "power3.out",
              stagger: { each: 0.012, from: "random" },
            },
            0.25,
          );

          // Caption last, so the reader lands on the words.
          tl.fromTo(
            panel.querySelectorAll(".anime-caption > *"),
            { yPercent: 40, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 0.7, ease: "power3.out", stagger: 0.08 },
            0.4,
          );
        });
      }, el);

      cleanup = () => ctx.revert();
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduced]);

  return (
    <section ref={root} id="anime-flow" className="anime-flow px-4 py-16 sm:py-20 md:px-10 md:py-32">
      <div className="mx-auto grid max-w-5xl gap-10">
        {animePanels.map((panel, i) => {
          const Art = ART[panel.art];
          // Alternate which side the art sits on, the way a spread reads.
          const flip = i % 2 === 1;

          return (
            <article key={panel.id} className="anime-panel">
              <div
                className={`anime-frame grid gap-0 overflow-hidden rounded-2xl border-[3px] border-ink bg-paper-raised md:grid-cols-2 ${
                  flip ? "md:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[3/2] bg-paper-sunk text-ink">
                  <Art />
                  <span className="annotation absolute left-3 top-3">{panel.kicker}</span>
                </div>

                <div className="anime-caption flex flex-col justify-center gap-3 p-7 md:p-10">
                  <p className="display text-[clamp(1.5rem,4vw,2.4rem)] leading-[1.05]">
                    {panel.line}
                  </p>
                  {panel.sub && <p className="text-base leading-relaxed text-ink-muted">{panel.sub}</p>}
                  {panel.attribution && <p className="annotation">{panel.attribution}</p>}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

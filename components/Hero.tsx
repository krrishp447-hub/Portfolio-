"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { EASE } from "./Reveal";
import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";

/**
 * First screen. Identity is stated in plain text and readable immediately;
 * the micro-interaction is decoration layered on top, never a gate in front.
 *
 * Mouse response is written to CSS custom properties via rAF rather than React
 * state, so pointer movement never triggers a render.
 */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  shown: { opacity: 1, y: 0, transition: { duration: 1.3, ease: EASE } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const root = useRef<HTMLElement>(null);
  const [nameHover, setNameHover] = useState(false);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    let px = 0;
    let py = 0;

    const onMove = (e: PointerEvent) => {
      // -1..1 from viewport centre
      px = (e.clientX / window.innerWidth) * 2 - 1;
      py = (e.clientY / window.innerHeight) * 2 - 1;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const apply = () => {
      frame = 0;
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section
      ref={root}
      id="hero"
      className="relative flex min-h-[100svh] flex-col justify-between px-5 pb-10 pt-20 sm:px-6 md:px-12 md:pt-16"
      style={{ ["--px" as string]: 0, ["--py" as string]: 0 }}
    >
      <p className="annotation">Made in Mumbai</p>

      <div className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[1.25fr_0.75fr] lg:gap-16">
        <div>
          {/* Easter egg 1: the name admits it is a name. */}
          {/* Mouse parallax lives on the wrapper so it cannot fight the
              entrance transform on the motion element inside. */}
          <div
            style={{
              transform: "translate3d(calc(var(--px) * -6px), calc(var(--py) * -4px), 0)",
            }}
          >
            <motion.h1
              className="display text-[clamp(3rem,13vw,10rem)] uppercase"
              onMouseEnter={() => setNameHover(true)}
              onMouseLeave={() => setNameHover(false)}
              initial={reduce ? false : "hidden"}
              animate="shown"
              variants={{ shown: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } } }}
            >
              {profile.name.split(" ").map((word, i, all) => (
                <Fragment key={word}>
                  <span className="mask-word">
                    <motion.span
                      style={{ display: "inline-block", willChange: "transform" }}
                      variants={{
                        hidden: { y: "110%" },
                        shown: { y: 0, transition: { duration: 1.6, ease: EASE } },
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                  {i < all.length - 1 ? " " : null}
                </Fragment>
              ))}
            </motion.h1>
          </div>

          <p
            className="annotation mt-1 h-3 transition-opacity duration-300"
            style={{ opacity: nameHover ? 1 : 0 }}
            aria-hidden={!nameHover}
          >
            Yes, that&rsquo;s my name.
          </p>

          {/* Everything below the name arrives in sequence behind it. */}
          <motion.div
            initial={reduce ? false : "hidden"}
            animate="shown"
            variants={{ shown: { transition: { staggerChildren: 0.13, delayChildren: 0.75 } } }}
          >
            <motion.p
              variants={fadeUp}
              className="display mt-6 text-[clamp(1.1rem,3.4vw,2rem)] uppercase text-ink-muted"
            >
              Content <span className="text-accent-ink">×</span> Research{" "}
              <span className="text-accent-ink">×</span> Technology
            </motion.p>

            <motion.p
              variants={fadeUp}
              className="editorial mt-8 max-w-xl text-[clamp(1.35rem,3vw,2rem)] leading-[1.15]"
            >
              {profile.line}
            </motion.p>
          </motion.div>

          <p className="mt-6 max-w-lg text-base leading-relaxed text-ink-muted">{profile.intro}</p>

          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
            <span className="meta">{profile.location}</span>
            <span className="meta flex items-center gap-2">
              <span
                aria-hidden="true"
                className="inline-block h-1.5 w-1.5 rounded-full bg-accent-ink"
              />
              {profile.status}
            </span>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="#work"
              className="meta rounded-full bg-ink px-6 py-3.5 text-paper transition-opacity hover:opacity-85"
            >
              Enter the archive →
            </a>
            <a
              href="#contact"
              className="meta rounded-full border border-line px-6 py-3.5 text-ink transition-colors hover:border-ink"
            >
              Contact →
            </a>
          </div>
        </div>

        {/* Portrait. Editorial crop, never a fabricated likeness. */}
        <div
          className="relative"
          style={{ transform: "translate3d(calc(var(--px) * 8px), calc(var(--py) * 6px), 0)" }}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            {profile.portrait ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={profile.portrait}
                alt={profile.portraitAlt}
                className="h-full w-full object-cover grayscale"
              />
            ) : (
              <div className="frame-placeholder flex h-full w-full flex-col justify-between p-4">
                <span className="annotation">Portrait / to be added</span>
                <span className="annotation">3:4 · b&amp;w · editorial crop</span>
              </div>
            )}
          </div>
          <p className="annotation mt-2">Fig. 01, the person in question</p>
        </div>
      </div>

      <p className="annotation">Scroll ↓</p>
    </section>
  );
}

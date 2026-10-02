"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";

/**
 * Scroll-linked motion: the thing inside drifts and settles as it crosses the
 * viewport, tied to scroll position rather than fired once on entry.
 *
 * This is the other half of the "expensive" feeling. A triggered animation
 * plays at you; a scroll-linked one responds to you, and the difference is
 * obvious even when the movement is only a few percent.
 *
 * Kept deliberately small, `shift` of 40px and a scale of 1.06 down to 1 are
 * near the ceiling before it reads as a gimmick. Transform only, so it composites
 * on the GPU and never triggers layout.
 */
export function Parallax({
  children,
  className,
  shift = 40,
  scale = false,
}: {
  children: ReactNode;
  className?: string;
  /** Vertical drift in px across the full pass through the viewport. */
  shift?: number;
  /** Also settle from a slight zoom, for imagery, not text. */
  scale?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [shift, -shift]);
  const s = useTransform(scrollYProgress, [0, 0.5], [scale ? 1.06 : 1, 1]);

  if (reduce) return <div className={className}>{children}</div>;

  // className goes on the element that MOVES, not on a wrapper around it;
  // otherwise a `grid` passed in here would end up with a single child and
  // collapse the layout. The outer div exists only to measure scroll position.
  return (
    <div ref={ref}>
      <motion.div className={className} style={{ y, scale: s, willChange: "transform" }}>
        {children}
      </motion.div>
    </div>
  );
}

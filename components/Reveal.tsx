"use client";

import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Scroll reveal.
 *
 * Tuned for a slow, settled entrance rather than a snap: long duration, a
 * generous rise, and an ease that decelerates hard at the end
 * (cubic-bezier(0.16, 1, 0.3, 1), fast out of the gate, then a long glide to
 * rest). No spring, no overshoot; the bounce is what makes motion read as
 * playful rather than expensive.
 *
 * Content is never gated behind it, under reduced motion the child renders in
 * its final state.
 */

/** The house ease. Everything that moves on this site uses it. */
export const EASE = [0.16, 1, 0.3, 1] as const;

export function Reveal({
  children,
  delay = 0,
  className,
  as = "div",
  distance = 32,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "section";
  distance?: number;
}) {
  const reduce = useReducedMotion();
  const Tag = motion[as];

  if (reduce) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1.3, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

/**
 * Same entrance, applied to each child in sequence. Used where a group should
 * arrive as a cascade rather than as one block, stat figures, card rows.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.12,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ shown: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </motion.div>
  );
}

export const revealChild = {
  hidden: { opacity: 0, y: 28 },
  shown: { opacity: 1, y: 0, transition: { duration: 1.3, ease: EASE } },
};

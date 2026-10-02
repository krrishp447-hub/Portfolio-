"use client";

import { motion, useReducedMotion } from "motion/react";
import { Fragment } from "react";
import { EASE } from "./Reveal";

/**
 * Headline reveal: each word rises out from behind a mask, staggered.
 *
 * This is the effect that does most of the work in making a page feel
 * expensive. The mask matters, words sliding up from nothing reads as a fade,
 * words sliding up from behind a hard edge reads as print being set.
 *
 * The text stays one ordinary string in the DOM, split only for animation, so
 * it remains selectable and search engines see a normal heading. Whitespace is
 * preserved with real spaces between spans rather than gaps, so copy-paste
 * keeps its words apart.
 */
export function RevealText({
  children,
  className,
  delay = 0,
  as: Tag = "h2",
}: {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const reduce = useReducedMotion();
  const words = children.split(" ");

  if (reduce) return <Tag className={className}>{children}</Tag>;

  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
      variants={{ shown: { transition: { staggerChildren: 0.085, delayChildren: delay } } }}
      // The mask needs a clipping box per word; inline-block keeps line breaks natural.
      style={{ display: "block" }}
    >
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          {/* .mask-word is the clipping box. The space between words has to sit
              OUTSIDE it: trailing whitespace inside an overflow-hidden
              inline-block gets trimmed, which runs every word together. */}
          <span className="mask-word">
            <motion.span
              style={{ display: "inline-block", willChange: "transform" }}
              variants={{
                hidden: { y: "110%" },
                shown: { y: 0, transition: { duration: 1.45, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </MotionTag>
  );
}

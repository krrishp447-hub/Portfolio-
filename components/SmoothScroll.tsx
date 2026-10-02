"use client";

import { useEffect, useSyncExternalStore } from "react";
import { registerScrollEngine } from "./scrollLock";

const MOTION = "(prefers-reduced-motion: reduce)";

function subscribe(cb: () => void) {
  const mq = window.matchMedia(MOTION);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * Scroll damping, the heavy glide you get on Apple product pages.
 *
 * Lenis rather than GSAP's ScrollSmoother, despite GSAP already being here:
 * ScrollSmoother animates a transform on a content wrapper, and a transformed
 * ancestor breaks `position: sticky` and `position: fixed` inside it. That
 * would take out the sticky chapter rules and the sticky tape deck. Lenis
 * damps the real scroll position instead, so sticky keeps working.
 *
 * Renders nothing. It drives scrolling and wires ScrollTrigger to it, which is
 * required or the manga panel timelines would read a scroll position that no
 * longer matches what is on screen.
 *
 * Off entirely under reduced motion. Overriding someone's scroll physics when
 * they have asked the OS for less motion is exactly the case the setting exists
 * for, and native scrolling is the correct fallback.
 */
export function SmoothScroll() {
  const reduced = useSyncExternalStore(
    subscribe,
    () => window.matchMedia(MOTION).matches,
    () => true,
  );

  useEffect(() => {
    if (reduced) return;

    let cleanup = () => {};
    let cancelled = false;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import("lenis"),
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (cancelled) return;

      gsap.registerPlugin(ScrollTrigger);

      const lenis = new Lenis({
        // Roughly a second to settle: long enough to feel weighted, short
        // enough that the page still answers a flick.
        duration: 1.1,
        // Exponential ease out. Fast at the start, long tail, no bounce.
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        // Touch devices already have momentum scrolling; doubling it feels wrong.
        syncTouch: false,
        // Jumps from the chapter nav glide instead of teleporting.
        anchors: true,
      });

      // ScrollTrigger must recompute on every damped frame, not just native ones.
      lenis.on("scroll", ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      // Panel triggers may already exist; make them re-measure against Lenis.
      ScrollTrigger.refresh();

      // Overlays need to be able to stop the page behind them.
      registerScrollEngine(lenis);

      cleanup = () => {
        registerScrollEngine(null);
        lenis.off("scroll", ScrollTrigger.update);
        gsap.ticker.remove(tick);
        gsap.ticker.lagSmoothing(500, 33);
        lenis.destroy();
      };
    })();

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [reduced]);

  return null;
}

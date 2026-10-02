"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect } from "react";
import type { Asset } from "@/data/projects";

/** Large view of a single project asset. Escape closes, backdrop click closes. */
export function ImageLightbox({
  asset,
  onClose,
}: {
  asset: Asset | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!asset) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [asset, onClose]);

  return (
    <AnimatePresence>
      {asset && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={asset.alt}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/90 p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <button
            type="button"
            onClick={onClose}
            className="meta fixed right-6 top-6 text-paper"
            aria-label="Close image"
          >
            Close ✕
          </button>

          <figure className="max-h-full max-w-5xl" onClick={(e) => e.stopPropagation()}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset.src}
              alt={asset.alt}
              className="max-h-[80vh] w-auto object-contain"
            />
            {asset.caption && (
              <figcaption className="annotation mt-3 text-paper">{asset.caption}</figcaption>
            )}
          </figure>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

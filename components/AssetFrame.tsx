"use client";

import Image from "next/image";
import type { Asset } from "@/data/projects";

/**
 * One asset slot. Either a real image or a visible placeholder frame.
 *
 * The placeholder is deliberately not disguised, an honest empty slot beats a
 * stand-in that implies work which isn’t shown.
 *
 * Images go through next/image: the source files are 0.5–1.7MB straight off
 * Drive, and serving those raw would undo every other performance decision here.
 */
export function AssetFrame({
  asset,
  hint,
  ratio = "4/3",
  priority = false,
  onOpen,
}: {
  asset?: Asset;
  hint?: string;
  ratio?: string;
  priority?: boolean;
  onOpen?: (asset: Asset) => void;
}) {
  if (!asset) {
    return (
      <div
        className="frame-placeholder flex items-end p-3"
        style={{ aspectRatio: ratio }}
        aria-hidden="true"
      >
        {hint && <span className="annotation leading-tight">{hint}</span>}
      </div>
    );
  }

  // A thumbnail of something that lives elsewhere should go there, not open a
  // bigger copy of itself in a lightbox.
  const Tag = asset.href ? "a" : "button";
  const linkProps = asset.href
    ? ({
        href: asset.href,
        target: "_blank",
        rel: "noreferrer",
        "data-cursor": "open",
        "aria-label": `Open: ${asset.caption ?? asset.alt}`,
      } as const)
    : ({
        type: "button",
        "data-cursor": "view",
        onClick: () => onOpen?.(asset),
        "aria-label": `View larger: ${asset.caption ?? asset.alt}`,
      } as const);

  return (
    <Tag
      {...linkProps}
      className="group relative block w-full overflow-hidden bg-paper-sunk"
      style={{ aspectRatio: asset.ratio ?? ratio }}
    >
      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        // A banner really is viewport-wide; a thumbnail never exceeds ~400px on
        // desktop. The old blanket 25vw made phones fetch images far larger
        // than the box they land in.
        sizes={
          asset.span
            ? "(max-width: 768px) 100vw, 1100px"
            : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
        }
        priority={priority}
        className="object-cover grayscale transition-[filter,transform] duration-500 group-hover:scale-[1.02] group-hover:grayscale-0"
      />
      {asset.caption && (
        <span className="annotation absolute inset-x-0 bottom-0 bg-paper/85 px-2 py-1.5 opacity-0 transition-opacity group-hover:opacity-100">
          {asset.caption}
        </span>
      )}
    </Tag>
  );
}

"use client";

import type { Project } from "@/data/projects";
import { AssetFrame } from "./AssetFrame";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";
import { Parallax } from "./Parallax";

/**
 * One work chapter. Three compositions, chosen by `project.layout`, so the
 * section has rhythm instead of three identical cards:
 *
 *   wide , full-width horizontal band, image-led
 *   panel, tall vertical panel beside the text
 *   type , typographic only, no lead image
 */
export function ProjectCard({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const meta = (
    <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
      <span className="meta">{String(index + 1).padStart(2, "0")}</span>
      <span className="meta">{project.year}</span>
      <ul className="flex flex-wrap gap-x-3 gap-y-1">
        {project.categories.map((c) => (
          <li key={c} className="meta">
            {c}
          </li>
        ))}
      </ul>
    </div>
  );

  const open = (
    <div className="mt-7 flex flex-wrap items-center gap-x-8 gap-y-3">
      <button
        type="button"
        onClick={() => onOpen(project)}
        className="meta group/btn inline-flex items-center gap-2 text-ink"
      >
        <span className="border-b border-ink pb-0.5 transition-colors group-hover/btn:border-accent-ink group-hover/btn:text-accent-ink">
          Read the case study
        </span>
        <span aria-hidden="true" className="transition-transform group-hover/btn:translate-x-1">
          →
        </span>
      </button>

      {/* A link to the live work outranks any write-up about it. */}
      {project.link && (
        <a
          href={project.link.href}
          target="_blank"
          rel="noreferrer"
          data-cursor="open"
          className="meta group/link inline-flex items-center gap-2 text-accent-ink"
        >
          <span className="border-b border-accent-ink pb-0.5">{project.link.label}</span>
          <span aria-hidden="true" className="transition-transform group-hover/link:translate-x-1">
            ↗
          </span>
        </a>
      )}
    </div>
  );

  if (project.layout === "wide") {
    return (
      <Reveal className="border-t border-line pt-8">
        {meta}
        <RevealText as="h3" className="display mt-5 text-[clamp(2.5rem,9vw,6.5rem)] uppercase">
          {project.title}
        </RevealText>
        <Parallax className="mt-8" shift={28} scale>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: project.placeholderFrames }).map((_, i) => {
            const asset = project.assets[i];
            return (
              <div key={i} className={asset?.span ? "sm:col-span-2 lg:col-span-4" : undefined}>
                <AssetFrame
                  asset={asset}
                  hint={i === 0 && !asset ? project.placeholderHint : undefined}
                  ratio="4/3"
                  priority={index === 0 && i === 0}
                />
              </div>
            );
          })}
        </div>
        </Parallax>
        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_1fr]">
          <p className="editorial text-[clamp(1.25rem,2.6vw,1.75rem)] leading-[1.25]">
            {project.description}
          </p>
          <div className="lg:pt-2">{open}</div>
        </div>
      </Reveal>
    );
  }

  if (project.layout === "panel") {
    // A banner asset spans the full width; the rest sit in a grid beside the
    // text. Stacking every asset in one narrow column, as this used to, turned
    // six 16:9 thumbnails into an unreadable vertical strip.
    const banner = project.assets.find((a) => a.span);
    const rest = project.assets.filter((a) => !a.span);
    const slots = Math.max(rest.length, banner ? 0 : project.placeholderFrames);

    return (
      <Reveal className="border-t border-line pt-8">
        {meta}

        {banner && (
          <Parallax className="mt-6" shift={22} scale>
            <AssetFrame asset={banner} />
          </Parallax>
        )}

        <div className="mt-8 grid gap-10 lg:grid-cols-[0.42fr_0.58fr] lg:gap-16">
          <div className="lg:pt-2">
            <RevealText as="h3" className="display text-[clamp(2.25rem,7vw,4.75rem)] uppercase">
              {project.title}
            </RevealText>
            <p className="editorial mt-6 max-w-lg text-[clamp(1.2rem,2.4vw,1.6rem)] leading-[1.25]">
              {project.description}
            </p>
            {open}
          </div>

          <Parallax className="grid gap-3 sm:grid-cols-2" shift={26}>
            {Array.from({ length: slots }).map((_, i) => (
              <AssetFrame
                key={i}
                asset={rest[i]}
                hint={i === 0 && !rest[i] ? project.placeholderHint : undefined}
                ratio="16/9"
              />
            ))}
          </Parallax>
        </div>
      </Reveal>
    );
  }

  // 'type', typographic composition, the title doing the work
  return (
    <Reveal className="border-t border-line pt-8">
      {meta}
      <div className="mt-5 grid gap-8 lg:grid-cols-[0.62fr_0.38fr] lg:gap-16">
        <div>
          <RevealText as="h3" className="display text-[clamp(2.5rem,10vw,7rem)] uppercase leading-[0.9]">
            {project.title}
          </RevealText>
          <p className="editorial mt-7 max-w-xl text-[clamp(1.2rem,2.4vw,1.6rem)] leading-[1.25]">
            {project.description}
          </p>
          {open}
        </div>
        <div className="flex flex-col justify-end gap-3">
          <p className="annotation">{project.placeholderHint}</p>
          {Array.from({ length: project.placeholderFrames }).map((_, i) => (
            <AssetFrame key={i} asset={project.assets[i]} ratio="16/9" />
          ))}
        </div>
      </div>
    </Reveal>
  );
}

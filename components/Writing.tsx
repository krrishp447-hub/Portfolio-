import { articleGroups, scripts } from "@/data/writing";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";

/**
 * The written archive.
 *
 * Earlier version put 14 articles and 15 scripts in two parallel bordered
 * columns, which read as a wall of links. This splits them by kind and gives
 * each kind the density it deserves: articles get full-width rows with room to
 * breathe, the how-to series gets a light three-column grid because its value
 * is the span of the series rather than any single title.
 */
export function Writing() {
  const total = articleGroups.reduce((n, g) => n + g.articles.length, 0) + scripts.length;

  return (
    <div className="border-t border-line pt-8">
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
        <span className="meta">Also in the archive</span>
        <span className="annotation ml-auto">{total} pieces · opens in Drive</span>
      </div>

      <RevealText as="h3" className="display mt-5 text-[clamp(2rem,7vw,4.5rem)] uppercase">
        Things I&rsquo;ve written.
      </RevealText>

      {/* Articles, full width, one per row, generous rhythm */}
      <div className="mt-20 space-y-20">
        {articleGroups.map((group, gi) => (
          <Reveal key={group.heading} delay={gi * 0.05}>
            <div className="grid gap-x-12 gap-y-5 lg:grid-cols-[180px_1fr]">
              <p className="meta lg:pt-5">{group.heading}</p>

              <ul>
                {group.articles.map((a) => (
                  <li key={a.href} className="border-b border-line first:border-t">
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noreferrer"
                      data-cursor="open"
                      className="group flex items-baseline gap-6 py-5"
                    >
                      <span className="flex-1 text-[clamp(1rem,2.2vw,1.25rem)] leading-snug transition-colors group-hover:text-accent-ink">
                        {a.title}
                      </span>
                      <span className="annotation hidden shrink-0 sm:block">{a.topic}</span>
                      <span
                        aria-hidden="true"
                        className="shrink-0 text-ink-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-ink"
                      >
                        ↗
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* The how-to series, lighter grid, no row borders */}
      <Reveal delay={0.05}>
        <div className="mt-28 grid gap-x-12 gap-y-6 lg:grid-cols-[180px_1fr]">
          <div>
            <p className="meta">How-to series</p>
            <p className="annotation mt-2 max-w-[160px] leading-relaxed">
              Teaching digital tasks to an older audience, one step at a time
            </p>
          </div>

          <ul className="grid gap-x-10 gap-y-1 border-t border-line pt-5 sm:grid-cols-2 xl:grid-cols-3">
            {scripts.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="open"
                  className="group flex items-baseline gap-2 py-2 text-[0.95rem] leading-snug text-ink-muted transition-colors hover:text-ink"
                >
                  <span className="flex-1">{s.title}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 text-xs opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </div>
  );
}

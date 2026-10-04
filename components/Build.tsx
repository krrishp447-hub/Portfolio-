import { buildIntro, experiments } from "@/data/experiments";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

const statusLabel = {
  running: "In use",
  demo: "Live demo",
  prototype: "Prototype",
  idea: "Not built yet",
} as const;

export function Build() {
  return (
    <section id="build" className="scroll-mt-16 px-5 py-20 sm:px-6 sm:py-28 md:px-12 md:py-52">
      <SectionHeader
        num="04"
        label="Build"
        heading="Sometimes I get bored and build things."
        aside="Experiments"
      />

      <Reveal>
        <p className="editorial max-w-3xl text-[clamp(1.25rem,2.8vw,1.85rem)] leading-[1.25]">
          {buildIntro}
        </p>
      </Reveal>

      <div className="mt-16">
        <ul className="space-y-px">
          {experiments.map((e, i) => (
            <Reveal as="li" key={e.title} delay={i * 0.06}>
              <div className="border-t border-line py-7">
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="display text-[clamp(1.2rem,3vw,1.75rem)] uppercase">{e.title}</h3>
                  <span
                    className={`meta ${
                      e.status === "running" || e.status === "demo" ? "text-accent-ink" : ""
                    }`}
                  >
                    {statusLabel[e.status]}
                  </span>
                </div>

                <p className="mt-3 max-w-xl text-base leading-relaxed text-ink-muted">
                  {e.description}
                </p>

                {/* the flow, inline */}
                <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1">
                  {e.flow.map((f, fi) => (
                    <span key={f} className="meta flex items-center gap-2">
                      {f}
                      {fi < e.flow.length - 1 && (
                        <span aria-hidden="true" className="text-line">
                          →
                        </span>
                      )}
                    </span>
                  ))}
                </p>

                {e.link && (
                  <a
                    href={e.link.href}
                    target="_blank"
                    rel="noreferrer"
                    data-cursor="open"
                    className="meta group/link mt-4 inline-flex items-center gap-2 text-accent-ink"
                  >
                    <span className="border-b border-accent-ink pb-0.5">{e.link.label}</span>
                    <span
                      aria-hidden="true"
                      className="transition-transform group-hover/link:translate-x-1"
                    >
                      ↗
                    </span>
                  </a>
                )}

                <ul className="mt-4 flex flex-wrap gap-2">
                  {e.stack.map((s) => (
                    <li
                      key={s}
                      className={`meta border border-line px-2.5 py-1 ${
                        s.startsWith("[") ? "text-accent-ink" : ""
                      }`}
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>

      </div>
    </section>
  );
}

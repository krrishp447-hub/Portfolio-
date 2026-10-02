import { about } from "@/data/profile";
import { IdentityCard } from "./IdentityCard";
import { IdentityTags } from "./IdentityTags";
import { Reveal } from "./Reveal";
import { SectionHeader } from "./SectionHeader";

export function About() {
  return (
    <section id="me" className="scroll-mt-16 px-5 py-20 sm:px-6 sm:py-28 md:px-12 md:py-52">
      <SectionHeader num="01" label="Me" heading={about.heading} aside="Short version" />

      <div className="grid gap-12 lg:grid-cols-[1.4fr_0.6fr] lg:gap-20">
        <div>
          <Reveal>
            <div className="max-w-2xl space-y-5">
              {about.paragraphs.map((p, i) => (
                <p
                  key={p}
                  className={
                    i === 0
                      ? "editorial text-[clamp(1.5rem,3.4vw,2.25rem)] leading-[1.2]"
                      : "text-lg leading-relaxed text-ink-muted"
                  }
                >
                  {p}
                </p>
              ))}
            </div>
          </Reveal>

          {/* The rhythm lines: four short beats, set as a list so the cadence shows. */}
          <Reveal delay={0.1}>
            <ul className="mt-12 max-w-xl divide-y divide-line border-y border-line">
              {about.rhythm.map((line) => (
                <li key={line} className="py-3.5 text-base">
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mt-12">
              <p className="annotation mb-4">Fragments, not job titles</p>
              <IdentityTags />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <IdentityCard />
        </Reveal>
      </div>
    </section>
  );
}

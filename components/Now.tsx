import { now } from "@/data/now";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";

/**
 * A status board. Set as a table of fields rather than prose, because the point
 * is that each line can change on its own, this is the section that proves
 * someone is still maintaining the site.
 */
export function Now() {
  return (
    <section id="now" className="scroll-mt-16 bg-ink px-5 py-20 text-paper sm:px-6 sm:py-28 md:px-12 md:py-52">
      {/* Inverted panel: the one place the page flips, so NOW reads as a live board. */}
      <div className="mb-12 sm:mb-16 md:mb-28">
        <div className="flex items-baseline gap-4 border-b border-paper/20 pb-3">
          <span className="meta text-paper/60">05 / Now</span>
          <span className="meta ml-auto text-paper/60">Last updated {now.lastUpdated}</span>
        </div>
        <RevealText className="display mt-6 text-[clamp(2rem,7vw,4.5rem)] uppercase">
          Right now.
        </RevealText>
      </div>

      <dl className="grid gap-px border-t border-paper/20 sm:grid-cols-2">
        {now.fields.map((f, i) => (
          <Reveal key={f.label} delay={i * 0.05}>
            <div className="border-b border-paper/20 py-6 sm:pr-8">
              <dt className="meta text-paper/60">{f.label}</dt>
              <dd
                className={`display mt-2 text-[clamp(1.1rem,2.6vw,1.6rem)] ${
                  f.value.startsWith("[") ? "text-accent" : ""
                }`}
              >
                {f.value}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>

      {/* /60 rather than /50: below that it stops passing contrast on the ink panel. */}
      <p className="annotation mt-8 text-paper/60">Still figuring it out</p>
    </section>
  );
}

import { contact, socials } from "@/data/profile";
import { Reveal } from "./Reveal";
import { RevealText } from "./RevealText";

/**
 * No form. A form would need a backend, spam handling and an error state, to do
 * a job two links already do, and an unanswered form is worse than an address.
 */
export function Contact() {
  // Looked up by label rather than index, so reordering socials cannot silently
  // swap the buttons.
  const email = socials.find((s) => s.label === "Email")!;
  const linkedin = socials.find((s) => s.label === "LinkedIn")!;

  return (
    <section id="contact" className="scroll-mt-16 border-t border-line px-5 py-20 sm:px-6 sm:py-28 md:px-12 md:py-52">
      <RevealText className="display max-w-3xl text-[clamp(2rem,7vw,4.5rem)] uppercase">
        {contact.heading}
      </RevealText>

      <Reveal delay={0.05}>
        <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-muted">{contact.body}</p>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="mt-10 flex flex-wrap gap-3">
          <a
            href={email.href}
            className="meta rounded-full bg-ink px-6 py-3.5 text-paper transition-opacity hover:opacity-85"
          >
            Email me →
          </a>
          {linkedin.href ? (
            <a
              href={linkedin.href}
              data-cursor="open"
              target="_blank"
              rel="noreferrer"
              className="meta rounded-full border border-line px-6 py-3.5 text-ink transition-colors hover:border-ink"
            >
              LinkedIn ↗
            </a>
          ) : (
            <span className="meta rounded-full border border-dashed border-line px-6 py-3.5 text-accent-ink">
              LinkedIn [add link]
            </span>
          )}
        </div>
      </Reveal>
    </section>
  );
}

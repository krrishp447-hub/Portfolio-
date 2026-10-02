import { profile, socials } from "@/data/profile";
import { RevealText } from "./RevealText";

export function Footer() {
  return (
    <footer className="border-t border-line px-5 py-20 sm:px-6 sm:py-24 md:px-12">
      <RevealText className="display max-w-4xl text-[clamp(1.75rem,6vw,4rem)] uppercase">
        That&rsquo;s enough internet for now.
      </RevealText>

      <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="meta mb-2">{profile.name}</p>
          <p className="text-sm text-ink-muted">{profile.location}</p>
        </div>

        {socials.map((s) => (
          <div key={s.label}>
            <p className="meta mb-2">{s.label}</p>
            {s.href ? (
              <a
                href={s.href}
                data-cursor={s.href.startsWith("http") ? "open" : undefined}
                target={s.href.startsWith("http") ? "_blank" : undefined}
                rel={s.href.startsWith("http") ? "noreferrer" : undefined}
                className="break-all text-sm text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-accent-ink"
              >
                {s.display}
              </a>
            ) : (
              <span className="text-sm text-accent-ink">{s.display}</span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
        <p className="annotation">© 2026 Krish Patil</p>
        <p className="annotation">Built with curiosity</p>
        {/* Easter egg 3: only reaches people who got this far. */}
        <p className="annotation text-accent-ink">
          If you&rsquo;re still here, we should probably talk
        </p>
      </div>
    </footer>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { archiveUrl, stories, type Story } from "@/data/audio";

/**
 * A tape deck for the audio stories: pick a cassette from the rack, it loads
 * into the deck and plays.
 *
 * Built on one native <audio> element with `preload="none"`, the browser
 * fetches nothing until a tape is actually selected, so 29 stories cost zero
 * bytes on page load. Everything visible here is an ordinary button or range
 * input underneath, so it works on a keyboard and reads correctly to a screen
 * reader; the cassette is styling, not a custom widget.
 *
 * Only tapes with a local MP3 are racked. The last slot is a demo tape linking
 * to the full archive in Drive, so the rest of the stories are one click away
 * without 15 dead shells cluttering the rack.
 */
export function CassettePlayer() {
  const audio = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState<Story | null>(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);

  // A rack of 29 is a wall, not a selection. The demo tape carries the rest.
  const racked = stories.filter((s) => s.local).slice(0, 8);

  // Load and play whenever a different tape is selected.
  useEffect(() => {
    const el = audio.current;
    if (!el || !current) return;
    setLoading(true);
    setTime(0);
    setDuration(0);
    el.load();
    el.play().catch(() => setPlaying(false)); // autoplay can be refused; not an error worth surfacing
  }, [current]);

  const toggle = () => {
    const el = audio.current;
    if (!el || !current) return;
    if (el.paused) el.play().catch(() => setPlaying(false));
    else el.pause();
  };

  const nudge = (seconds: number) => {
    const el = audio.current;
    if (!el) return;
    el.currentTime = Math.min(Math.max(el.currentTime + seconds, 0), el.duration || 0);
  };

  const seek = (value: number) => {
    const el = audio.current;
    if (!el) return;
    el.currentTime = value;
    setTime(value);
  };

  const label = current ? current.title + (current.note ? `, ${current.note}` : "") : null;

  return (
    <div className="mt-28">
      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-b border-line pb-2">
        <p className="meta">Audio stories</p>
        <p className="annotation ml-auto">
          {racked.length} of {stories.length} tapes
        </p>
      </div>
      <p className="annotation mt-2">Hindi short stories, written and produced</p>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-14">
        {/* ---------------- the deck ---------------- */}
        <div className="lg:sticky lg:top-8 lg:self-start">
          <div className="rounded-lg border border-ink bg-ink p-5 text-paper shadow-[6px_6px_0_0_var(--line)]">
            {/* window */}
            <div className="rounded-sm border border-paper/25 bg-paper/5 p-4">
              <div className="flex items-center justify-between gap-4">
                <Reel spinning={playing} />

                <div className="min-w-0 flex-1 text-center">
                  <p className="annotation text-paper/50">
                    {loading ? "Loading" : playing ? "Playing" : current ? "Paused" : "No tape"}
                  </p>
                  <p
                    className="display mt-1 truncate text-[0.95rem] uppercase"
                    aria-live="polite"
                  >
                    {label ?? ""}
                  </p>
                </div>

                <Reel spinning={playing} />
              </div>
            </div>

            {/* transport */}
            <div className="mt-5 flex items-center gap-2">
              <DeckButton onClick={() => nudge(-15)} disabled={!current} label="Back 15 seconds">
                «15
              </DeckButton>

              <button
                type="button"
                onClick={toggle}
                disabled={!current}
                aria-label={playing ? "Pause" : "Play"}
                className="flex h-12 flex-1 items-center justify-center rounded-sm bg-accent text-ink transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:bg-paper/15 disabled:text-paper/40"
              >
                <span className="meta text-current">{playing ? "Pause" : "Play"}</span>
              </button>

              <DeckButton onClick={() => nudge(15)} disabled={!current} label="Forward 15 seconds">
                15»
              </DeckButton>
            </div>

            {/* scrub */}
            <div className="mt-4 flex items-center gap-3">
              <span className="annotation tabular-nums text-paper/60">{fmt(time)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={1}
                value={time}
                disabled={!duration}
                onChange={(e) => seek(Number(e.target.value))}
                aria-label="Seek"
                className="h-1 flex-1 cursor-pointer appearance-none rounded-full bg-paper/20 accent-[var(--accent)] disabled:cursor-not-allowed"
              />
              <span className="annotation tabular-nums text-paper/60">{fmt(duration)}</span>
            </div>
          </div>

          <p className="annotation mt-3">Yes, I built the tape deck too</p>
        </div>

        {/* ---------------- the rack ---------------- */}
        <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {racked.map((s) => {
            const isCurrent = current?.slug === s.slug;
            return (
              <li key={s.slug}>
                <Cassette
                  story={s}
                  active={isCurrent}
                  playing={isCurrent && playing}
                  onSelect={() => (isCurrent ? toggle() : setCurrent(s))}
                />
              </li>
            );
          })}

          <li>
            <DemoTape />
          </li>
        </ul>
      </div>

      <audio
        ref={audio}
        preload="none"
        src={current ? `/audio/${current.slug}.mp3` : undefined}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onPlaying={() => setLoading(false)}
        onWaiting={() => setLoading(true)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration || 0)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onEnded={() => setPlaying(false)}
      />
    </div>
  );
}

/** A tape reel. Rotation is CSS; reduced motion stops it via the global rule. */
function Reel({ spinning }: { spinning: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="relative grid h-11 w-11 shrink-0 place-items-center rounded-full border border-paper/30"
    >
      <span
        className="grid h-7 w-7 place-items-center rounded-full border border-dashed border-paper/50"
        style={{
          animation: "reel-spin 2.4s linear infinite",
          animationPlayState: spinning ? "running" : "paused",
        }}
      >
        <span className="h-2 w-2 rounded-full bg-paper/60" />
      </span>
    </span>
  );
}

function DeckButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: React.ReactNode;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="meta h-12 rounded-sm border border-paper/25 px-3 text-paper transition-colors hover:border-paper/60 disabled:cursor-not-allowed disabled:text-paper/30"
    >
      {children}
    </button>
  );
}

/** One cassette in the rack. */
function Cassette({
  story,
  active,
  playing,
  onSelect,
}: {
  story: Story;
  active: boolean;
  playing: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`group w-full rounded-sm border p-3 text-left transition-colors ${
        active ? "border-ink bg-accent" : "border-line bg-paper-raised hover:border-ink"
      }`}
    >
      {/* label strip */}
      <span className="flex items-center justify-between gap-2">
        <span className="display truncate text-[0.9rem] uppercase text-ink">
          {story.title}
        </span>
        {story.note && <span className="annotation shrink-0">{story.note}</span>}
      </span>

      {/* the two windows */}
      <span className="mt-3 flex items-center justify-center gap-3 rounded-sm border border-ink/15 bg-paper/60 py-2">
        <Hub spinning={playing} />
        <span className="h-px w-6 bg-ink/20" />
        <Hub spinning={playing} />
      </span>

      <span className="annotation mt-2 block">
        {playing ? "Playing" : active ? "Paused" : "Play"}
      </span>
    </button>
  );
}

/**
 * The demo tape: same shape as a real cassette so it reads as part of the rack,
 * but an anchor rather than a button, because it leaves the site. Dashed edge
 * and still hubs so nobody mistakes it for something that plays here.
 */
function DemoTape() {
  return (
    <a
      href={archiveUrl}
      target="_blank"
      rel="noreferrer"
      data-cursor="open"
      className="group block h-full rounded-sm border border-dashed border-ink/40 bg-transparent p-3 transition-colors hover:border-ink hover:bg-paper-raised"
    >
      <span className="flex items-center justify-between gap-2">
        <span className="display truncate text-[0.9rem] uppercase text-ink">Demo tape</span>
        <span
          aria-hidden="true"
          className="annotation shrink-0 transition-transform duration-300 group-hover:translate-x-0.5"
        >
          ↗
        </span>
      </span>

      <span className="mt-3 flex items-center justify-center gap-3 rounded-sm border border-ink/15 bg-paper/40 py-2">
        <Hub spinning={false} />
        <span className="h-px w-6 bg-ink/20" />
        <Hub spinning={false} />
      </span>

      <span className="annotation mt-2 block">See more in Drive</span>
    </a>
  );
}

function Hub({ spinning }: { spinning: boolean }) {
  return (
    <span
      aria-hidden="true"
      className="grid h-5 w-5 place-items-center rounded-full border border-dashed border-ink/40"
      style={{
        animation: "reel-spin 2.4s linear infinite",
        animationPlayState: spinning ? "running" : "paused",
      }}
    >
      <span className="h-1 w-1 rounded-full bg-ink/50" />
    </span>
  );
}

function fmt(seconds: number) {
  if (!Number.isFinite(seconds) || seconds <= 0) return "0:00";
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${String(s).padStart(2, "0")}`;
}

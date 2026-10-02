"use client";

/**
 * Original panel art, drawn as inline SVG.
 *
 * Deliberately abstract: katana, silhouettes, speed lines and a rising sun.
 * Nothing here copies a real series or character, which is both the honest
 * choice and the only one that can ship on a public portfolio.
 *
 * Every animated element carries a class the GSAP timeline targets, so the art
 * and the choreography stay separate.
 */

export function KatanaSlash() {
  return (
    <svg viewBox="0 0 600 400" className="h-full w-full" aria-hidden="true">
      {/* the blade */}
      <g className="fx-katana">
        <path
          d="M120 330 C 240 250, 360 160, 470 78"
          fill="none"
          stroke="currentColor"
          strokeWidth="9"
          strokeLinecap="round"
        />
        <path
          d="M470 78 L497 58 L505 74 L482 92 Z"
          fill="currentColor"
        />
        {/* tsuba and grip */}
        <rect x="96" y="326" width="34" height="9" rx="4" fill="currentColor" transform="rotate(-34 113 330)" />
        <path
          d="M72 358 L110 332"
          stroke="currentColor"
          strokeWidth="13"
          strokeLinecap="round"
        />
      </g>

      {/* the cut it leaves behind */}
      <path
        className="fx-slash"
        d="M40 300 C 200 230, 380 140, 560 40"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        className="fx-slash"
        d="M60 360 C 210 300, 400 210, 570 120"
        fill="none"
        stroke="var(--accent)"
        strokeWidth="5"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  );
}

export function FigureSilhouette() {
  return (
    <svg viewBox="0 0 600 400" className="h-full w-full" aria-hidden="true">
      {/* sun disc behind */}
      <circle className="fx-disc" cx="300" cy="180" r="120" fill="var(--accent)" opacity="0.28" />

      {/* standing figure, coat flaring */}
      <g className="fx-figure" fill="currentColor">
        <circle cx="300" cy="118" r="26" />
        <path d="M300 148 C 272 152, 258 176, 256 206 L252 300 L276 300 L282 232 L288 300 L300 300 Z" />
        <path d="M300 148 C 328 152, 342 176, 344 206 L348 300 L324 300 L318 232 L312 300 L300 300 Z" />
        {/* coat tails caught in wind */}
        <path d="M256 210 C 214 244, 186 266, 150 274 C 196 288, 240 274, 258 252 Z" opacity="0.85" />
        <path d="M344 210 C 386 244, 414 266, 450 274 C 404 288, 360 274, 342 252 Z" opacity="0.85" />
        {/* hair */}
        <path d="M300 92 C 276 92, 268 106, 272 120 C 280 106, 292 100, 300 100 C 308 100, 320 106, 328 120 C 332 106, 324 92, 300 92 Z" />
      </g>

      {/* ground line */}
      <path className="fx-ground" d="M120 320 L480 320" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export function ImpactLines() {
  return (
    <svg viewBox="0 0 600 400" className="h-full w-full" aria-hidden="true">
      <g className="fx-lines" stroke="currentColor" strokeWidth="5" strokeLinecap="round">
        {Array.from({ length: 22 }).map((_, i) => {
          const angle = (i / 22) * Math.PI * 2;
          const x1 = 300 + Math.cos(angle) * 92;
          const y1 = 200 + Math.sin(angle) * 92;
          const x2 = 300 + Math.cos(angle) * (250 + (i % 3) * 40);
          const y2 = 200 + Math.sin(angle) * (250 + (i % 3) * 40);
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <circle className="fx-burst" cx="300" cy="200" r="84" fill="var(--accent)" />
    </svg>
  );
}

export function Sunrise() {
  return (
    <svg viewBox="0 0 600 400" className="h-full w-full" aria-hidden="true">
      <circle className="fx-burst" cx="300" cy="250" r="140" fill="var(--accent)" opacity="0.9" />
      <g className="fx-lines" stroke="var(--paper)" strokeWidth="10" strokeLinecap="round">
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={i} x1="150" y1={196 + i * 18} x2="450" y2={196 + i * 18} opacity={0.25 + i * 0.1} />
        ))}
      </g>
      {/* two blades crossed, sheathed */}
      <g className="fx-katana" stroke="currentColor" strokeWidth="8" strokeLinecap="round" fill="none">
        <path d="M170 330 C 240 290, 330 240, 420 196" />
        <path d="M430 330 C 360 290, 270 240, 180 196" />
      </g>
    </svg>
  );
}

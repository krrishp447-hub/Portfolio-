"use client";

import Image from "next/image";
import { useState } from "react";
import { profile } from "@/data/profile";

/**
 * The hero portrait: illustration by default, the real photograph on hover.
 *
 * The joke only lands if the drawing comes first. You meet the stylised version
 * the whole site is built around, then the actual person appears underneath it.
 *
 * Three things this has to get right:
 *
 *  - The source photo is a circular crop sitting on a dark square. Rather than
 *    cropping into it and losing resolution on an already small file, the circle
 *    is reproduced with border-radius, which clips the dark corners away for
 *    free and keeps every pixel.
 *  - Hover is not available on touch, and is invisible to keyboards, so this is
 *    a real <button> that also toggles on tap and responds to focus.
 *  - Under reduced motion the swap is instant rather than a cross-fade.
 */
export function Portrait() {
  const [flipped, setFlipped] = useState(false);

  // No illustration configured: fall back to the editorial placeholder frame.
  if (!profile.portrait) {
    return (
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <div className="frame-placeholder flex h-full w-full flex-col justify-between p-4">
          <span className="annotation">Portrait / to be added</span>
          <span className="annotation">3:4 · editorial crop</span>
        </div>
      </div>
    );
  }

  const showPhoto = flipped ? "opacity-100" : "opacity-0";
  const hidePlate = flipped ? "opacity-0" : "opacity-100";

  return (
    <button
      type="button"
      onClick={() => setFlipped((f) => !f)}
      aria-pressed={flipped}
      aria-label={
        flipped ? "Show the illustrated portrait" : "Show the real photograph"
      }
      className="group relative block aspect-[3/4] w-full overflow-hidden rounded-sm border-2 border-ink bg-paper"
    >
      {/* the drawing */}
      <Image
        src={profile.portrait}
        alt={profile.portraitAlt}
        fill
        sizes="(max-width: 1024px) 80vw, 420px"
        priority
        className={`object-cover transition-opacity duration-500 ease-out group-hover:opacity-0 ${hidePlate}`}
      />

      {/* the person */}
      {profile.portraitPhoto && (
        <span
          className={`absolute inset-0 grid place-items-center bg-paper transition-opacity duration-500 ease-out group-hover:opacity-100 ${showPhoto}`}
        >
          <span className="relative block aspect-square w-[76%] overflow-hidden rounded-full border-2 border-ink">
            <Image
              src={profile.portraitPhoto}
              alt={`${profile.name}, photographed`}
              fill
              sizes="340px"
              className="object-cover"
            />
          </span>
        </span>
      )}

      <span className="annotation absolute bottom-3 left-3 opacity-70">
        {flipped ? "The actual human" : "Hover for the real one"}
      </span>
    </button>
  );
}

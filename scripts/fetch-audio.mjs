/**
 * Pull the audio stories out of Google Drive and make them shippable.
 *
 *   node scripts/fetch-audio.mjs            # every story still missing locally
 *   node scripts/fetch-audio.mjs daadi tota # just these slugs
 *
 * Each source is a 24-bit stereo WAV of roughly 120MB. This downloads one,
 * transcodes it to a 64kbps mono MP3 (about 3.7MB, speech does not need
 * more), writes it to public/audio, and deletes the WAV before moving on, so
 * peak disk use stays around one file rather than 3.7GB.
 *
 * Requires ffmpeg and curl on PATH. Re-running is safe: anything already in
 * public/audio is skipped.
 *
 * Afterwards it prints the `local: true` lines to paste into data/audio.ts.
 */

import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = join(root, "public", "audio");
const tmp = join(root, ".audio-tmp.wav");

// data/audio.ts is TypeScript, so read it as text rather than importing it.
const source = readFileSync(join(root, "data", "audio.ts"), "utf8");
const stories = [...source.matchAll(/slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*driveId:\s*"([^"]+)"/g)].map(
  ([, slug, title, driveId]) => ({ slug, title, driveId }),
);

if (stories.length === 0) {
  console.error("No stories parsed from data/audio.ts, has its shape changed?");
  process.exit(1);
}

const only = process.argv.slice(2);
const queue = stories.filter((s) => (only.length ? only.includes(s.slug) : true));

mkdirSync(outDir, { recursive: true });

const mb = (bytes) => (bytes / 1048576).toFixed(1) + "MB";
const done = [];
const failed = [];

for (const [i, story] of queue.entries()) {
  const target = join(outDir, `${story.slug}.mp3`);
  const label = `[${i + 1}/${queue.length}] ${story.title}`;

  if (existsSync(target)) {
    console.log(`${label}, already local, skipping`);
    done.push(story.slug);
    continue;
  }

  try {
    console.log(`${label}, downloading…`);
    // The plain uc?export=download URL returns Drive's virus-scan interstitial
    // for files this large; drive.usercontent.google.com with confirm=t is the
    // endpoint that form posts to.
    execFileSync(
      "curl",
      [
        "-sL",
        "--fail",
        "-o",
        tmp,
        `https://drive.usercontent.google.com/download?id=${story.driveId}&export=download&confirm=t`,
      ],
      { stdio: "inherit" },
    );

    const raw = statSync(tmp).size;
    if (raw < 1_000_000) throw new Error(`got ${raw} bytes, probably an error page, not audio`);

    console.log(`${label}, ${mb(raw)} wav, transcoding…`);
    execFileSync(
      "ffmpeg",
      ["-v", "error", "-y", "-i", tmp, "-ac", "1", "-ar", "44100", "-b:a", "64k", "-codec:a", "libmp3lame", target],
      { stdio: "inherit" },
    );

    console.log(`${label}, done, ${mb(statSync(target).size)} mp3`);
    done.push(story.slug);
  } catch (err) {
    console.error(`${label}, FAILED: ${err.message}`);
    failed.push(story.slug);
  } finally {
    rmSync(tmp, { force: true });
  }
}

console.log(`\n${done.length} local, ${failed.length} failed.`);
if (failed.length) console.log("Failed:", failed.join(", "));

// Sync the `local` flags to what is actually on disk, so the data file can never
// promise a tape the site does not have (or hide one it does).
syncFlags();

function syncFlags() {
  const path = join(root, "data", "audio.ts");
  let text = readFileSync(path, "utf8");
  let changed = 0;

  text = text.replace(
    /(slug:\s*"([^"]+)"[\s\S]*?local:\s*)(true|false)/g,
    (whole, head, slug, was) => {
      const is = existsSync(join(outDir, `${slug}.mp3`));
      if (String(is) === was) return whole;
      changed += 1;
      return head + String(is);
    },
  );

  if (changed) {
    writeFileSync(path, text);
    console.log(`Updated ${changed} local flag(s) in data/audio.ts.`);
  } else {
    console.log("data/audio.ts already matches public/audio.");
  }
}

"""
Pre-optimise the work images.

    python scripts/optimise-images.py

Next's image optimiser resizes on request, but it still has to decode the
source every time a new size is asked for. Multi-megabyte PNG screenshots make
that slow enough to stall the dev server, and they cost real time on the first
production request too. This shrinks the sources to something sane once:

  * screenshots convert from PNG to JPEG (they are photos, not flat graphics)
  * nothing is kept larger than it is ever displayed
  * quality 82, which is visually indistinguishable here

Requires ffmpeg. Originals are moved to public/_originals so nothing is lost.
"""

import os
import shutil
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
WORK = os.path.join(ROOT, "public", "work")
KEEP = os.path.join(ROOT, "public", "_originals")

# filename pattern -> (max width, max height)
LIMITS = {
    "instagram-grid": (1600, 1600),  # wide banner, full content width
    "film-": (720, 1280),  # vertical stills, shown ~400px wide at most
    "promo-": (720, 1280),
    "yt-": (1280, 720),  # youtube thumbnails, already 16:9
}


def limit_for(name):
    for prefix, dims in LIMITS.items():
        if name.startswith(prefix) or prefix in name:
            return dims
    return (1280, 1280)


def main():
    if not shutil.which("ffmpeg"):
        raise SystemExit("ffmpeg not found on PATH")

    os.makedirs(KEEP, exist_ok=True)
    before = after = 0
    renames = []

    for folder in sorted(os.listdir(WORK)):
        d = os.path.join(WORK, folder)
        if not os.path.isdir(d):
            continue
        for name in sorted(os.listdir(d)):
            src = os.path.join(d, name)
            stem, ext = os.path.splitext(name)
            if ext.lower() not in (".png", ".jpg", ".jpeg"):
                continue

            size_in = os.path.getsize(src)
            before += size_in
            w, h = limit_for(stem)
            out = os.path.join(d, stem + ".jpg")
            tmp = out + ".tmp.jpg"

            subprocess.run(
                ["ffmpeg", "-v", "error", "-y", "-i", src,
                 "-vf", f"scale='min({w},iw)':'min({h},ih)':force_original_aspect_ratio=decrease",
                 "-q:v", "4", tmp],
                check=True,
            )

            # Keep the original somewhere retrievable.
            backup = os.path.join(KEEP, f"{folder}__{name}")
            if not os.path.exists(backup):
                shutil.copy2(src, backup)

            if ext.lower() == ".png":
                os.remove(src)
                renames.append((f"/work/{folder}/{name}", f"/work/{folder}/{stem}.jpg"))
            os.replace(tmp, out)

            size_out = os.path.getsize(out)
            after += size_out
            print(f"  {size_in // 1024:>5} -> {size_out // 1024:>4} KB  {folder}/{stem}.jpg")

    print(f"\n{before // 1024} KB -> {after // 1024} KB "
          f"({100 - after * 100 // max(before, 1)}% smaller)")
    if renames:
        print("\nExtension changed, update these paths in data/projects.ts:")
        for a, b in renames:
            print(f"  {a}  ->  {b}")


if __name__ == "__main__":
    main()

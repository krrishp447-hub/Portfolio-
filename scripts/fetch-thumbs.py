"""
Pull YouTube thumbnails for the Ek Sur clips shown on the site.

    python scripts/fetch-thumbs.py

maxresdefault is not generated for every upload, so each id falls back to
hqdefault. Re-running is safe: existing files are skipped.
"""

import os
import subprocess

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, "public", "work", "ek-sur")

# (slug, video id) - the six most watched on the channel.
CLIPS = [
    ("koi-kahe-krishna", "afFXCvhmq0Y"),
    ("bappa-morya", "7fUOmfMHmPw"),
    ("geet-govind", "c4ZIV-dOfWc"),
    ("shyama-shyam", "d6Xe52S2_bk"),
    ("christmas-across-the-bridge", "tqzTfyhSD7c"),
    ("allah-ke-bande", "LvKH8IAyE9g"),
]


def grab(url, target):
    subprocess.run(["curl", "-sL", "--fail", "-o", target, url], check=True)
    return os.path.getsize(target)


def main():
    os.makedirs(OUT, exist_ok=True)
    for slug, vid in CLIPS:
        target = os.path.join(OUT, f"yt-{slug}.jpg")
        if os.path.exists(target):
            print(f"{slug}: already local")
            continue
        for quality in ("maxresdefault", "hqdefault"):
            try:
                size = grab(f"https://img.youtube.com/vi/{vid}/{quality}.jpg", target)
                # YouTube serves a ~1KB grey placeholder when a size is missing.
                if size > 5000:
                    print(f"{slug}: {quality}, {size // 1024}KB")
                    break
                print(f"{slug}: {quality} was a placeholder, trying next")
            except subprocess.CalledProcessError:
                print(f"{slug}: {quality} not available")
        else:
            print(f"{slug}: FAILED")


if __name__ == "__main__":
    main()

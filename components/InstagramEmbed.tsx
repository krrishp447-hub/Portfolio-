/**
 * An Instagram post or reel, mirrored in place.
 *
 * Uses Instagram's own /embed endpoint in a plain iframe rather than their
 * embed.js script: no third-party JavaScript on the page, no access token, and
 * nothing to break when Meta changes their SDK. The trade-off is that each
 * iframe loads a full Instagram page, so they are lazy and only fetch when
 * scrolled to.
 *
 * Accepts any post or reel URL, or a bare shortcode.
 */

/** Pulls the shortcode out of /p/<code>/, /reel/<code>/, /tv/<code>/ or a bare code. */
export function shortcodeOf(input: string) {
  const m = input.match(/instagram\.com\/(?:p|reel|reels|tv)\/([A-Za-z0-9_-]+)/);
  if (m) return m[1];
  const bare = input.match(/^[A-Za-z0-9_-]+$/);
  return bare ? input : null;
}

export function InstagramEmbed({ url, title }: { url: string; title: string }) {
  const code = shortcodeOf(url);

  if (!code) {
    return (
      <div className="frame-placeholder flex items-end p-3" style={{ aspectRatio: "9/16" }}>
        <span className="annotation leading-tight">Unrecognised Instagram URL</span>
      </div>
    );
  }

  return (
    <div
      className="overflow-hidden rounded-sm border border-ink bg-white"
      style={{ aspectRatio: "9/16" }}
    >
      <iframe
        src={`https://www.instagram.com/p/${code}/embed/captioned/`}
        title={title}
        loading="lazy"
        scrolling="no"
        allow="encrypted-media; picture-in-picture; clipboard-write"
        allowFullScreen
        className="h-full w-full border-0"
      />
    </div>
  );
}

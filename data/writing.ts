/**
 * The written archive, pulled from Krish’s Drive portfolio.
 *
 * IMPORTANT: these links resolve only while that Drive folder stays shared with
 * "anyone with the link". If sharing changes, every link here 404s silently.
 * The durable fix is to host copies in /public and point at those.
 *
 * Audio stories live in data/audio.ts, they have their own player.
 */

const FILE = "https://drive.google.com/file/d/";
const DOC = "https://docs.google.com/document/d/";

/** Drive gives Docs a longer id than uploaded files, so the viewer differs. */
function link(id: string) {
  return id.length > 40 ? `${DOC}${id}/view` : `${FILE}${id}/view`;
}

export type Article = { title: string; topic: string; href: string };

/**
 * Grouped by subject rather than listed flat, fourteen consecutive rows read as
 * a wall, three short groups read as range.
 */
export const articleGroups: { heading: string; articles: Article[] }[] = [
  {
    heading: "Money",
    articles: [
      { title: "Union Budget 2026-27, explained for the aam Indian citizen", topic: "Policy", href: link("1y-JBdgYfC5NMOHS-9lFUPSvTfnMkcdO2") },
      { title: "What is SWP in mutual funds", topic: "Investing", href: link("1gwt93bjoWDl1POOn15ZrJRubrSkw2mSI") },
      { title: "Confused about how to start investing?", topic: "Explainer", href: link("1c3yjTSH_KjHHIJFeJ6CuKYeNCGKwKevhqmnltM_0y5w") },
    ],
  },
  {
    heading: "Technology & media",
    articles: [
      { title: "The AI boom, explained", topic: "AI", href: link("10uX3KjF2pn6sUKvCp6B4Mkfvdg3NqIoT") },
      { title: "AI’s impact on advertising and content", topic: "AI", href: link("1Dd422eSd79oqrxOCNgQKmYiP204kCEbFvXJt11sgmqU") },
      { title: "Cracking the creator economy in 2025: is it too late to start?", topic: "Creators", href: link("1ezFKCfra13vZ1qrUHiRi0iP4NS6b3qmY") },
      { title: "Doomscrolling, digital exhaustion & Gen Z mental health", topic: "Culture", href: link("1eEFiRfi88w9WtCj0jZjubFJxlUL3k-TR") },
    ],
  },
  {
    heading: "Health & awareness",
    articles: [
      { title: "Relieve shoulder tension: 4 gentle seated yoga stretches for seniors", topic: "Health", href: link("1wp_Co_aXsoN5MYy6SkYT8zuuaR-wQYHc") },
      { title: "World Braille Day", topic: "Awareness", href: link("1hYqrYKZIJId9TJ8n-7H1AUzhJjzfrlLI") },
      { title: "Self Injury Awareness Day", topic: "Awareness", href: link("1DrHADKjJyKXCxvDhZdSDCq7-LP6JWEhf") },
    ],
  },
];

/**
 * The how-to series. Fifteen short, near-identical titles, the point is the
 * span of the series, not any single entry, so these render as a light grid
 * rather than fifteen bordered rows.
 */
export const scripts: Article[] = [
  { title: "Registering on Paytm", topic: "Payments", href: link("1uh6PZNrogWI_-49OozgQXaYetW20wv6_") },
  { title: "Net banking payments", topic: "Payments", href: link("1Z3aNCDZyQ0U3XIeV8etD_D6iviXMyRQi") },
  { title: "Online shopping on Amazon", topic: "Shopping", href: link("1ipTHKX3XhUBAeJW1K_pDIKUibH-KgCC-") },
  { title: "Booking a cab, Ola for dadi", topic: "Travel", href: link("1zhe1xp8W6lsu1viuKaaPrnbFGIdPCRD7") },
  { title: "Using Google Maps", topic: "Travel", href: link("1vuHZp4KJ5GLUWCQY2qyH90F4vPWef-6v") },
  { title: "Video calling on Zoom", topic: "Connecting", href: link("1bzXkLLDqBuTp48x93Ss3mnqq7H7jhob7") },
];

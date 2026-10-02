/**
 * The anime-mode panel sequence.
 *
 * A note on the lines below: these are ORIGINAL, written for this site in an
 * anime register and tied to Krish's actual work. They are deliberately not
 * lifted from real series. Quoting a famous anime line from memory risks
 * misquoting it and misattributing it on someone's portfolio, and a borrowed
 * line says nothing about him anyway. Swap any of these for a real quote if you
 * want one, and put the series in `attribution` so the credit is visible.
 *
 * `art` picks which panel drawing is used. See AnimeFlow.
 */

export type AnimePanel = {
  id: string;
  /** Small panel marker, top left. */
  kicker: string;
  line: string;
  sub?: string;
  /** Series name, if you ever swap `line` for a real quote. */
  attribution?: string;
  art: "slash" | "figure" | "impact" | "sunrise";
};

export const animePanels: AnimePanel[] = [
  {
    id: "01",
    kicker: "第一話 · Episode one",
    line: "The first cut is the thumbnail.",
    sub: "Nobody judges the work. They judge the frame around it.",
    art: "slash",
  },
  {
    id: "02",
    kicker: "第二話 · Episode two",
    line: "Zero subscribers. Zero excuses.",
    sub: "Every early upload is a cold test with no data to hide behind.",
    art: "figure",
  },
  {
    id: "03",
    kicker: "第三話 · Episode three",
    line: "Retention is a duel.",
    sub: "You win it in the first ten seconds or you do not win it.",
    art: "impact",
  },
  {
    id: "04",
    kicker: "最終話 · Final episode",
    line: "Ship. Read the data. Sharpen. Again.",
    sub: "One tune, many voices. That is the whole job.",
    art: "sunrise",
  },
];

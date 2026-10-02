/**
 * Fragments of thought, not blog posts.
 *
 * The questions are Krish’s. The `note` bodies are deliberately UNWRITTEN:
 * putting words in his mouth about how he thinks would be the one thing this
 * site cannot afford to fake. Each carries a neutral framing line plus a draft
 * marker. Replace `note` with real writing and the marker disappears.
 */

export type Thought = {
  id: string;
  title: string;
  date: string;
  excerpt: string;
  note: string[];
  /** Optional image path from /public. */
  image?: string;
  /** Optional outbound link. */
  link?: { label: string; href: string };
};

export const thoughts: Thought[] = [
  {
    id: "001",
    title: "Why do some thumbnails work?",
    date: "September 2026",
    excerpt: "Two thumbnails, same video, wildly different outcomes. The variable is rarely the one you expect.",
    note: [
      "Across Ek Sur and the Gen S Life handles, changing the thumbnail moved click-through more than changing the video did. Same content, different frame, completely different outcome.",
      "What I still cannot do is predict which frame. I can tell you afterwards why one worked. That is not the same skill, and pretending otherwise is how people waste months.",
    ],
  },
  {
    id: "002",
    title: "Can AI actually make research faster?",
    date: "August 2026",
    excerpt: "Faster to a first draft, certainly. Faster to something true is a different question.",
    note: [
      "It gets me to a first draft much faster. Getting to something true takes about as long as it always did, because now I am checking the model instead of checking the sources.",
      "So the saving is real, it just moved. Worth knowing before you promise anyone a faster turnaround.",
    ],
  },
  {
    id: "003",
    title: "Why do people stop scrolling?",
    date: "August 2026",
    excerpt: "Retention data tells you when. It is much quieter about why.",
    note: [
      "Retention graphs tell you the second attention broke. They are completely silent about why.",
      "I have started watching the ten seconds before the drop instead of the drop itself. Usually the mistake happened earlier than the graph suggests.",
    ],
  },
  {
    id: "006",
    title: "What makes a website feel alive?",
    date: "September 2026",
    excerpt: "Not motion. Something closer to evidence that a person is still on the other side of it.",
    note: [
      "Building this one changed my answer. I assumed it was motion. It is not.",
      "It is evidence that somebody is still on the other side. A status section that is genuinely current does more than any animation, and it is far harder to fake.",
    ],
  },
];

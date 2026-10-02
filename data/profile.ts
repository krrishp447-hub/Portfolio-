/**
 * Identity, hero copy, proof numbers, socials.
 *
 * CONTENT RULE: nothing in here is invented. Numbers come from Krish’s résumé.
 * Anything unverified is written as a [BRACKETED PLACEHOLDER] so it is obvious
 * on the page and in the data. Never replace a placeholder with a guess.
 */

export const profile = {
  name: "Krish Patil",
  positioning: "Content × Research × Technology",
  line: "A researcher who makes things.",
  intro:
    "I work across content, research, digital strategy and technology, exploring how ideas can be turned into useful things.",
  location: "Mumbai, India",
  status: "Currently exploring AI × Content × Systems",
  /** Drop a file in /public and put its path here. Empty string renders the editorial placeholder. */
  portrait: "",
  portraitAlt: "Krish Patil",
};

export const socials = [
  { label: "Email", href: "mailto:krrishp447@gmail.com", display: "krrishp447@gmail.com" },
  { label: "Résumé", href: "/resume.pdf", display: "Download PDF" },
  { label: "LinkedIn", href: "", display: "[ADD LINK]" },
  { label: "Instagram", href: "", display: "[ADD LINK]" },
] as const;

/**
 * Proof numbers. Every figure below is résumé-verified.
 * Note: 400K+ is the verified view count, do not round it up to 500K.
 * Note: 2.5+ years counts from the first content role (Dec 2023).
 */
export const stats = [
  { value: "400K+", label: "Views across YouTube & Instagram", note: "Across multiple handles" },
  { value: "₹1L+", label: "Cumulative conversion value", note: "On ₹50K+/mo Meta ad budgets" },
  { value: "2.5+", label: "Years around content", note: "Research, strategy, operations" },
  { value: "AI + AUTO", label: "Systems & experiments", note: "Workflows, agents, pipelines" },
];

export const about = {
  heading: "Who is Krish?",
  paragraphs: [
    "I’m Krish.",
    "I work somewhere between content, research and technology.",
    "I’ve worked across writing, research, content operations, YouTube, digital campaigns and strategy. Over time, I’ve become increasingly interested in what happens behind the content: how ideas are researched, how systems are built, how people respond, and how the whole process can be made better.",
  ],
  rhythm: [
    "Sometimes I write.",
    "Sometimes I research.",
    "Sometimes I build.",
    "Sometimes I automate something that probably didn’t need to be automated.",
  ],
};

export const identityCard = {
  Name: ["Krish Patil"],
  Based: ["Mumbai, India"],
  "Working with": ["Content", "Research", "Strategy", "Technology"],
  "Curious about": ["AI", "Media", "People", "Systems", "Technology"],
  Languages: ["English", "Hindi", "Marathi"],
};

/** Fragments of identity, not job titles. */
export const tags = [
  "Researcher",
  "Writer",
  "Strategist",
  "Creator",
  "Experimenter",
  "Builder",
  "Curious person",
];

export const contact = {
  heading: "Have something interesting?",
  body: "If you’re building something interesting, researching something weird, or just want to talk about an idea, say hello.",
};

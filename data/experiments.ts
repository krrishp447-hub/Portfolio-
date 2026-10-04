/**
 * The BUILD section. Real experiments only.
 *
 * `status` is honest on purpose: "running" means it exists and is in use,
 * "prototype" means it works but is not load-bearing, "idea" means it does not
 * exist yet. Nothing here should claim to be further along than it is.
 */

export type Experiment = {
  title: string;
  status: "running" | "demo" | "prototype" | "idea";
  stack: string[];
  description: string;
  flow: string[];
  /** A live link. The whole point of building something is that it can be opened. */
  link?: { label: string; href: string };
};

export const buildIntro =
  "I like understanding how things work, then making them work better. This is not software engineering, it’s what happens when a repetitive content problem meets an afternoon and too much curiosity.";

export const experiments: Experiment[] = [
  {
    title: "SEO & AEO automation agent",
    status: "prototype",
    stack: ["Node", "Express", "Playwright", "Gemini", "SQLite", "cron"],
    description:
      "Crawls a site, reads what is actually on the page, and generates the structured data that search engines and answer engines need. Runs on a schedule rather than when someone remembers.",
    flow: ["Crawl", "Extract", "Generate schema", "Dashboard"],
    link: {
      label: "Source on GitHub",
      href: "https://github.com/krrishp447-hub/seo-aeo-automation-agent",
    },
  },
  {
    title: "Legacy 28",
    status: "demo",
    stack: ["Next.js", "Vercel"],
    description:
      "Front-end build for a streetwear and apparel manufacturer, pitched around doing cutting, sewing, printing and finishing under one roof.",
    flow: ["Brief", "Design", "Build", "Ship"],
    link: { label: "Open the site", href: "https://legacy28.vercel.app/" },
  },
  {
    title: "Rekindle for Men",
    status: "demo",
    stack: ["Next.js", "Vercel"],
    description:
      "A landing page for a men's supplement brand. One page, one job: get the proposition across and send people to the next step.",
    flow: ["Brief", "Copy", "Build", "Ship"],
    link: { label: "Open the site", href: "https://rekindle-for-men-landing.vercel.app/" },
  },
  {
    title: "AI content workflow",
    status: "prototype",
    stack: ["n8n", "Supabase", "APIs"],
    description:
      "Research in, structured content out, with the model doing the processing rather than the deciding.",
    flow: ["Research", "AI processing", "Database", "Output"],
  },
  {
    title: "Automated research system",
    status: "prototype",
    stack: ["n8n", "APIs", "Google Sheets"],
    description:
      "Search, extract, organise, analyse. Built to collapse the tedious half of a research pass.",
    flow: ["Search", "Extract", "Organise", "Analyse"],
  },
  {
    title: "Content operations",
    status: "running",
    stack: ["CMS", "Analytics", "Notion"],
    description:
      "The unglamorous spine of everything else, calendar through to analytics, so publishing stops being a decision.",
    flow: ["Calendar", "CMS", "Publishing", "Analytics"],
  },
];


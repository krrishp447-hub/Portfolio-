/**
 * The BUILD section. Real experiments only.
 *
 * `status` is honest on purpose: "running" means it exists and is in use,
 * "prototype" means it works but is not load-bearing, "idea" means it does not
 * exist yet. Nothing here should claim to be further along than it is.
 */

export type Experiment = {
  title: string;
  status: "running" | "prototype" | "idea";
  stack: string[];
  description: string;
  flow: string[];
};

export const buildIntro =
  "I like understanding how things work, then making them work better. This is not software engineering, it’s what happens when a repetitive content problem meets an afternoon and too much curiosity.";

export const experiments: Experiment[] = [
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


/** Chapters of the archive. Drives both the navigation and the section headers. */
export const sections = [
  { id: "me", num: "01", label: "Me" },
  { id: "work", num: "02", label: "Work" },
  { id: "brain", num: "03", label: "Brain" },
  { id: "build", num: "04", label: "Build" },
  { id: "now", num: "05", label: "Now" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

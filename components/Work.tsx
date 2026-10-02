"use client";

import { useState } from "react";
import { projects, type Project } from "@/data/projects";
import { CaseStudy } from "./CaseStudy";
import { ProjectCard } from "./ProjectCard";
import { SectionHeader } from "./SectionHeader";
import { Writing } from "./Writing";
import { CassettePlayer } from "./CassettePlayer";

export function Work() {
  const [open, setOpen] = useState<Project | null>(null);

  return (
    <section id="work" className="scroll-mt-16 px-5 py-20 sm:px-6 sm:py-28 md:px-12 md:py-52">
      <SectionHeader
        num="02"
        label="Work"
        heading="Things I’ve spent time making."
        aside="Three chapters"
      />

      <div className="space-y-24 sm:space-y-32 md:space-y-56">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} onOpen={setOpen} />
        ))}

        <div>
          <Writing />
          <CassettePlayer />
        </div>
      </div>

      <CaseStudy project={open} onClose={() => setOpen(null)} />
    </section>
  );
}

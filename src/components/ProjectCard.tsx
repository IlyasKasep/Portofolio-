import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

import ProjectMediaCarousel from "@/components/ProjectMediaCarousel";
import type { Project } from "@/domain/content/types";

interface ProjectCardProps {
  project: Project;
  index: number;
}

function getTechBadgeStyle(tech: string) {
  const t = tech.toLowerCase();
  if (t.includes("react") || t.includes("next")) {
    return "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-300";
  }
  if (t.includes("tailwind")) {
    return "border-cyan-500/30 bg-cyan-500/10 text-cyan-600 dark:text-cyan-300";
  }
  if (t.includes("typescript") || t.includes("ts")) {
    return "border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-300";
  }
  if (t.includes("javascript") || t.includes("js")) {
    return "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300";
  }
  if (t.includes("php") || t.includes("codeigniter") || t.includes("laravel")) {
    return "border-rose-500/30 bg-rose-500/10 text-rose-600 dark:text-rose-300";
  }
  if (t.includes("mysql") || t.includes("postgres") || t.includes("database")) {
    return "border-indigo-500/30 bg-indigo-500/10 text-indigo-600 dark:text-indigo-300";
  }
  if (t.includes("firebase") || t.includes("auth")) {
    return "border-orange-500/30 bg-orange-500/10 text-orange-600 dark:text-orange-300";
  }
  if (t.includes("bootstrap")) {
    return "border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-300";
  }
  if (t.includes("node") || t.includes("express")) {
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-300";
  }
  return "border-violet-500/30 bg-violet-500/10 text-violet-600 dark:text-violet-300";
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const isReversed = index % 2 !== 0;

  return (
    <article
      data-project-card
      className={`grid gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 lg:will-change-[transform,opacity] ${
        isReversed ? "lg:[direction:rtl]" : ""
      }`}
    >
      <ProjectMediaCarousel
        projectNumber={project.number}
        eagerFirstImage={index === 0}
        images={project.images}
      />

      {/* Content */}
      <div className="flex flex-col justify-center lg:[direction:ltr]">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-[0.65rem] uppercase tracking-[0.26em] text-foreground/50">
              {project.role}
            </span>
            <span className="rounded-full border border-violet-500/30 bg-violet-500/10 px-2.5 py-0.5 font-mono text-[0.55rem] font-semibold uppercase tracking-[0.16em] text-violet-600 dark:text-violet-300">
              {project.category}
            </span>
          </div>

          <Link
            href={`/projects/${project.id}`}
            className="group/title mt-4 inline-flex items-start gap-3"
          >
            <h3 className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.05] tracking-[-0.04em] transition-all duration-300 group-hover/title:bg-gradient-to-r group-hover/title:from-violet-600 group-hover/title:via-sky-500 group-hover/title:to-emerald-500 group-hover/title:bg-clip-text group-hover/title:text-transparent">
              {project.name}
            </h3>
            <ArrowUpRight
              aria-hidden="true"
              className="mt-1 size-5 shrink-0 text-foreground/35 transition-transform duration-300 group-hover/title:-translate-y-0.5 group-hover/title:translate-x-0.5 group-hover/title:text-violet-600 sm:size-6"
            />
          </Link>

          <p className="mt-4 max-w-[55ch] text-sm leading-relaxed text-foreground/65 sm:text-base sm:leading-[1.7]">
            {project.summary}
          </p>
        </div>

        {/* Highlights */}
        <div className="mt-6 sm:mt-8">
          <p className="mb-2 text-[0.6rem] font-bold uppercase tracking-[0.24em] text-foreground/40 sm:mb-3 sm:text-xs">
            Highlights
          </p>
          <ul className="space-y-2">
            {project.highlights.map((highlight, i) => (
              <li
                key={highlight}
                className="flex items-start gap-3 text-[0.75rem] leading-relaxed text-foreground/75 sm:text-sm"
              >
                <span className="mt-0.5 font-mono text-[0.6rem] font-semibold text-sky-500">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="mt-6 flex flex-wrap gap-2 sm:mt-8">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className={`rounded-full border px-3 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] transition-transform duration-200 hover:scale-105 sm:text-xs ${getTechBadgeStyle(
                tech,
              )}`}
            >
              {tech}
            </span>
          ))}
        </div>

        <Link
          href={`/projects/${project.id}`}
          className="group/link mt-8 inline-flex w-fit items-center gap-3 border-b border-foreground/25 pb-1.5 font-mono text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-foreground transition-colors hover:border-violet-500 hover:text-violet-600 sm:mt-10"
        >
          View project
          <ArrowUpRight
            aria-hidden="true"
            className="size-4 transition-transform duration-300 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
          />
        </Link>
      </div>
    </article>
  );
}

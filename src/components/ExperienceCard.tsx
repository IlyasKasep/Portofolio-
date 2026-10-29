import Image from "next/image";
import type { Experience } from "@/domain/content/types";
import { cn } from "@/lib/utils";

export type { Experience } from "@/domain/content/types";

interface ExperienceCardProps {
  experience: Experience;
  index: number;
  className?: string;
}

function formatCardNumber(value: number) {
  return String(value).padStart(2, "0");
}

function getTypeDotColor(type: string) {
  const t = type.toLowerCase();
  if (t.includes("work")) {
    return "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]";
  }
  if (t.includes("intern")) {
    return "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]";
  }
  if (t.includes("committee")) {
    return "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]";
  }
  if (t.includes("organization")) {
    return "bg-fuchsia-400 shadow-[0_0_8px_rgba(232,121,249,0.8)]";
  }
  return "bg-violet-400 shadow-[0_0_8px_rgba(167,139,250,0.8)]";
}

function ExperienceVisual({ experience }: { experience: Experience }) {
  if (experience.image) {
    return (
      <Image
        src={experience.image}
        alt={experience.imageAlt}
        fill
        sizes="(min-width: 1024px) 440px, 100vw"
        className="h-full w-full object-cover object-[center_62%] transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] lg:group-hover/media:scale-105 motion-reduce:transition-none motion-reduce:group-hover/media:scale-100"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950/70 to-slate-900"
      aria-hidden="true"
    >
      <div className="absolute inset-5 border border-cyan-500/20 sm:inset-7" />
      <div className="absolute -right-20 top-16 h-px w-[130%] -rotate-12 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
      <div className="absolute -left-16 bottom-28 h-px w-[130%] rotate-12 bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent" />
      <div className="absolute right-8 top-8 font-mono text-[0.65rem] uppercase tracking-[0.28em] text-cyan-400">
        Selected work
      </div>

      <div className="absolute inset-x-8 bottom-8 sm:inset-x-10 sm:bottom-10">
        <p className="bg-gradient-to-br from-cyan-400 via-sky-300 to-emerald-400 bg-clip-text text-[clamp(5.5rem,14vw,10rem)] font-bold leading-[0.72] tracking-[-0.09em] text-transparent drop-shadow-[0_0_35px_rgba(34,211,238,0.25)]">
          {experience.monogram}
        </p>
        <p className="mt-8 max-w-[24rem] text-sm font-semibold uppercase leading-relaxed tracking-[0.18em] text-white/90">
          {experience.company}
        </p>
      </div>
    </div>
  );
}

export default function ExperienceCard({
  experience,
  index,
  className,
}: ExperienceCardProps) {
  return (
    <article
      id={`experience-${experience.id}`}
      data-experience-card
      className={cn(
        "experience-card grid h-full w-[calc(100vw-2rem)] shrink-0 snap-center grid-rows-[auto_minmax(10rem,1fr)] overflow-hidden border border-white/10 bg-card text-card-foreground shadow-[0_32px_90px_rgba(0,0,0,0.28)] sm:w-[calc(100vw-5rem)] sm:grid-rows-[auto_minmax(12rem,1fr)] md:snap-none md:grid-cols-[1.28fr_0.92fr] md:grid-rows-none lg:w-[min(1120px,calc(100vw-12rem))] motion-reduce:h-auto motion-reduce:w-full motion-reduce:snap-none",
        className,
      )}
    >
      <div className="flex min-h-0 flex-col overflow-hidden px-5 py-4 sm:px-8 sm:py-6 lg:px-14 lg:py-12">
        <header>
          <div className="flex flex-wrap items-center gap-2 font-mono text-[0.58rem] uppercase tracking-[0.24em] text-card-foreground/50 sm:gap-2.5 sm:text-[0.65rem]">
            <span>Experience</span>
            <span className="text-card-foreground/25" aria-hidden="true">/</span>
            <span className="inline-flex items-center gap-1.5 font-medium tracking-[0.18em] text-card-foreground/85">
              <span
                className={cn("size-1.5 rounded-full shrink-0", getTypeDotColor(experience.type))}
                aria-hidden="true"
              />
              <span>{experience.type}</span>
            </span>
          </div>

          <h3 className="mt-3 max-w-[16ch] text-[clamp(1.45rem,6.8vw,1.9rem)] font-bold uppercase leading-[0.9] tracking-[-0.055em] sm:mt-4 sm:text-[clamp(2rem,4.2vw,4rem)] sm:leading-[0.93] lg:mt-7">
            {experience.role}
          </h3>

          <p className="mt-3 text-[0.68rem] font-bold uppercase leading-relaxed tracking-[0.08em] sm:mt-4 sm:text-sm lg:mt-5 lg:text-base">
            {experience.company}
          </p>
        </header>

        <p className="mt-3 max-w-[55ch] text-[0.7rem] leading-[1.4] text-card-foreground/75 sm:mt-6 sm:text-base sm:leading-[1.55] lg:mt-auto lg:pt-14 lg:text-lg lg:leading-[1.65]">
          {experience.summary}
        </p>

        <div className="mt-3 sm:mt-6 lg:mt-10">
          <p className="mb-1.5 text-[0.55rem] font-bold uppercase tracking-[0.24em] text-card-foreground/50 sm:mb-3 sm:text-xs lg:mb-4">
            Highlights
          </p>
          <ol className="grid sm:grid-cols-2">
            {experience.highlights.map((highlight, highlightIndex) => (
              <li
                key={highlight}
                className="flex items-center gap-2 border-t border-card-foreground/18 py-1.5 pr-2 sm:min-h-12 sm:gap-3 sm:py-3 sm:pr-4 lg:min-h-16 lg:gap-4 lg:py-4"
              >
                <span className="font-mono text-[0.55rem] font-semibold text-sky-500/80 sm:text-xs">
                  {formatCardNumber(highlightIndex + 1)}
                </span>
                <span className="text-[0.58rem] font-semibold uppercase leading-[1.25] tracking-[0.06em] sm:text-[0.72rem] sm:leading-relaxed lg:text-[0.8rem]">
                  {highlight}
                </span>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="group/media relative min-h-0 overflow-hidden border-t border-card-foreground/12 bg-black/90 md:min-h-full md:border-l md:border-t-0">
        <ExperienceVisual experience={experience} />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/55 via-black/5 to-transparent" />
        <p className="absolute right-5 top-4 font-mono text-3xl font-semibold text-white sm:right-7 sm:top-6 sm:text-4xl">
          {formatCardNumber(index + 1)}
        </p>
        <p className="absolute bottom-4 left-5 flex max-w-[calc(100%-2.5rem)] flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-white sm:bottom-6 sm:left-7 sm:max-w-[calc(100%-3.5rem)] sm:text-xs sm:tracking-[0.22em]">
          <span>{experience.period}</span>
          <span aria-hidden="true">·</span>
          <span>{experience.duration}</span>
        </p>
      </div>
    </article>
  );
}

"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type IntroLinePart = {
  text: string;
  highlight: boolean;
  italic?: boolean;
  gradientClass?: string;
};

const lines: IntroLinePart[][] = [
  [
    { text: "Saya merancang & membangun", highlight: false },
    {
      text: "antarmuka web yang hidup,",
      highlight: true,
      italic: true,
      gradientClass:
        "bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 bg-clip-text text-transparent",
    },
  ],
  [
    { text: "fokus pada detail interaksi,", highlight: false },
    {
      text: "desain responsif,",
      highlight: true,
      gradientClass:
        "bg-gradient-to-r from-amber-300 via-orange-400 to-rose-400 bg-clip-text text-transparent",
    },
  ],
  [
    {
      text: "serta performa kode yang optimal—",
      highlight: true,
      gradientClass:
        "bg-gradient-to-r from-sky-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent",
    },
  ],
  [{ text: "menerjemahkan ide visual dari desain", highlight: false }],
  [
    { text: "menjadi", highlight: false },
    {
      text: "pengalaman digital yang bermakna.",
      highlight: true,
      italic: true,
      gradientClass:
        "bg-gradient-to-r from-violet-400 via-fuchsia-300 to-pink-400 bg-clip-text text-transparent",
    },
  ],
];

function getSkillColor(skill: string) {
  const s = skill.toLowerCase();
  if (s.includes("react")) return "text-sky-400 hover:text-sky-300";
  if (s.includes("next")) return "text-white hover:text-sky-200";
  if (s.includes("tailwind")) return "text-cyan-400 hover:text-cyan-300";
  if (s.includes("typescript")) return "text-blue-400 hover:text-blue-300";
  if (s.includes("javascript")) return "text-amber-400 hover:text-amber-300";
  if (s.includes("laravel")) return "text-rose-500 hover:text-rose-400";
  if (s.includes("node")) return "text-emerald-400 hover:text-emerald-300";
  if (s.includes("git")) return "text-orange-500 hover:text-orange-400";
  if (s.includes("figma")) return "text-pink-400 hover:text-pink-300";
  if (s.includes("redux")) return "text-purple-400 hover:text-purple-300";
  if (s.includes("mysql")) return "text-sky-300 hover:text-sky-200";
  if (s.includes("php")) return "text-indigo-400 hover:text-indigo-300";
  if (s.includes("supabase")) return "text-emerald-400 hover:text-emerald-300";
  return "text-indigo-300 hover:text-indigo-200";
}

const contextCards = [
  {
    index: "01",
    category: "Pendidikan",
    code: "INF · 2021",
    dotColor: "bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)]",
    title: "Teknik Informatika",
    subtitle: "Universitas Muhammadiyah Bandung",
    description:
      "Mahasiswa tingkat akhir (Semester 7) dengan antusiasme tinggi pada rekayasa web modern, performa kode, serta arsitektur data sistem.",
    badge: "Sem. 7 · 2021—2025",
    accentGlow: "from-sky-500/15 via-cyan-500/10 to-transparent",
    borderColor: "hover:border-sky-500/40",
  },
  {
    index: "02",
    category: "Asal & Domisili",
    code: "BDO · 6.9°S",
    dotColor: "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]",
    title: "Bandung, Indonesia",
    subtitle: "West Java · UTC+7",
    description:
      "Lahir dan berbasis di Bandung. Terbuka penuh untuk peluang kerja full-time, kontrak, maupun freelance secara onsite maupun remote.",
    badge: "Onsite · Remote",
    accentGlow: "from-emerald-500/15 via-teal-500/10 to-transparent",
    borderColor: "hover:border-emerald-500/40",
  },
  {
    index: "03",
    category: "Fokus & Passion",
    code: "DEV · SYS",
    dotColor: "bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]",
    title: "Web Design & Systems",
    subtitle: "Frontend & Fullstack Logic",
    description:
      "Sangat gemar mengulik website design, interaksi visual yang halus, serta merancang alur logika sistem database yang andal dan aman.",
    badge: "UI & Architecture",
    accentGlow: "from-amber-500/15 via-orange-500/10 to-transparent",
    borderColor: "hover:border-amber-500/40",
  },
];

export default function IntroSection({ skills }: { skills: string[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const shapeRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      // Snappy and responsive line reveal animation
      gsap.fromTo(
        ".line",
        {
          opacity: 0,
          yPercent: 100,
        },
        {
          opacity: 1,
          yPercent: 0,
          duration: 0.75,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );

      gsap.fromTo(
        shapeRef.current,
        {
          scaleY: 0.8,
          y: 20,
        },
        {
          scaleY: 1.3,
          y: -30,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: 1,
          },
        },
      );

      const cards = sectionRef.current?.querySelectorAll(".context-card");
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          {
            opacity: 0,
            y: 35,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.12,
            duration: 0.75,
            ease: "power3.out",
            scrollTrigger: {
              trigger: ".context-cards-grid",
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-labelledby="about-heading"
      className="relative flex h-fit flex-col items-center justify-center gap-20 overflow-hidden bg-subtle px-6 pb-32 pt-20"
    >
      <h2 id="about-heading" className="sr-only">
        Tentang Muhammad Ilyas Satria Fauzan, Web Developer
      </h2>

      {/* Vibrant Ambient Glow Behind Intro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/20 via-purple-500/15 to-transparent blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-28 h-80 w-80 rounded-full bg-gradient-to-bl from-cyan-500/15 via-sky-500/10 to-transparent blur-[100px]"
      />

      <div
        ref={shapeRef}
        className="absolute left-1/2 -top-31 h-[180px] w-[130vw] -translate-x-1/2 rounded-[50%] bg-subtle"
      />

      <p className="max-w-5xl text-center font-sans text-[clamp(1.75rem,3.8vw,3.6rem)] leading-[1.18] tracking-[-0.04em]">
        {lines.map((line, lineIndex) => (
          <span key={lineIndex} className="block overflow-hidden">
            <span className="line block will-change-transform">
              {line.map((part, partIndex) => (
                <span key={partIndex}>
                  {part.text.split(" ").map((word, wordIndex) => (
                    <span
                      key={`${lineIndex}-${partIndex}-${wordIndex}`}
                      className={`
                        mr-[0.14em] inline-block will-change-transform
                        ${
                          part.gradientClass
                            ? part.gradientClass
                            : part.highlight
                              ? "font-semibold text-white"
                              : "font-normal text-white/45"
                        }
                        ${
                          part.italic
                            ? "font-serif font-thin italic tracking-wide"
                            : ""
                        }
                      `}
                    >
                      {word}
                    </span>
                  ))}
                </span>
              ))}
            </span>
          </span>
        ))}
      </p>

      {/* Infinite Skills Marquee */}
      <div
        ref={marqueeRef}
        className="relative z-10 mt-8 w-full max-w-5xl overflow-hidden border-y border-white/10 py-6"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, white 20%, white 80%, transparent)",
        }}
      >
        <div className="animate-marquee flex gap-16 text-xs font-semibold uppercase tracking-[0.25em] text-white/50 sm:text-sm sm:gap-24">
          {/* First set */}
          {Array(3)
            .fill(skills)
            .flat()
            .map((skill, idx) => (
              <div
                key={`first-${idx}`}
                className="flex items-center gap-4 sm:gap-6"
              >
                <span
                  className={`${getSkillColor(skill)} transition-colors duration-300 cursor-default font-medium`}
                >
                  {skill}
                </span>
                <span className="text-white/20 select-none">✦</span>
              </div>
            ))}
          {/* Second set for infinite loop */}
          {Array(3)
            .fill(skills)
            .flat()
            .map((skill, idx) => (
              <div
                key={`second-${idx}`}
                className="flex items-center gap-4 sm:gap-6"
              >
                <span
                  className={`${getSkillColor(skill)} transition-colors duration-300 cursor-default font-medium`}
                >
                  {skill}
                </span>
                <span className="text-white/20 select-none">✦</span>
              </div>
            ))}
        </div>
      </div>

      {/* Profile Context Cards */}
      <div className="context-cards-grid relative z-10 mt-6 grid w-full max-w-5xl grid-cols-1 gap-5 sm:grid-cols-3 sm:gap-6">
        {contextCards.map((card) => (
          <div
            key={card.index}
            className={cn(
              "context-card group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-7 backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:bg-white/[0.05] hover:shadow-[0_20px_45px_rgba(0,0,0,0.45)]",
              card.borderColor,
            )}
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-2">
                  <span
                    className={cn("size-1.5 rounded-full shrink-0", card.dotColor)}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-white/50 transition-colors group-hover:text-white/80">
                    {card.index} / {card.category}
                  </span>
                </div>
                <span className="font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/35 transition-colors group-hover:text-white/60">
                  {card.badge}
                </span>
              </div>

              <div className="mt-5">
                <h3 className="font-sans text-lg font-bold tracking-[-0.02em] text-white sm:text-xl">
                  {card.title}
                </h3>
                <p className="mt-1 font-mono text-[0.62rem] uppercase tracking-wider text-white/40">
                  {card.subtitle}
                </p>
                <p className="mt-3.5 text-xs leading-relaxed text-white/65 transition-colors group-hover:text-white/80 sm:text-[0.8rem]">
                  {card.description}
                </p>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-white/5 pt-3 font-mono text-[0.55rem] uppercase tracking-[0.2em] text-white/25">
              <span>{card.code}</span>
              <span className="transition-transform duration-300 group-hover:translate-x-1 text-white/40">✦</span>
            </div>

            {/* Ambient Radial Glow on Hover */}
            <div
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute -bottom-10 -right-10 size-36 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100",
                card.accentGlow,
              )}
            />
          </div>
        ))}
      </div>
    </section>
  );
}

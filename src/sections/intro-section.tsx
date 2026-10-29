"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

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

export default function IntroSection({ skills }: { skills: string[] }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLParagraphElement | null>(null);
  const shapeRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const text = textRef.current;
      const section = sectionRef.current;
      if (!text || !section) return;

      const media = gsap.matchMedia();

      media.add(
        {
          reduceMotion: "(prefers-reduced-motion: reduce)",
          all: "(min-width: 0px)",
        },
        (context) => {
          const { reduceMotion } = context.conditions ?? {};
          const lineEls = text.querySelectorAll(".line");

          if (reduceMotion) {
            gsap.set(lineEls, { opacity: 1, y: 0, clearProps: "all" });
            return;
          }

          // Snappy, early-trigger entrance so text is visible immediately without scrolling deep
          gsap.fromTo(
            lineEls,
            {
              opacity: 0,
              y: 28,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              stagger: 0.07,
              ease: "power3.out",
              scrollTrigger: {
                trigger: text,
                start: "top 92%",
                toggleActions: "play none none reverse",
              },
            },
          );

          if (shapeRef.current) {
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
                  trigger: section,
                  start: "top bottom",
                  end: "top 20%",
                  scrub: 0.6,
                },
              },
            );
          }
        },
      );

      return () => media.revert();
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

      <p ref={textRef} className="max-w-5xl text-center font-sans text-[clamp(1.75rem,3.8vw,3.6rem)] leading-[1.18] tracking-[-0.04em]">
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
    </section>
  );
}

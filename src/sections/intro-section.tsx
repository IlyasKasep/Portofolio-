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
  const storyRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const text = textRef.current;
      const section = sectionRef.current;
      if (!text || !section) return;

      const media = gsap.matchMedia();

      media.add(
        {
          isDesktop: "(min-width: 1024px)",
          isMobileTablet: "(max-width: 1023px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isDesktop, reduceMotion } = context.conditions ?? {};
          const lineEls = text.querySelectorAll(".line");

          if (reduceMotion || !isDesktop) {
            gsap.set(lineEls, { opacity: 1, y: 0, clearProps: "all" });
            if (storyRef.current) {
              const storyItems = storyRef.current.querySelectorAll(".story-reveal");
              gsap.set(storyItems, { opacity: 1, y: 0, clearProps: "all" });
            }
            return;
          }

          // Desktop: Snappy, early-trigger entrance
          gsap.fromTo(
            lineEls,
            {
              opacity: 0,
              y: 18,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              stagger: 0.04,
              ease: "power3.out",
              scrollTrigger: {
                trigger: text,
                start: "top 95%",
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

          // Desktop: Story reveal
          if (storyRef.current) {
            const storyItems = storyRef.current.querySelectorAll(".story-reveal");
            gsap.fromTo(
              storyItems,
              {
                opacity: 0,
                y: 14,
              },
              {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.06,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: storyRef.current,
                  start: "top 92%",
                  toggleActions: "play none none reverse",
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
      className="relative flex h-fit flex-col items-center justify-center gap-16 overflow-hidden bg-subtle px-6 pb-32 pt-20 sm:gap-20"
    >
      <h2 id="about-heading" className="sr-only">
        Tentang Muhammad Ilyas Satria Fauzan, Web Developer
      </h2>

      {/* Vibrant Ambient Glow Behind Intro */}
      <div
        aria-hidden="true"
        className="pointer-events-none transform-gpu absolute -top-12 sm:-top-24 left-1/2 h-48 w-72 sm:h-[350px] sm:w-[600px] -translate-x-1/2 rounded-full bg-gradient-to-b from-indigo-500/20 via-purple-500/15 to-transparent blur-3xl sm:blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none transform-gpu absolute top-1/2 -right-28 hidden sm:block h-80 w-80 rounded-full bg-gradient-to-bl from-cyan-500/15 via-sky-500/10 to-transparent blur-[100px]"
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
        className="relative z-10 w-full max-w-5xl overflow-hidden border-y border-white/10 py-6"
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

      {/* Elegant Narrative Story & Profile Background */}
      <div
        ref={storyRef}
        className="relative z-10 w-full max-w-5xl"
      >
        {/* Narrative Prose */}
        <div className="story-reveal pb-10">
          <p className="font-sans text-base sm:text-lg md:text-xl font-light leading-relaxed tracking-[-0.015em] text-white/80">
            Mahasiswa tingkat akhir <span className="font-medium text-white">Teknik Informatika</span> di Universitas Muhammadiyah Bandung (Semester 7) dengan antusiasme tinggi pada rekayasa web modern dan efisiensi kode. Berbasis di Bandung, saya memadukan kepekaan visual desain antarmuka dengan kedalaman logika sistem—membangun produk digital yang interaktif, responsif, dan terstruktur. Terbuka penuh untuk peluang kerja full-time, kontrak, maupun freelance baik secara <span className="font-medium text-white">onsite maupun remote</span>.
          </p>
        </div>

        {/* 3 Editorial Pillars - Clean, minimal typography without numbering */}
        <div className="story-reveal grid grid-cols-1 divide-y divide-white/10 border-t border-white/10 pt-2 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {/* Pillar 1: Pendidikan */}
          <div className="py-6 sm:py-4 sm:pr-8 sm:first:pl-0">
            <div className="flex items-center justify-between text-xs tracking-wider uppercase text-white/40">
              <span className="font-medium text-white/70">Pendidikan</span>
              <span className="text-white/30 text-[0.7rem]">Sem. 7 · 2021—2025</span>
            </div>
            <h3 className="mt-3 font-sans text-base sm:text-lg font-bold tracking-tight text-white">
              Teknik Informatika
            </h3>
            <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-wider text-white/45">
              Universitas Muhammadiyah Bandung
            </p>
            <p className="mt-3 text-xs sm:text-[0.82rem] leading-relaxed text-white/60">
              Fokus mendalam pada rekayasa web modern, performa kode, algoritma, serta arsitektur data sistem.
            </p>
          </div>

          {/* Pillar 2: Asal & Domisili */}
          <div className="py-6 sm:py-4 sm:px-8">
            <div className="flex items-center justify-between text-xs tracking-wider uppercase text-white/40">
              <span className="font-medium text-white/70">Asal & Domisili</span>
              <span className="text-white/30 text-[0.7rem]">Onsite · Remote</span>
            </div>
            <h3 className="mt-3 font-sans text-base sm:text-lg font-bold tracking-tight text-white">
              Bandung, Indonesia
            </h3>
            <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-wider text-white/45">
              West Java · UTC+7
            </p>
            <p className="mt-3 text-xs sm:text-[0.82rem] leading-relaxed text-white/60">
              Lahir dan berbasis di Bandung. Terbuka penuh untuk kolaborasi profesional full-time, kontrak, maupun freelance.
            </p>
          </div>

          {/* Pillar 3: Fokus & Passion */}
          <div className="py-6 sm:py-4 sm:pl-8 sm:last:pr-0">
            <div className="flex items-center justify-between text-xs tracking-wider uppercase text-white/40">
              <span className="font-medium text-white/70">Fokus & Passion</span>
              <span className="text-white/30 text-[0.7rem]">UI & Architecture</span>
            </div>
            <h3 className="mt-3 font-sans text-base sm:text-lg font-bold tracking-tight text-white">
              Web Design & Systems
            </h3>
            <p className="mt-1 font-mono text-[0.64rem] uppercase tracking-wider text-white/45">
              Frontend & Fullstack Logic
            </p>
            <p className="mt-3 text-xs sm:text-[0.82rem] leading-relaxed text-white/60">
              Sangat gemar mengulik website design, interaksi visual yang halus, serta merancang arsitektur sistem database yang andal.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

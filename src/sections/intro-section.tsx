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
  const shapeRef = useRef<HTMLDivElement | null>(null);
  const marqueeRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 40%",
          end: "bottom 90%",
          scrub: 1.4,
        },
      });

      tl.fromTo(
        ".line",
        {
          opacity: 0,
          yPercent: 200,
        },
        {
          opacity: 1,
          yPercent: 0,
          duration: 3.2,
          stagger: {
            each: 0.55,
            ease: "power2.out",
          },
          ease: "power3.out",
        },
        "-=0.1",
      );

      gsap.fromTo(
        shapeRef.current,
        {
          scaleY: 0.6,
          y: 50,
        },
        {
          scaleY: 1.5,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "top 20%",
            scrub: 1,
          },
        },
      );
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
      <div className="relative z-10 mt-4 grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col gap-2 sm:border-r sm:border-white/10 sm:pr-6">
          <span className="w-fit rounded-full border border-sky-500/30 bg-sky-500/10 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-sky-400">
            Pendidikan
          </span>
          <p className="font-sans text-base font-semibold bg-gradient-to-r from-white via-sky-100 to-sky-300 bg-clip-text text-transparent">
            Teknik Informatika
          </p>
          <p className="text-xs text-white/65 leading-relaxed">
            Mahasiswa tingkat akhir (Semester 7) di Universitas Muhammadiyah Bandung dengan antusiasme tinggi pada rekayasa web modern.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:border-r sm:border-white/10 sm:pr-6">
          <span className="w-fit rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-emerald-400">
            Asal & Domisili
          </span>
          <p className="font-sans text-base font-semibold bg-gradient-to-r from-white via-emerald-100 to-emerald-300 bg-clip-text text-transparent">
            Bandung, Indonesia
          </p>
          <p className="text-xs text-white/65 leading-relaxed">
            Lahir dan berbasis di Bandung. Terbuka untuk peluang kerja full-time, kontrak, maupun freelance secara onsite maupun remote.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="w-fit rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[0.62rem] uppercase tracking-[0.25em] text-amber-400">
            Fokus & Passion
          </span>
          <p className="font-sans text-base font-semibold bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent">
            Web Design & Systems
          </p>
          <p className="text-xs text-white/65 leading-relaxed">
            Sangat gemar mengulik website design, interaksi visual yang halus, serta merancang alur logika sistem database yang andal.
          </p>
        </div>
      </div>
    </section>
  );
}

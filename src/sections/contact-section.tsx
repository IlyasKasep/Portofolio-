"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";
import { Mail, FileText, ArrowUpRight, Copy, Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const bgTextRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [time, setTime] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText("muhammadilyassatriafauzan@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Jakarta",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      };
      setTime(now.toLocaleTimeString("en-US", options));
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const bgText = bgTextRef.current;
      const info = infoRef.current;
      const bottom = bottomRef.current;
      if (!section || !heading || !bgText || !info || !bottom) return;

      const media = gsap.matchMedia();

      media.add(
        {
          isDesktop: "(min-width: 768px)",
          isMobile: "(max-width: 767px)",
          reduceMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { isMobile, reduceMotion } = context.conditions ?? {};
          const words = heading.querySelectorAll(".contact-word");

          if (reduceMotion || isMobile) {
            // Keep mobile clean, instant, and 100% visible: no lag, no scrub, never disappears when scrolling back up
            gsap.set([heading, bgText, info, bottom, words], {
              clearProps: "all",
            });
            return;
          }

          // Parallax shift for the background "CONTACT" text on desktop
          gsap.fromTo(
            bgText,
            { yPercent: -15, opacity: 0 },
            {
              yPercent: 15,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom bottom",
                scrub: true,
              },
            },
          );

          // Desktop reveal timeline with once: true so it never vanishes on scroll up
          const timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              once: true,
            },
          });

          // Animate words slide-up + fade-in
          timeline
            .fromTo(
              words,
              { yPercent: 100, opacity: 0 },
              {
                yPercent: 0,
                opacity: 1,
                stagger: 0.1,
                duration: 0.8,
                ease: "power2.out",
              },
              0,
            )
            .fromTo(
              info,
              { y: 40, opacity: 0 },
              { y: 0, opacity: 1, ease: "power1.out", duration: 0.7 },
              0.3,
            )
            .fromTo(
              bottom,
              { y: 30, opacity: 0 },
              { y: 0, opacity: 1, ease: "power1.out", duration: 0.7 },
              0.5,
            );
        },
      );

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <footer
      id="contact"
      ref={sectionRef}
      aria-labelledby="contact-heading"
      className="contact-section relative z-10 w-full bg-subtle text-white flex flex-col justify-between overflow-hidden px-6 py-20 sm:px-10 text-center md:sticky md:bottom-0 md:h-screen md:min-h-[600px] md:px-24 md:py-16"
    >
      {/* Vibrant Ambient Colorful Aura */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 top-1/4 h-[28rem] w-[28rem] rounded-full bg-gradient-to-tr from-violet-600/25 via-indigo-500/20 to-sky-400/20 blur-[60px] sm:blur-[120px] transform-gpu"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-1/4 h-[30rem] w-[30rem] rounded-full bg-gradient-to-bl from-emerald-500/20 via-teal-500/15 to-cyan-500/20 blur-[60px] sm:blur-[120px] transform-gpu"
      />

      {/* Large Background Text */}
      <div
        ref={bgTextRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex select-none items-center justify-center text-center text-[clamp(6rem,22vw,22rem)] font-bold leading-none tracking-[-0.075em] text-white/3 select-none blur-[3px]"
      >
        CONTACT
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between items-center gap-12 md:gap-0">
        {/* Top Header */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-sky-400">
            Get in touch
          </p>
          {time && (
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-emerald-400">
              Bandung, ID / {time} WIB
            </p>
          )}
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center gap-8">
          <h2
            id="contact-heading"
            ref={headingRef}
            className="text-[clamp(3.5rem,10vw,8.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.055em] bg-gradient-to-r from-white via-indigo-100 to-sky-200 bg-clip-text text-transparent"
          >
            {/* Word-by-word reveal wrapping */}
            <span className="inline-block overflow-hidden mr-[0.2em] py-1">
              <span className="contact-word inline-block will-change-transform">
                Let&apos;s
              </span>
            </span>
            <span className="inline-block overflow-hidden py-1">
              <span className="contact-word inline-block will-change-transform">
                Work
              </span>
            </span>
            <br />
            <span className="inline-block overflow-hidden py-1">
              <span className="contact-word inline-block will-change-transform">
                Together
              </span>
            </span>
          </h2>

          <div ref={infoRef} className="mt-6 flex flex-col items-center gap-8 w-full max-w-4xl">
            {/* Primary Action CTAs: WhatsApp & Email Cards */}
            <div className="flex flex-col sm:flex-row items-stretch justify-center gap-4 w-full max-w-2xl px-2">
              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/6285722645928?text=Halo%20Ilyas%2C%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda."
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-1 items-center justify-between gap-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-6 py-4 text-left transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-500/20 hover:shadow-xl hover:shadow-emerald-500/10 hover:-translate-y-1 active:translate-y-0"
              >
                <div className="flex items-center gap-3.5">
                  <div className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-500/20 text-emerald-400 transition-transform duration-300 group-hover:scale-110">
                    {/* Pulsing online badge */}
                    <span className="absolute -top-1 -right-1 flex size-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500"></span>
                    </span>
                    <svg className="size-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-emerald-400 font-semibold block">
                      Fast Response · Online
                    </span>
                    <span className="font-sans text-base font-semibold text-white">
                      Chat di WhatsApp
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="size-4 shrink-0 text-emerald-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              {/* Email CTA */}
              <div className="group relative flex flex-1 items-center justify-between gap-3 rounded-2xl border border-white/15 bg-white/[0.06] p-2 pl-4 transition-all duration-300 hover:border-white/35 hover:bg-white/[0.1] hover:shadow-xl hover:-translate-y-1">
                <a
                  href="mailto:muhammadilyassatriafauzan@gmail.com"
                  className="flex flex-1 items-center gap-3.5 text-left min-w-0 pr-1"
                >
                  <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/10 text-sky-300 transition-transform duration-300 group-hover:scale-110">
                    <Mail className="size-5" />
                  </div>
                  <div className="min-w-0">
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-white/50 font-semibold block">
                      Email Discussion
                    </span>
                    <span className="font-sans text-sm sm:text-base font-semibold text-white truncate block">
                      Kirim Pesan Email
                    </span>
                  </div>
                </a>

                {/* Copy button */}
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Salin alamat email"
                  aria-label="Salin alamat email"
                  className="grid size-10 shrink-0 place-items-center rounded-xl border border-white/15 bg-white/10 text-white/80 transition-all hover:border-white/40 hover:bg-white/20 hover:text-white"
                >
                  {copied ? (
                    <Check className="size-4 text-emerald-400" />
                  ) : (
                    <Copy className="size-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Secondary Profile & Social CTAs */}
            <div className="flex flex-wrap justify-center items-center gap-3 w-full px-2">
              <a
                href="https://www.linkedin.com/in/muhammad-ilyas-satria-fauzan/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-sky-400/30 bg-sky-400/[0.06] px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-sky-200 transition-all duration-300 hover:border-sky-400 hover:bg-sky-400/20 hover:text-white hover:scale-105 hover:shadow-md"
              >
                <svg className="size-4 text-sky-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                </svg>
                <span>LinkedIn</span>
                <ArrowUpRight className="size-3.5 text-sky-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://github.com/IlyasKasep"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/[0.06] px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-white/80 transition-all duration-300 hover:border-white/45 hover:bg-white/20 hover:text-white hover:scale-105 hover:shadow-md"
              >
                <svg className="size-4 text-white" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                <span>GitHub</span>
                <ArrowUpRight className="size-3.5 text-white/60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </a>

              <a
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-amber-400/30 bg-amber-400/[0.06] px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-amber-200 transition-all duration-300 hover:border-amber-400 hover:bg-amber-400/20 hover:text-white hover:scale-105 hover:shadow-md"
              >
                <FileText className="size-4 text-amber-400" />
                <span>Resume / CV</span>
                <ArrowUpRight className="size-3.5 text-amber-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a
                href="https://instagram.com/potoofyas"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full border border-pink-400/30 bg-pink-400/[0.06] px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-wider text-pink-200 transition-all duration-300 hover:border-pink-400 hover:bg-pink-400/20 hover:text-white hover:scale-105 hover:shadow-md"
              >
                <svg className="size-4 text-pink-400" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span>Instagram</span>
                <ArrowUpRight className="size-3.5 text-pink-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Mascot and Copyright */}
        <div ref={bottomRef} className="flex flex-col items-center gap-4">
          <div className="text-white/45 hover:text-white transition-colors duration-300">
            <svg
              width="40"
              height="40"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="animate-pulse"
              style={{ animationDuration: "3s" }}
            >
              {/* Ears */}
              <rect x="2" y="1" width="2" height="3" />
              <rect x="12" y="1" width="2" height="3" />
              {/* Head/Body */}
              <rect x="4" y="3" width="8" height="9" />
              <rect x="3" y="4" width="10" height="7" />
              {/* Eyes */}
              <rect x="5" y="6" width="1" height="1" fill="#10b981" />
              <rect x="10" y="6" width="1" height="1" fill="#10b981" />
              {/* Mouth */}
              <rect x="7" y="8" width="2" height="1" fill="#111114" />
              {/* Feet */}
              <rect x="3" y="12" width="2" height="2" />
              <rect x="11" y="12" width="2" height="2" />
            </svg>
          </div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
            © {new Date().getFullYear()} Muhammad Ilyas Satria Fauzan. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

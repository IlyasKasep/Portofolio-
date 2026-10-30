"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef, useEffect, useState } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const bgTextRef = useRef<HTMLDivElement | null>(null);
  const infoRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [time, setTime] = useState<string>("");

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

          <div ref={infoRef} className="mt-4 flex flex-col items-center gap-10">
            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
              <a
                href="mailto:muhammadilyassatriafauzan@gmail.com"
                className="group relative inline-flex items-center gap-2 font-sans text-lg font-light text-white/70 transition-colors duration-300 hover:text-white sm:text-xl lg:text-2xl"
              >
                <span>muhammadilyassatriafauzan@gmail.com</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                  aria-hidden="true"
                >
                  <path d="M7 17 17 7" />
                  <path d="M7 7h10v10" />
                </svg>
                <span className="absolute bottom-0 left-0 h-px w-0 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            </div>

            <div className="flex flex-wrap justify-center gap-8 font-mono text-[11px] uppercase tracking-wider text-white/45">
              <a
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Resume
              </a>
              <a
                href="https://wa.me/6285722645928"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300 text-emerald-400/80"
              >
                WhatsApp
              </a>
              <a
                href="https://github.com/IlyasKasep"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Github
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-ilyas-satria-fauzan/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Linkedin
              </a>
              <a
                href="https://instagram.com/potoofyas"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors duration-300"
              >
                Instagram
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

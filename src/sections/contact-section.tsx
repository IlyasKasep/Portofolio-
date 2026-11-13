"use client";

import Link from "next/link";
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
      {/* Subtle Monochrome Ambient Depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.04),transparent_70%)]"
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
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-white/50">
            Get in touch
          </p>
          {time && (
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.25em] text-white/70">
              Bandung, ID / {time} WIB
            </p>
          )}
        </div>

        {/* Center Content */}
        <div className="flex flex-col items-center gap-8">
          <h2
            id="contact-heading"
            ref={headingRef}
            className="text-[clamp(3.5rem,10vw,8.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.055em] text-white"
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

          <div ref={infoRef} className="mt-4 flex flex-col items-center gap-6 w-full max-w-2xl">
            {/* Clean, High-End Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full">
              {/* WhatsApp CTA - Primary Solid Clean Button */}
              <a
                href="https://wa.me/6285722645928?text=Halo%20Ilyas%2C%20saya%20tertarik%20bekerja%20sama%20dengan%20Anda."
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full sm:w-auto items-center justify-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-sans text-sm font-semibold text-black transition-all duration-200 hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                <svg className="size-4 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Hubungi via WhatsApp</span>
                <ArrowUpRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Email CTA - Secondary Refined Button with integrated copy */}
              <div className="flex w-full sm:w-auto items-center justify-between rounded-full border border-white/20 bg-white/5 p-1 transition-all duration-200 hover:border-white/40 hover:bg-white/10">
                <a
                  href="mailto:muhammadilyassatriafauzan@gmail.com"
                  className="flex items-center gap-2.5 px-5 py-2.5 font-sans text-sm font-medium text-white transition-colors"
                >
                  <Mail className="size-4 text-white/70" />
                  <span>Kirim Email</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  title="Salin alamat email"
                  aria-label="Salin alamat email"
                  className="grid size-9 shrink-0 place-items-center rounded-full border border-white/15 bg-white/10 text-white/80 transition-colors hover:bg-white/25 hover:text-white"
                >
                  {copied ? (
                    <Check className="size-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </button>
              </div>
            </div>

            {/* Subtle Direct Email Text */}
            <p className="font-mono text-[0.72rem] tracking-wider text-white/45">
              muhammadilyassatriafauzan@gmail.com
            </p>

            {/* Social & Professional Architectural Links */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 pt-2">
              <a
                href="https://www.linkedin.com/in/muhammad-ilyas-satria-fauzan/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-wider text-white/70 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="size-3 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </a>

              <a
                href="https://github.com/IlyasKasep"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-wider text-white/70 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
              >
                <span>GitHub</span>
                <ArrowUpRight className="size-3 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </a>

              <a
                href="/resume"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-wider text-white/70 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
              >
                <span>Resume / CV</span>
                <ArrowUpRight className="size-3 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </a>

              <a
                href="https://instagram.com/potoofyas"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-wider text-white/70 transition-all duration-200 hover:border-white/30 hover:bg-white/[0.08] hover:text-white"
              >
                <span>Instagram</span>
                <ArrowUpRight className="size-3 text-white/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </a>

              <Link
                href="/katalog"
                className="group inline-flex items-center gap-2 rounded-lg border border-foreground/20 bg-foreground/5 px-3.5 py-2 font-mono text-[0.68rem] uppercase tracking-wider text-foreground/80 transition-all duration-200 hover:border-foreground/40 hover:bg-foreground/10 hover:text-foreground"
              >
                <span>Katalog Kado 🎁</span>
                <ArrowUpRight className="size-3 text-foreground/40 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground" />
              </Link>
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

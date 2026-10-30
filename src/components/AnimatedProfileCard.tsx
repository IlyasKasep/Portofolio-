"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import CodeIcon from "./CodeIcon";

const springConfig = {
  stiffness: 280,
  damping: 28,
  mass: 0.7,
};

export default function AnimatedProfile() {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const cursorX = useMotionValue(50);
  const cursorY = useMotionValue(50);
  const rotateXTarget = useMotionValue(0);
  const rotateYTarget = useMotionValue(0);
  const scaleTarget = useMotionValue(1);
  const shadowAlphaTarget = useMotionValue(0.18);
  const pressureTarget = useMotionValue(0);

  const rotateX = useSpring(rotateXTarget, springConfig);
  const rotateY = useSpring(rotateYTarget, springConfig);
  const scale = useSpring(scaleTarget, springConfig);
  const shadowAlpha = useSpring(shadowAlphaTarget, springConfig);
  const pressure = useSpring(pressureTarget, springConfig);

  const innerShadowAlpha = useTransform(pressure, [0, 1], [0, 0.32]);
  const glareAlpha = useTransform(pressure, [0, 1], [0, 0.12]);
  const cardShadow = useMotionTemplate`0 28px 70px rgba(17, 17, 20, ${shadowAlpha})`;
  const pressureShadow = useMotionTemplate`radial-gradient(circle at ${cursorX}% ${cursorY}%, rgba(0, 0, 0, ${innerShadowAlpha}) 0%, rgba(0, 0, 0, 0.16) 18%, transparent 42%)`;
  const pressureGlare = useMotionTemplate`radial-gradient(circle at ${cursorX}% ${cursorY}%, rgba(255, 255, 255, ${glareAlpha}) 0%, rgba(255, 255, 255, 0.04) 18%, transparent 40%)`;

  useEffect(() => {
    const card = cardRef.current;

    if (!card) {
      return;
    }

    function resetCard() {
      rotateXTarget.set(0);
      rotateYTarget.set(0);
      scaleTarget.set(1);
      shadowAlphaTarget.set(0.18);
      pressureTarget.set(0);
      cursorX.set(50);
      cursorY.set(50);
    }

    if (
      prefersReducedMotion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      resetCard();
      return;
    }

    function handleMouseMove(event: MouseEvent) {
      if (!card) {
        return;
      }

      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const boundedX = Math.min(Math.max(x, 0), 1);
      const boundedY = Math.min(Math.max(y, 0), 1);
      const offsetX = boundedX - 0.5;
      const offsetY = boundedY - 0.5;

      cursorX.set(boundedX * 100);
      cursorY.set(boundedY * 100);
      rotateXTarget.set(offsetY * -9);
      rotateYTarget.set(offsetX * 9);
      scaleTarget.set(0.982);
      shadowAlphaTarget.set(0.1);
      pressureTarget.set(1);
    }

    function handleMouseEnter() {
      scaleTarget.set(0.986);
      shadowAlphaTarget.set(0.12);
      pressureTarget.set(0.72);
    }

    function handleMouseDown() {
      scaleTarget.set(0.965);
      pressureTarget.set(1);
      shadowAlphaTarget.set(0.08);
    }

    function handleMouseUp() {
      scaleTarget.set(0.982);
      shadowAlphaTarget.set(0.1);
    }

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", resetCard);
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", resetCard);
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    cursorX,
    cursorY,
    prefersReducedMotion,
    pressureTarget,
    rotateXTarget,
    rotateYTarget,
    scaleTarget,
    shadowAlphaTarget,
  ]);

  return (
    <div className="profile-card relative z-10 flex w-full justify-center [perspective:1200px] lg:justify-end">
      {/* Vibrant Ambient Glow Behind Card */}
      <div className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-violet-600/35 via-sky-400/25 to-emerald-400/35 blur-2xl opacity-75" />

      <motion.div
        ref={cardRef}
        className="relative h-[480px] w-full max-w-[390px] overflow-hidden rounded-[2rem] border border-white/25 bg-[#0b0b0d] will-change-transform sm:h-[560px] sm:max-w-[450px] lg:h-[640px] lg:max-w-[520px]"
        data-profile-card
        style={{
          boxShadow: cardShadow,
          rotateX,
          rotateY,
          scale,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="absolute inset-0 rounded-[2rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0)_34%),linear-gradient(180deg,#25252a_0%,#131418_48%,#050506_100%)]" />
        <div className="absolute inset-x-8 top-8 h-px bg-white/10" />

        <CodeIcon className="absolute left-8 top-24 h-20 w-20 -rotate-12 text-white/10" />
        <CodeIcon className="absolute right-8 top-16 h-24 w-24 rotate-12 text-white/10" />
        <CodeIcon className="absolute bottom-32 left-10 h-16 w-16 rotate-6 text-white/8" />

        <Image
          src="/ilyas.png"
          alt="Portrait of Muhammad Ilyas Satria Fauzan"
          fill
          priority
          sizes="(min-width: 1024px) 520px, (min-width: 640px) 450px, 90vw"
          className="relative z-10 object-cover object-bottom rounded-[2rem] transition-transform duration-700 ease-out hover:scale-[1.02]"
        />

        <div className="absolute inset-x-0 bottom-0 z-20 h-40 rounded-b-[2rem] bg-gradient-to-t from-[#050506] via-[#050506]/80 to-transparent" />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute inset-0 z-20 mix-blend-multiply rounded-[2rem]"
          style={{ background: pressureShadow }}
        />
        <motion.div
          aria-hidden="true"
          className="pointer-events-none hidden lg:block absolute inset-0 z-20 rounded-[2rem]"
          style={{ background: pressureGlare }}
        />

        <div className="absolute inset-x-5 bottom-5 z-30 flex items-center justify-between gap-4 rounded-2xl border border-white/18 bg-[#111114]/90 px-5 py-4 text-white shadow-[0_16px_40px_rgba(0,0,0,0.35)] lg:bg-white/[0.1] lg:backdrop-blur-md">
          <div>
            <p className="text-sm font-semibold leading-none text-white">@IlyasKasep</p>
            <p className="mt-2 text-sm leading-none text-emerald-300 font-medium">
              Available for work!
            </p>
          </div>
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500 shadow-[0_0_12px_#10b981]"></span>
          </span>
        </div>
      </motion.div>
    </div>
  );
}

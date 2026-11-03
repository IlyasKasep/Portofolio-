"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  MessageSquare,
  FolderUp,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
} from "lucide-react";

interface DigitalGiftSectionProps {
  phoneNumber?: string;
}

export default function DigitalGiftSection({
  phoneNumber = "6285722645928", // Nomor WhatsApp default (dapat disesuaikan)
}: DigitalGiftSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const getWaLink = (themeName: string) => {
    const text = encodeURIComponent(
      `Halo bro, saya mau pesan Website Kado Tema "${themeName}". Mau tanya-tanya detailnya dong!`,
    );
    return `https://wa.me/${phoneNumber}?text=${text}`;
  };

  // 1. DATA KATALOG KADO DIGITAL (Desain clean, bebas AI-slop)
  const catalogItems = [
    {
      id: "retro-8bit",
      title: "Retro 8-Bit",
      subtitle: "Nostalgia arcade interaktif bergaya pixel game.",
      tag: "Arcade Edition",
      strikePrice: "Rp 150.000",
      promoPrice: "Rp 89.000",
      demoUrl: "/templates/retro-8bit/index.html",
      imageUrl: "/templates/retro-8bit/preview.png",
      features: [
        "Mini quiz interaktif kenangan",
        "Efek audio chiptune retro",
        "Pesan rahasia interaktif",
        "Galeri foto nostalgia",
      ],
      previewColor: "bg-gradient-to-br from-amber-500/10 via-transparent to-stone-900/60",
      previewLabel: "8-BIT INTERACTIVE",
    },
    {
      id: "aesthetic-minimalis",
      title: "Aesthetic Minimalis",
      subtitle: "Tipografi hangat, elegan, dan romantis.",
      tag: "Classic Edition",
      strikePrice: "Rp 150.000",
      promoPrice: "Rp 89.000",
      demoUrl: "/templates/aesthetic-minimalis/index.html",
      imageUrl: "/templates/aesthetic-minimalis/preview.png",
      features: [
        "Background music kustom pilihanmu",
        "Love letter tipografi halus",
        "Polaroid photo slide kenangan",
        "Countdown hari spesial / anniversary",
      ],
      previewColor: "bg-gradient-to-br from-rose-500/10 via-transparent to-stone-900/60",
      previewLabel: "MINIMALIST ROMANCE",
    },
    {
      id: "cyberpunk-y2k",
      title: "Cyberpunk Y2K",
      subtitle: "Futuristik dengan aksen neon dan glitch halus.",
      tag: "Neon Edition",
      strikePrice: "Rp 200.000",
      promoPrice: "Rp 129.000",
      demoUrl: "https://demo.kadodigital.site/cyberpunk-y2k",
      features: [
        "Neon audio visualizer interaktif",
        "Kartu ucapan hologram modern",
        "Transisi glitch cyberpunk halus",
        "Pemutar playlist audio kustom",
      ],
      previewColor: "bg-gradient-to-br from-cyan-500/10 via-transparent to-stone-900/60",
      previewLabel: "CYBERPUNK NEON",
    },
  ];

  // 2. DATA CARA PEMESANAN (HOW IT WORKS)
  const orderSteps = [
    {
      step: "01",
      title: "1. Pilih Tema & Chat",
      desc: "Konsultasikan tema favorit dan konsep kado yang kamu inginkan langsung via WhatsApp.",
      icon: MessageSquare,
    },
    {
      step: "02",
      title: "2. Kirim Materi",
      desc: "Kirim foto, video, ucapan manis, dan lagu favorit melalui Google Drive yang praktis.",
      icon: FolderUp,
    },
    {
      step: "03",
      title: "3. Website Jadi!",
      desc: "Tunggu 24 jam dan kado siap dikirim! Website aktif selamanya dengan link khusus.",
      icon: CheckCircle2,
    },
  ];

  // 3. DATA FAQ
  const faqs = [
    {
      q: "Apakah webnya bisa diakses selamanya?",
      a: "Ya, link akan aktif selamanya dengan subdomain khusus.",
    },
    {
      q: "Berapa lama proses pembuatannya?",
      a: "Proses cepat, maksimal 1x24 jam kerja setelah materi lengkap.",
    },
    {
      q: "Apakah bisa pakai lagu background sendiri?",
      a: "Tentu! Cukup sertakan link YouTube/Spotify lagu favorit kalian.",
    },
  ];

  return (
    <section
      id="kado-digital"
      aria-labelledby="kado-digital-heading"
      className="digital-gift-section relative z-20 w-full overflow-hidden bg-background px-6 py-20 text-foreground sm:px-10 sm:py-28 lg:px-24 scroll-mt-8"
    >
      <span id="katalog" className="pointer-events-none absolute -top-8 block h-0 w-0 opacity-0" aria-hidden="true" />
      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ======================================================== */}
        {/* 1. SECTION HEADER (Clean & Minimalist)                   */}
        {/* ======================================================== */}
        <div className="mb-12 border-b border-foreground/10 pb-8 sm:mb-16">
          <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
            Layanan Kado Digital
          </p>
          <div className="mt-3 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2
                id="kado-digital-heading"
                className="font-serif text-3xl font-semibold uppercase tracking-[-0.035em] sm:text-4xl lg:text-5xl"
              >
                Kirim Kado Anti-Mainstream
              </h2>
              <p className="mt-2 text-sm text-foreground/60 sm:text-base">
                Pilih tema website kado interaktif untuk orang tersayang.
              </p>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* 2. KATALOG CARDS (Clean Editorial Design)                */}
        {/* ======================================================== */}
        <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
          {catalogItems.map((item) => (
            <div
              key={item.id}
              className="group flex flex-col justify-between rounded-2xl border border-foreground/10 bg-card/40 p-6 transition-all duration-300 hover:border-foreground/30 hover:shadow-lg"
            >
              <div>
                {/* Thumbnail / Mockup Window Container */}
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mb-5 block aspect-video w-full overflow-hidden rounded-xl border border-foreground/10 bg-subtle/50 transition-all duration-300 hover:border-foreground/30"
                  aria-label={`Lihat demo tema ${item.title}`}
                >
                  {/* Browser Window Header Dots */}
                  <div className="relative z-10 flex items-center gap-1.5 border-b border-foreground/10 bg-foreground/[0.04] px-3 py-2 backdrop-blur-sm">
                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                    <span className="h-2 w-2 rounded-full bg-foreground/20" />
                    <span className="ml-2 font-mono text-[9px] uppercase tracking-wider text-foreground/50">
                      {item.tag}
                    </span>
                  </div>

                  {/* Thumbnail Content Area */}
                  {item.imageUrl ? (
                    <div className="relative h-[calc(100%-25px)] w-full overflow-hidden bg-black">
                      <Image
                        src={item.imageUrl}
                        alt={`Screenshot live demo tema ${item.title}`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      />
                    </div>
                  ) : (
                    <div
                      className={`flex h-[calc(100%-25px)] w-full items-center justify-center p-4 text-center ${item.previewColor}`}
                    >
                      <span className="font-mono text-xs font-semibold tracking-wider text-foreground/70">
                        {item.previewLabel}
                      </span>
                    </div>
                  )}
                </a>

                {/* Title & Subtitle */}
                <h3 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs text-foreground/60 sm:text-sm">
                  {item.subtitle}
                </p>

                {/* Pricing */}
                <div className="mt-4 flex items-baseline gap-3 border-y border-foreground/8 py-3">
                  <span className="font-mono text-xl font-bold text-foreground sm:text-2xl">
                    {item.promoPrice}
                  </span>
                  <span className="font-mono text-xs text-foreground/40 line-through">
                    {item.strikePrice}
                  </span>
                </div>

                {/* Feature Checklist */}
                <ul className="mt-4 space-y-2 text-xs text-foreground/75">
                  {item.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-foreground/40" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* 2 Buttons Side-by-Side */}
              <div className="mt-6 grid grid-cols-2 gap-3 pt-2">
                <a
                  href={item.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 rounded-full border border-foreground/20 bg-transparent px-3 py-2.5 font-mono text-xs font-medium text-foreground transition-colors hover:border-foreground hover:bg-foreground/5 active:scale-95"
                >
                  <span>Lihat Demo</span>
                  <ExternalLink className="h-3 w-3 opacity-60" />
                </a>

                <a
                  href={getWaLink(item.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center rounded-full bg-foreground px-3 py-2.5 font-mono text-xs font-semibold text-background transition-colors hover:bg-foreground/90 active:scale-95"
                >
                  <span>Pesan Tema Ini</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* ======================================================== */}
        {/* 3. SECTION: CARA PEMESANAN (HOW IT WORKS)                */}
        {/* ======================================================== */}
        <div className="mt-20 border-t border-foreground/10 pt-16 sm:mt-24 sm:pt-20">
          <div className="mb-10 text-center">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
              Alur Pemesanan
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold uppercase tracking-[-0.03em] sm:text-3xl">
              Cara Pesan Gampang Banget
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {orderSteps.map((stepItem, idx) => {
              const StepIcon = stepItem.icon;
              return (
                <div
                  key={idx}
                  className="relative flex flex-col items-start rounded-2xl border border-foreground/10 bg-card/25 p-6 transition-colors hover:border-foreground/20"
                >
                  <div className="mb-4 flex w-full items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-foreground/10 bg-foreground/5 text-foreground">
                      <StepIcon className="h-5 w-5 opacity-80" />
                    </span>
                    <span className="font-mono text-xs font-semibold text-foreground/30">
                      {stepItem.step}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-foreground">
                    {stepItem.title}
                  </h4>
                  <p className="mt-2 text-xs leading-relaxed text-foreground/60 sm:text-sm">
                    {stepItem.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. SECTION: FAQ (Clean Accordion)                        */}
        {/* ======================================================== */}
        <div className="mt-20 border-t border-foreground/10 pt-16 sm:mt-24 sm:pt-20">
          <div className="mb-10 text-center">
            <p className="font-mono text-[0.65rem] uppercase tracking-[0.3em] text-muted-foreground">
              FAQ
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold uppercase tracking-[-0.03em] sm:text-3xl">
              Pertanyaan yang Sering Diajukan
            </h3>
          </div>

          <div className="mx-auto max-w-2xl space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="overflow-hidden rounded-xl border border-foreground/10 bg-card/25 transition-colors hover:border-foreground/20"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left"
                  >
                    <span className="text-sm font-semibold text-foreground sm:text-base">
                      {faq.q}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 shrink-0 text-foreground/50 transition-transform duration-200 ${
                        isOpen ? "rotate-180 text-foreground" : ""
                      }`}
                    />
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    className={`grid transition-all duration-200 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-foreground/8 px-5 pb-5 pt-3 text-xs leading-relaxed text-foreground/65 sm:text-sm">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

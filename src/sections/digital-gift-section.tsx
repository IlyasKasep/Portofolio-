"use client";

import React, { useState } from "react";
import {
  MessageCircle,
  FolderUp,
  Rocket,
  ExternalLink,
  ChevronDown,
  Sparkles,
  Gamepad2,
  Heart,
  Zap,
  Check,
} from "lucide-react";

interface DigitalGiftSectionProps {
  phoneNumber?: string;
}

export default function DigitalGiftSection({
  phoneNumber = "628XXXXXXX", // Ganti dengan nomor WhatsApp aktif kamu
}: DigitalGiftSectionProps) {
  // Accordion state for FAQ (null or index of opened item)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  const getWaLink = (themeName: string) => {
    const text = encodeURIComponent(
      `Halo bro, saya mau pesan Website Kado Tema "${themeName}". Mau tanya-tanya dulu dong!`,
    );
    return `https://wa.me/${phoneNumber}?text=${text}`;
  };

  // 1. DATA KATALOG KADO DIGITAL
  const catalogItems = [
    {
      id: "retro-8bit",
      title: "Retro 8-Bit",
      tagline: "Nostalgia Game Boy & Arcade Interaktif",
      badge: "Paling Populer",
      badgeColor: "from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30",
      strikePrice: "Rp 150.000",
      promoPrice: "Rp 89.000",
      discountBadge: "Hemat 40%",
      themeAccent: "from-amber-500 via-orange-500 to-rose-500",
      borderHover: "hover:border-amber-500/50",
      demoUrl: "https://demo.kadodigital.site/retro-8bit",
      icon: Gamepad2,
      features: [
        "Mini Game Interaktif (Quiz Kenangan)",
        "Sound Effect Chiptune Retro 8-Bit",
        "Pesan Rahasia 'Press Start to Read'",
        "Galeri Foto Pixel-Border",
        "Link Aktif Selamanya + Domain Unik",
      ],
      // Stylized interactive thumbnail preview
      previewBg: "bg-gradient-to-br from-amber-950/40 via-stone-900 to-stone-950",
      previewContent: (
        <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center font-mono">
          <div className="mb-2 flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-3 py-1 text-[10px] text-amber-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" />
            <span>PLAYER 1 READY</span>
          </div>
          <p className="font-serif text-2xl font-bold tracking-wider text-amber-200">
            LEVEL UP: 22nd YEAR!
          </p>
          <div className="mt-3 flex items-center gap-2 text-xs text-amber-400/80">
            <span>❤️ x 3</span>
            <span>•</span>
            <span>PRESS START TO UNLOCK</span>
          </div>
        </div>
      ),
    },
    {
      id: "aesthetic-minimalis",
      title: "Aesthetic Minimalis",
      tagline: "Elegan, Hangat, & Penuh Makna Romantis",
      badge: "Best Seller",
      badgeColor: "from-rose-500/20 to-pink-500/20 text-rose-300 border-rose-500/30",
      strikePrice: "Rp 150.000",
      promoPrice: "Rp 89.000",
      discountBadge: "Hemat 40%",
      themeAccent: "from-rose-400 via-pink-400 to-violet-400",
      borderHover: "hover:border-rose-400/50",
      demoUrl: "https://demo.kadodigital.site/aesthetic-minimalis",
      icon: Heart,
      features: [
        "Background Music (Spotify / YouTube Sync)",
        "Love Letter Typographic Scroll Halus",
        "Polaroid Foto Slide Kenangan Bersama",
        "Countdown Hari Spesial & Anniversary",
        "Link Aktif Selamanya + Domain Unik",
      ],
      previewBg: "bg-gradient-to-br from-rose-950/30 via-stone-900 to-stone-950",
      previewContent: (
        <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center">
          <div className="mb-2 flex items-center gap-1.5 rounded-full border border-rose-400/30 bg-rose-400/10 px-3 py-1 font-mono text-[10px] text-rose-300">
            <Sparkles className="h-3 w-3" />
            <span>OUR SPECIAL JOURNEY</span>
          </div>
          <p className="font-serif text-2xl italic tracking-wide text-rose-100 sm:text-3xl">
            Happy Anniversary, My Love
          </p>
          <p className="mt-2 text-xs font-light text-rose-200/70">
            &quot;Every moment with you is a memory I treasure&quot;
          </p>
        </div>
      ),
    },
    {
      id: "cyberpunk-y2k",
      title: "Cyberpunk Y2K",
      tagline: "Futuristic Glitch, Neon Glow & High Energy",
      badge: "Trending Y2K",
      badgeColor: "from-cyan-500/20 to-fuchsia-500/20 text-cyan-300 border-cyan-500/30",
      strikePrice: "Rp 200.000",
      promoPrice: "Rp 129.000",
      discountBadge: "Hemat 35%",
      themeAccent: "from-cyan-400 via-fuchsia-500 to-indigo-500",
      borderHover: "hover:border-cyan-400/50",
      demoUrl: "https://demo.kadodigital.site/cyberpunk-y2k",
      icon: Zap,
      features: [
        "Neon Audio Visualizer Bar Reaktif",
        "Kartu Ucapan Hologram 3D Interaktif",
        "Glitch Transition & Efek Cyberpunk Keren",
        "Playlist Musik & Pemutar Audio Custom",
        "Link Aktif Selamanya + Domain Unik",
      ],
      previewBg: "bg-gradient-to-br from-cyan-950/40 via-purple-950/30 to-stone-950",
      previewContent: (
        <div className="relative flex h-full w-full flex-col items-center justify-center p-6 text-center font-mono">
          <div className="mb-2 flex items-center gap-1.5 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[10px] text-cyan-300">
            <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span>SYSTEM_ONLINE // V.2.0</span>
          </div>
          <p className="bg-gradient-to-r from-cyan-300 via-fuchsia-300 to-purple-300 bg-clip-text font-serif text-2xl font-black uppercase tracking-widest text-transparent sm:text-3xl">
            CYBER_GIFT.EXE
          </p>
          <div className="mt-3 flex items-center gap-1.5">
            <span className="h-3 w-1 bg-cyan-400 animate-bounce" />
            <span className="h-5 w-1 bg-fuchsia-400 animate-bounce [animation-delay:0.1s]" />
            <span className="h-4 w-1 bg-purple-400 animate-bounce [animation-delay:0.2s]" />
            <span className="h-6 w-1 bg-cyan-300 animate-bounce [animation-delay:0.3s]" />
          </div>
        </div>
      ),
    },
  ];

  // 2. DATA CARA PEMESANAN (HOW IT WORKS)
  const orderSteps = [
    {
      step: "01",
      title: "1. Pilih Tema & Chat",
      desc: "Pilih tema website favoritmu, lalu klik pesan untuk konsultasi santai seputar konsep, tanggal spesial, atau request kustom via WhatsApp.",
      icon: MessageCircle,
      iconColor: "text-emerald-400",
      bgColor: "bg-emerald-500/10 border-emerald-500/25",
    },
    {
      step: "02",
      title: "2. Kirim Materi",
      desc: "Kirimkan foto-foto kenangan, pesan/ucapan manis, dan link lagu favorit kalian melalui folder Google Drive yang kami sediakan.",
      icon: FolderUp,
      iconColor: "text-sky-400",
      bgColor: "bg-sky-500/10 border-sky-500/25",
    },
    {
      step: "03",
      title: "3. Website Jadi!",
      desc: "Tunggu maksimal 24 jam! Website kado interaktifmu sudah live dan aktif dengan link khusus yang siap dikirimkan ke orang tersayang.",
      icon: Rocket,
      iconColor: "text-violet-400",
      bgColor: "bg-violet-500/10 border-violet-500/25",
    },
  ];

  // 3. DATA FAQ
  const faqs = [
    {
      q: "Apakah webnya bisa diakses selamanya?",
      a: "Ya, link akan aktif selamanya dengan subdomain khusus (misal: kamu-dia.kadodigital.site atau link pilihanmu). Kamu dan pasangan atau sahabat bisa membukanya kapan saja untuk mengenang momen indah.",
    },
    {
      q: "Berapa lama proses pembuatannya?",
      a: "Proses cepat, maksimal 1x24 jam kerja setelah materi (foto, ucapan, dan lagu) lengkap kami terima. Butuh kilat beberapa jam untuk kado mendadak hari ini? Bisa langsung kita prioritaskan via WhatsApp!",
    },
    {
      q: "Apakah bisa pakai lagu background sendiri?",
      a: "Tentu! Cukup sertakan link YouTube/Spotify lagu favorit kalian. Lagu akan langsung terpasang dan bisa diputar otomatis dengan tombol pemutar audio interaktif yang estetik.",
    },
  ];

  return (
    <section
      id="katalog"
      aria-labelledby="kado-digital-heading"
      className="digital-gift-section relative z-20 w-full overflow-hidden bg-background px-6 py-20 text-foreground sm:px-10 sm:py-28 lg:px-24"
    >
      {/* Vibrant Ambient Glow Effect */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -top-20 h-96 w-[90vw] -translate-x-1/2 rounded-full bg-gradient-to-r from-violet-600/15 via-fuchsia-500/15 to-pink-500/15 blur-[60px] sm:blur-[120px] transform-gpu"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-1/2 h-80 w-80 rounded-full bg-gradient-to-bl from-cyan-500/15 via-teal-500/10 to-transparent blur-[60px] sm:blur-[100px] transform-gpu"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* ======================================================== */}
        {/* 1. SECTION: KATALOG KADO DIGITAL                        */}
        {/* ======================================================== */}
        <div className="text-center">
          {/* Badge Category */}
          <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-violet-600 dark:text-violet-400">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Digital Gift Website</span>
          </div>

          <h2
            id="kado-digital-heading"
            className="mt-4 font-serif text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            Kirim Kado{" "}
            <span className="italic bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
              Anti-Mainstream
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base text-foreground/65 sm:text-lg">
            Pilih tema website kado interaktif untuk orang tersayang. Cocok untuk
            ulang tahun, anniversary, wisuda, atau ungkapan perasaan spesial!
          </p>
        </div>

        {/* Cards Grid */}
        <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {catalogItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-foreground/12 bg-card/40 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl ${item.borderHover}`}
              >
                <div>
                  {/* Card Header & Badge */}
                  <div className="mb-4 flex items-center justify-between">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider ${item.badgeColor}`}
                    >
                      <Icon className="h-3 w-3" />
                      {item.badge}
                    </span>
                    <span className="rounded-full bg-rose-500/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-rose-500">
                      {item.discountBadge}
                    </span>
                  </div>

                  {/* Thumbnail / Visual Mockup Placeholder */}
                  <div
                    className={`relative mb-6 aspect-video w-full overflow-hidden rounded-2xl border border-foreground/10 ${item.previewBg} shadow-inner transition-transform duration-300 group-hover:scale-[1.02]`}
                  >
                    {item.previewContent}
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-1 text-xs text-foreground/60 sm:text-sm">
                    {item.tagline}
                  </p>

                  {/* Pricing */}
                  <div className="mt-4 flex items-baseline gap-3 border-y border-foreground/8 py-3.5">
                    <span className="text-2xl font-extrabold text-foreground sm:text-3xl">
                      {item.promoPrice}
                    </span>
                    <span className="font-mono text-sm text-foreground/40 line-through">
                      {item.strikePrice}
                    </span>
                  </div>

                  {/* Feature Checklist */}
                  <ul className="mt-5 space-y-2.5 text-xs text-foreground/75 sm:text-sm">
                    {item.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5">
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-500">
                          <Check className="h-2.5 w-2.5 stroke-[3]" />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 2 Buttons Side-by-Side */}
                <div className="mt-8 grid grid-cols-2 gap-3 pt-2">
                  {/* Tombol Sekunder: Lihat Demo */}
                  <a
                    href={item.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full border border-foreground/20 bg-background/80 px-4 py-3 font-mono text-xs font-semibold text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground/5 active:scale-95"
                  >
                    <span>Lihat Demo</span>
                    <ExternalLink className="h-3.5 w-3.5 shrink-0 opacity-70" />
                  </a>

                  {/* Tombol Primer: Pesan Tema Ini (WhatsApp CTA) */}
                  <a
                    href={getWaLink(item.title)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 rounded-full bg-foreground px-4 py-3 font-mono text-xs font-bold text-background shadow-md transition-all duration-200 hover:bg-emerald-600 hover:text-white hover:shadow-lg hover:shadow-emerald-600/25 active:scale-95"
                  >
                    <span>Pesan Tema</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* ======================================================== */}
        {/* 2. SECTION: CARA PEMESANAN (HOW IT WORKS)                */}
        {/* ======================================================== */}
        <div className="mt-28 border-t border-foreground/10 pt-20 sm:mt-36 sm:pt-28">
          <div className="text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-emerald-600 dark:text-emerald-400">
              Proses Cepat & Praktis
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Cara Pesan Gampang Banget
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/65 sm:text-base">
              Hanya butuh 3 langkah santai sampai website kado impianmu siap dibagikan ke si dia.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
            {orderSteps.map((stepItem, idx) => {
              const StepIcon = stepItem.icon;
              return (
                <div
                  key={idx}
                  className="relative flex flex-col items-center rounded-3xl border border-foreground/10 bg-card/25 p-8 text-center backdrop-blur-xs transition-all duration-300 hover:border-foreground/20 hover:bg-card/40"
                >
                  {/* Step Number Tag */}
                  <span className="absolute right-5 top-5 font-mono text-xs font-bold text-foreground/25">
                    {stepItem.step}
                  </span>

                  {/* Step Icon */}
                  <div
                    className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border ${stepItem.bgColor} ${stepItem.iconColor} shadow-inner`}
                  >
                    <StepIcon className="h-8 w-8" />
                  </div>

                  <h3 className="text-lg font-bold text-foreground sm:text-xl">
                    {stepItem.title}
                  </h3>
                  <p className="mt-3 text-xs leading-relaxed text-foreground/65 sm:text-sm">
                    {stepItem.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. SECTION: FAQ ACCORDION                                */}
        {/* ======================================================== */}
        <div className="mt-28 border-t border-foreground/10 pt-20 sm:mt-36 sm:pt-28">
          <div className="text-center">
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.28em] text-violet-600 dark:text-violet-400">
              Frequently Asked Questions
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-foreground/65 sm:text-base">
              Semua yang perlu kamu ketahui tentang layanan website kado digital.
            </p>
          </div>

          {/* Accordion Component */}
          <div className="mx-auto mt-12 max-w-3xl space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`overflow-hidden rounded-2xl border transition-colors duration-200 ${
                    isOpen
                      ? "border-violet-500/40 bg-violet-500/[0.03]"
                      : "border-foreground/10 bg-card/20 hover:border-foreground/20"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                    className="flex w-full items-center justify-between gap-4 p-5 text-left transition-colors sm:p-6"
                  >
                    <span className="font-sans text-base font-semibold text-foreground sm:text-lg">
                      {faq.q}
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/15 bg-background transition-transform duration-300 ${
                        isOpen ? "rotate-180 bg-violet-500 text-white border-transparent" : "text-foreground/60"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </span>
                  </button>

                  {/* Accordion Content */}
                  <div
                    id={`faq-answer-${index}`}
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-foreground/8 px-5 pb-6 pt-4 text-xs leading-relaxed text-foreground/70 sm:px-6 sm:text-sm">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Consultation Box */}
          <div className="mx-auto mt-14 max-w-xl rounded-2xl border border-dashed border-foreground/20 bg-background/50 p-6 text-center">
            <p className="text-sm text-foreground/75">
              Masih punya pertanyaan atau mau request tema khusus?
            </p>
            <a
              href={`https://wa.me/${phoneNumber}?text=Halo%20bro,%20saya%20mau%20tanya%20custom%20tema%20website%20kado`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-2 font-mono text-xs font-bold text-emerald-600 hover:text-emerald-500 hover:underline dark:text-emerald-400"
            >
              <span>Konsultasi Gratis via WhatsApp</span>
              <span>→</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

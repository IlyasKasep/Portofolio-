"use client";

import React, { useState } from "react";

interface FloatingWhatsAppProps {
  phoneNumber?: string;
  defaultMessage?: string;
}

export default function FloatingWhatsApp({
  phoneNumber = "628XXXXXXX", // Ganti dengan nomor WhatsApp aktif kamu (format internasional tanpa tanda +, misal: 6285722645928)
  defaultMessage = "Halo bro, saya mau tanya soal jasa website kado",
}: FloatingWhatsAppProps) {
  const [isHovered, setIsHovered] = useState(false);

  const encodedMessage = encodeURIComponent(defaultMessage);
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3">
      {/* Tooltip / Label "Pesan Sekarang" */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`group relative flex items-center gap-2.5 rounded-full bg-[#25D366] px-4 py-3 text-white shadow-[0_8px_25px_rgba(37,211,102,0.4)] transition-all duration-300 hover:scale-105 hover:bg-[#20ba59] hover:shadow-[0_12px_30px_rgba(37,211,102,0.55)] active:scale-95`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label="Pesan Website Kado via WhatsApp"
      >
        {/* Subtle breathing ring animation */}
        <span
          className="absolute inset-0 -z-10 rounded-full bg-[#25D366]/40 animate-ping"
          style={{ animationDuration: "2.5s" }}
          aria-hidden="true"
        />

        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-6 w-6 shrink-0 transition-transform duration-300 group-hover:rotate-12"
          aria-hidden="true"
        >
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25.7-.72 1.34-1.39 1.7-.51.27-1.18.42-2.82-.25-2.09-.85-3.52-2.88-3.62-3.02-.11-.14-.88-1.17-.88-2.23s.55-1.58.75-1.8c.2-.21.43-.27.57-.27.14 0 .28 0 .4.01.13.01.3.06.46.43.17.38.58 1.41.63 1.51.05.11.09.23.01.37-.07.15-.11.24-.22.37-.11.13-.23.29-.33.39-.11.11-.22.24-.1.44.13.2.56.92 1.21 1.5 1.05.93 1.93 1.22 2.21 1.35.28.14.44.11.6-.07.16-.18.69-.8.88-1.08.18-.27.37-.23.63-.13.25.09 1.6.76 1.88.9.27.14.46.21.52.33.07.11.07.65-.18 1.35" />
        </svg>

        {/* Text Tooltip / Pill Badge */}
        <span className="font-sans text-xs font-bold tracking-wide uppercase sm:text-sm">
          Pesan Sekarang
        </span>
      </a>
    </div>
  );
}

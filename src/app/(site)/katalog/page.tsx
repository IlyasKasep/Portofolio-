import type { Metadata } from "next";
import DigitalGiftSection from "@/sections/digital-gift-section";

export const metadata: Metadata = {
  title: "Katalog Kado Digital | Muhammad Ilyas Satria Fauzan",
  description:
    "Katalog website kado digital interaktif: Retro 8-Bit, Aesthetic Minimalis, Cyberpunk Y2K, dan Blox 3D Couple Mabar (Roblox Game Edition) dengan alur cerita personal, mini games, kuis interaktif, dan lagu favorit.",
  alternates: { canonical: "/katalog" },
  openGraph: {
    title: "Katalog Kado Digital | Muhammad Ilyas Satria Fauzan",
    description:
      "Koleksi website kado digital interaktif untuk merayakan hari spesial orang tersayang: Retro 8-Bit, Aesthetic Minimalis, Cyberpunk Y2K, dan Blox 3D Game Edition.",
    url: "/katalog",
  },
};

export const revalidate = 3600;

export default function KatalogPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground pt-14 sm:pt-20">
      <DigitalGiftSection />
    </main>
  );
}

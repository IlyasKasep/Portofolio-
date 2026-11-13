import type { Metadata } from "next";
import ProjectPageHeader from "@/components/ProjectPageHeader";
import DigitalGiftSection from "@/sections/digital-gift-section";

export const metadata: Metadata = {
  title: "Katalog Kado Digital | Muhammad Ilyas Satria Fauzan",
  description:
    "Katalog website kado digital interaktif: Retro 8-Bit, Aesthetic Minimalis, dan Cyberpunk Y2K dengan alur cerita personal, mini games, kuis interaktif, dan lagu favorit.",
  alternates: { canonical: "/katalog" },
  openGraph: {
    title: "Katalog Kado Digital | Muhammad Ilyas Satria Fauzan",
    description:
      "Koleksi website kado digital interaktif untuk merayakan hari spesial orang tersayang.",
    url: "/katalog",
  },
};

export const revalidate = 3600;

export default function KatalogPage() {
  return (
    <main className="min-h-dvh bg-background text-foreground">
      <ProjectPageHeader active="katalog" />
      <DigitalGiftSection />
    </main>
  );
}

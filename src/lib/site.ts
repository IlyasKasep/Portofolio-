const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "https://ilyaskasep.dev");

export const siteConfig = {
  url: siteUrl,
  name: "Muhammad Ilyas Satria Fauzan",
  shortName: "Ilyas Satria",
  role: "Front End Developer",
  title: "Muhammad Ilyas Satria Fauzan | Front End Developer",
  description:
    "Mahasiswa Teknik Informatika di Universitas Muhammadiyah Bandung dengan fokus kuat pada pengembangan antarmuka (Front End) yang responsif dan interaktif.",
  language: "id",
  locale: "id_ID",
  location: {
    city: "Bandung",
    region: "Jawa Barat",
    country: "Indonesia",
    countryCode: "ID",
  },
  social: {
    github: "https://github.com/IlyasKasep",
    linkedin: "https://www.linkedin.com/in/muhammad-ilyas-satria-fauzan/",
    instagram: "https://instagram.com/potoofyas",
  },
  email: "muhammadilyassatriafauzan@gmail.com",
  projectArchive: "https://github.com/IlyasKasep",
  keywords: [
    "Muhammad Ilyas Satria Fauzan",
    "Ilyas Satria",
    "IlyasKasep",
    "front end developer",
    "React developer",
    "web developer Bandung",
    "software developer portfolio",
  ],
} as const;

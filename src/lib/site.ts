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
  role: "Web Developer",
  title: "Muhammad Ilyas Satria Fauzan | Web Developer",
  description:
    "Mahasiswa tingkat akhir Teknik Informatika (Semester 7) di Universitas Muhammadiyah Bandung asal Bandung yang berfokus pada pengembangan aplikasi web, desain antarmuka responsif, dan arsitektur sistem digital.",
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
    whatsapp: "https://wa.me/6285722645928",
  },
  phone: "+62 857-2264-5928",
  email: "muhammadilyassatriafauzan@gmail.com",
  projectArchive: "https://github.com/IlyasKasep",
  keywords: [
    "Muhammad Ilyas Satria Fauzan",
    "Ilyas Satria",
    "IlyasKasep",
    "web developer",
    "React developer",
    "Next.js developer",
    "web developer Bandung",
    "software developer portfolio",
  ],
} as const;

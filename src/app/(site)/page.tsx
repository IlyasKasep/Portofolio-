import ExperienceSection from "@/sections/experience-section";
import HeroSection from "@/sections/hero-section";
import IntroSection from "@/sections/intro-section";
import ProjectsSection from "@/sections/projects-section";
import GithubContributions from "@/sections/github-contributions";
import ContactSection from "@/sections/contact-section";
import StaggeredMenu from "@/components/StaggeredMenu";
import { siteConfig } from "@/lib/site";
import { getPublicHomeContent } from "@/data/content/public-content";
import { getGithubContributions } from "@/lib/github-contributions";

export const revalidate = 3600;

const personId = `${siteConfig.url}/#person`;
const websiteId = `${siteConfig.url}/#website`;
const profilePageId = `${siteConfig.url}/#profile-page`;

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": personId,
      name: siteConfig.name,
      alternateName: siteConfig.shortName,
      url: siteConfig.url,
      image: `${siteConfig.url}/ilyas.png`,
      jobTitle: siteConfig.role,
      mainEntityOfPage: { "@id": profilePageId },
      address: {
        "@type": "PostalAddress",
        addressLocality: siteConfig.location.city,
        addressRegion: siteConfig.location.region,
        addressCountry: siteConfig.location.countryCode,
      },
      sameAs: Object.values(siteConfig.social),
      knowsAbout: [
        "Web Development",
        "Front End Development",
        "React.js",
        "Next.js",
        "JavaScript",
        "TypeScript",
        "Tailwind CSS",
        "Redux",
        "Database Architecture",
        "Responsive Web Design",
      ],
    },
    {
      "@type": "WebSite",
      "@id": websiteId,
      url: siteConfig.url,
      name: "Ilyas / Portofolio",
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      publisher: { "@id": personId },
    },
    {
      "@type": "ProfilePage",
      "@id": profilePageId,
      url: siteConfig.url,
      name: siteConfig.title,
      description: siteConfig.description,
      inLanguage: siteConfig.language,
      isPartOf: { "@id": websiteId },
      mainEntity: { "@id": personId },
    },
  ],
};

const navigationItems = [
  { label: "Home", ariaLabel: "Go to home section", link: "#home" },
  { label: "About", ariaLabel: "Go to about section", link: "#about" },
  {
    label: "Experience",
    ariaLabel: "Go to experience section",
    link: "#experience",
  },
  {
    label: "Projects",
    ariaLabel: "Go to projects section",
    link: "#projects",
  },
  {
    label: "All Projects",
    ariaLabel: "View all projects",
    link: "/projects",
  },
  { label: "Contact", ariaLabel: "Go to contact section", link: "#contact" },
];

const socialItems = [
  { label: "Resume", link: "/resume" },
  { label: "WhatsApp", link: siteConfig.social.whatsapp },
  { label: "GitHub", link: siteConfig.social.github },
  { label: "LinkedIn", link: siteConfig.social.linkedin },
  { label: "Instagram", link: siteConfig.social.instagram },
];

export default async function Home() {
  const [content, githubContributions] = await Promise.all([
    getPublicHomeContent(),
    getGithubContributions("IlyasKasep"),
  ]);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <main className="relative isolate min-h-dvh overflow-x-clip bg-background text-foreground">
        <StaggeredMenu
          isFixed
          position="right"
          items={navigationItems}
          socialItems={socialItems}
          colors={["#8b5cf6", "#06b6d4"]}
          accentColor="#38bdf8"
          logoText="Ilyas / Portfolio"
          menuButtonColor="#111114"
          openMenuButtonColor="#111114"
        />
        <HeroSection />
        <IntroSection skills={content.skills.map((skill) => skill.name)} />
        <ExperienceSection experiences={content.experiences} />
        <ProjectsSection projects={content.featuredProjects} />
        <GithubContributions initialData={githubContributions} />
        <ContactSection />
      </main>
    </>
  );
}

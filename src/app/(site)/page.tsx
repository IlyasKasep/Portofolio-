import ExperienceSection from "@/sections/experience-section";
import HeroSection from "@/sections/hero-section";
import IntroSection from "@/sections/intro-section";
import ProjectsSection from "@/sections/projects-section";
import GithubContributions from "@/sections/github-contributions";
import ContactSection from "@/sections/contact-section";
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
      <main className="relative isolate min-h-dvh overflow-hidden bg-background text-foreground">
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

"use client";

import { usePathname } from "next/navigation";
import StaggeredMenu, {
  type StaggeredMenuItem,
  type StaggeredMenuSocialItem,
} from "@/components/StaggeredMenu";
import { siteConfig } from "@/lib/site";

export const siteNavigationItems: StaggeredMenuItem[] = [
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
  {
    label: "Katalog Kado",
    ariaLabel: "Lihat katalog website kado digital",
    link: "/katalog",
  },
  { label: "Contact", ariaLabel: "Go to contact section", link: "#contact" },
];

export const siteSocialItems: StaggeredMenuSocialItem[] = [
  { label: "Resume", link: "/resume" },
  { label: "WhatsApp", link: siteConfig.social.whatsapp },
  { label: "GitHub", link: siteConfig.social.github },
  { label: "LinkedIn", link: siteConfig.social.linkedin },
  { label: "Instagram", link: siteConfig.social.instagram },
];

export default function SiteNavigation() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const resolvedItems = siteNavigationItems.map((item) => {
    // If not on home page, convert hash links (#about) into home-anchored links (/#about)
    if (item.link.startsWith("#") && !isHome) {
      return { ...item, link: `/${item.link}` };
    }
    // If on /katalog, make Katalog Kado link to top of the catalog section
    if (pathname === "/katalog" && item.link === "/katalog") {
      return { ...item, link: "#kado-digital" };
    }
    return item;
  });

  return (
    <StaggeredMenu
      key={pathname}
      isFixed
      position="right"
      items={resolvedItems}
      socialItems={siteSocialItems}
      colors={["#8b5cf6", "#06b6d4"]}
      accentColor="#38bdf8"
      logoText="Ilyas / Portfolio"
      menuButtonColor="#111114"
      openMenuButtonColor="#111114"
    />
  );
}

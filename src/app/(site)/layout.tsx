import PageTransition from "@/components/PageTransition";
import SmoothScroll from "@/components/SmoothScroll";
import SiteNavigation from "@/components/SiteNavigation";

export default function PublicSiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <PageTransition>
      <SmoothScroll>
        <SiteNavigation />
        {children}
      </SmoothScroll>
    </PageTransition>
  );
}

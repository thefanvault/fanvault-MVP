import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

interface LayoutProps {
  children: React.ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  // On mobile, only show footer on home page
  const shouldShowFooter = !isMobile || location.pathname === "/";
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 md:pb-6">
        {children}
      </main>

      {shouldShowFooter && <Footer />}
      <MobileNav currentPath={location.pathname} />
    </div>
  );
}
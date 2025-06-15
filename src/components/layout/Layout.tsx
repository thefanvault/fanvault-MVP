import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pb-20 md:pb-6">
        {children}
      </main>

      <Footer />
      <MobileNav currentPath={location.pathname} />
    </div>
  );
}
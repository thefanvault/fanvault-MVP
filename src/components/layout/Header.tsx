import { Button } from "@/components/ui/button";
import { Search, Bell, User } from "lucide-react";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-fanvault-gradient rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">★</span>
          </div>
          <span className="font-bold text-xl">FanVault</span>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-foreground hover:text-primary transition-colors">
            Home
          </a>
          <a href="/discover" className="text-foreground hover:text-primary transition-colors">
            Discover
          </a>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Search className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button className="hidden md:inline-flex bg-fanvault-gradient">
            Sign Up
          </Button>
        </div>
      </div>
    </header>
  );
}
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/">
          <div className="flex items-center gap-2 cursor-pointer" data-testid="nav-logo">
            <span className="text-2xl">🇮🇳</span>
            <span className="font-bold text-lg bg-gradient-to-r from-primary via-emerald-500 to-orange-500 bg-clip-text text-transparent">
              Export Intelligence Hub
            </span>
          </div>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <a href="#resources" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Resources</a>
          <a href="#journey" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Journey</a>
          <a href="#tools" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">Tools</a>
          <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors">About</a>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex" data-testid="button-nav-search">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button data-testid="button-nav-cta">
            Start Exporting &rarr;
          </Button>
        </div>
      </div>
    </header>
  );
}

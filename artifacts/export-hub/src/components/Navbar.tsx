import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Search, Menu, X, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const navItems = [
  { label: "Resources", id: "tools" },
  { label: "Journey", id: "journey" },
  { label: "Comparison", id: "resources" },
  { label: "Documents", id: "downloads" },
  { label: "About", id: "about" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = root.classList.contains("dark");
    setIsDark(currentTheme);
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "attributes" && mutation.attributeName === "class") {
          setIsDark(root.classList.contains("dark"));
        }
      });
    });
    
    observer.observe(root, { attributes: true });
    return () => observer.disconnect();
  }, []);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (root.classList.contains("dark")) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/60 glass-strong backdrop-blur-md">
        <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer select-none shrink-0" data-testid="nav-logo">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary via-secondary to-accent flex items-center justify-center shadow-lg shadow-primary/20">
                <span className="text-white font-bold text-base">S</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight text-foreground">Savita Global</span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-wide">EXPORT INTELLIGENCE</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {navItems.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted/60 transition-all duration-200 bg-transparent border-none cursor-pointer focus-ring"
                data-testid={`nav-link-${id}`}
                aria-label={`Navigate to ${label}`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex h-10 w-10 rounded-xl hover:bg-muted/60 focus-ring"
              onClick={() => {
                scrollTo("tools");
                setTimeout(() => {
                  const input = document.querySelector<HTMLInputElement>('[data-testid="input-search-portals"]');
                  input?.focus();
                }, 500);
              }}
              data-testid="button-nav-search"
              aria-label="Search portals"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="hidden sm:flex h-10 w-10 rounded-xl hover:bg-muted/60 focus-ring"
              onClick={toggleTheme}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-4 w-4 text-muted-foreground" /> : <Moon className="h-4 w-4 text-muted-foreground" />}
            </Button>
            
            <Button
              onClick={() => scrollTo("tools")}
              data-testid="button-nav-cta"
              className="hidden sm:inline-flex h-10 px-6 rounded-xl font-semibold text-sm shadow-md focus-ring"
            >
              Start Exporting
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-10 w-10 rounded-xl focus-ring"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 border-b border-border glass-strong lg:hidden backdrop-blur-md"
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollTo(id);
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3.5 text-sm font-medium text-muted-foreground hover:text-foreground rounded-xl hover:bg-muted/60 transition-all bg-transparent border-none cursor-pointer focus-ring min-h-[48px]"
                  aria-label={`Navigate to ${label}`}
                >
                  {label}
                </button>
              ))}
              <div className="pt-2 pb-1 flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-10 w-10 rounded-xl focus-ring"
                  onClick={toggleTheme}
                  aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                >
                  {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={() => {
                    scrollTo("tools");
                    setMobileOpen(false);
                  }}
                  className="flex-1 h-10 rounded-xl font-semibold focus-ring"
                >
                  Start Exporting
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}

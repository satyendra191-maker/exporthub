import { useState } from "react";
import { Link } from "wouter";
import { Search, Menu, X } from "lucide-react";
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

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border/60 glass-strong">
        <div className="h-full flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-[1440px] mx-auto">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-3 cursor-pointer select-none shrink-0" data-testid="nav-logo">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary via-primary to-primary/80 flex items-center justify-center shadow-sm">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-tight text-foreground">Savita Global</span>
                <span className="text-[10px] text-muted-foreground font-medium tracking-wide">EXPORT INTELLIGENCE</span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/60 transition-all duration-200 bg-transparent border-none cursor-pointer"
                data-testid={`nav-link-${id}`}
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
              className="hidden sm:flex h-9 w-9 rounded-lg hover:bg-muted/60"
              onClick={() => {
                scrollTo("tools");
                setTimeout(() => {
                  const input = document.querySelector<HTMLInputElement>('[data-testid="input-search-portals"]');
                  input?.focus();
                }, 500);
              }}
              data-testid="button-nav-search"
              aria-label="Search"
            >
              <Search className="h-4 w-4 text-muted-foreground" />
            </Button>
            <Button
              onClick={() => scrollTo("tools")}
              data-testid="button-nav-cta"
              className="hidden sm:inline-flex h-9 px-5 rounded-lg font-medium text-sm shadow-sm"
            >
              Start Exporting
            </Button>

            {/* Mobile menu toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden h-9 w-9 rounded-lg"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed top-16 left-0 right-0 z-40 border-b border-border glass-strong lg:hidden"
          >
            <div className="px-4 py-3 space-y-1">
              {navItems.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => {
                    scrollTo(id);
                    setMobileOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground rounded-lg hover:bg-muted/60 transition-all bg-transparent border-none"
                >
                  {label}
                </button>
              ))}
              <div className="pt-2 pb-1">
                <Button
                  onClick={() => {
                    scrollTo("tools");
                    setMobileOpen(false);
                  }}
                  className="w-full h-10 rounded-lg font-medium"
                >
                  Start Exporting
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
}

import { Link } from "wouter";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

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
          {[
            { label: "Resources", id: "tools" },
            { label: "Journey", id: "journey" },
            { label: "Comparison", id: "resources" },
            { label: "About", id: "about" },
          ].map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors bg-transparent border-none cursor-pointer"
              data-testid={`nav-link-${id}`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="hidden sm:flex"
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
            <Search className="h-5 w-5" />
          </Button>
          <Button
            onClick={() => scrollTo("tools")}
            data-testid="button-nav-cta"
          >
            Start Exporting &rarr;
          </Button>
        </div>
      </div>
    </header>
  );
}

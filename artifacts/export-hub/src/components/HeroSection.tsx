import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, Zap } from "lucide-react";

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

const stats = [
  { value: "10", label: "Gov't Portals", icon: "📊" },
  { value: "24", label: "Doc Templates", icon: "📄" },
  { value: "200+", label: "Countries", icon: "🌍" },
  { value: "15+", label: "Export Schemes", icon: "📈" },
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden min-h-[92vh] flex items-center" id="about">
      {/* Animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30" />
        {/* Floating orbs with premium animation */}
        <div className="absolute top-[15%] left-[10%] w-[500px] h-[500px] rounded-full bg-primary/[0.08] animate-pulse-glow blur-32" />
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] rounded-full bg-secondary/[0.06] animate-pulse-glow blur-32" style={{ animationDelay: "2s" }} />
        <div className="absolute top-[40%] right-[30%] w-[300px] h-[300px] rounded-full bg-accent/[0.05] animate-pulse-glow blur-24" style={{ animationDelay: "4s" }} />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium AI Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <Badge variant="ai" className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold mb-8" data-testid="hero-badge">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Export Intelligence Platform</span>
            </Badge>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6 leading-[1.1]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          >
            Export Smarter,{" "}
            <span className="gradient-text">Grow Faster.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            One intelligent hub for government portals, export documents, trade data, and compliance — everything your export business needs, all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <Button
              size="lg"
              className="h-12 px-8 rounded-xl text-base font-semibold shadow-md focus-ring group"
              onClick={() => scrollTo("tools")}
              data-testid="hero-explore-btn"
            >
              Explore Portals
              <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 px-8 rounded-xl text-base font-semibold focus-ring group"
              onClick={() => scrollTo("journey")}
              data-testid="hero-journey-btn"
            >
              View Export Journey
              <Zap className="w-4 h-4 ml-2 opacity-70" />
            </Button>
          </motion.div>

          {/* Stats - Premium KPI cards */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center p-5 rounded-2xl bg-card/80 border border-card-border shadow-card group hover:shadow-card-hover transition-all duration-300"
                whileHover={{ y: -4 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <div className="text-2xl sm:text-3xl font-extrabold gradient-text mb-1">{stat.value}</div>
                <div className="text-xs font-medium text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-border/60 flex items-start justify-center p-1"
        >
          <div className="w-1.5 h-3 rounded-full bg-muted-foreground/40" />
        </motion.div>
      </div>
    </section>
  );
}

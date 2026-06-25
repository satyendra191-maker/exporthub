import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-32 bg-background" id="about">
      {/* Decorative background */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-40 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10 text-center">
        <motion.h1 
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Export Intelligence Hub
        </motion.h1>
        
        <motion.p 
          className="text-xl md:text-2xl text-primary font-medium mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Your One-Stop Gateway to India's Complete Export Ecosystem
        </motion.p>
        
        <motion.p 
          className="max-w-3xl mx-auto text-lg text-muted-foreground mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Research markets, register your business, analyze trade statistics, explore government schemes, understand customs procedures, find buyers, and grow your exports—all from one centralized platform.
        </motion.p>

        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button size="lg" className="text-base px-8 h-14 rounded-full" data-testid="hero-explore-btn">
            Explore Resources
          </Button>
          <Button size="lg" variant="outline" className="text-base px-8 h-14 rounded-full" data-testid="hero-journey-btn">
            Start Export Journey
          </Button>
        </motion.div>

        <motion.div 
          className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-semibold text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span>10 Government Portals</span>
          <span className="hidden md:inline">•</span>
          <span>15+ Export Schemes</span>
          <span className="hidden md:inline">•</span>
          <span>₹2L+ Cr Export Target</span>
          <span className="hidden md:inline">•</span>
          <span>200+ Countries</span>
        </motion.div>
      </div>
    </section>
  );
}

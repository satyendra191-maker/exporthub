import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BarChart3, Layers, Briefcase, Globe2, Wrench, FileText } from "lucide-react";

const metrics = [
  { label: "Gov't Portals", value: 10, icon: BarChart3, gradient: "from-primary to-primary/80", bg: "bg-primary/8" },
  { label: "Export Categories", value: 6, icon: Layers, gradient: "from-secondary to-secondary/80", bg: "bg-secondary/8" },
  { label: "Export Schemes", value: 15, suffix: "+", icon: Briefcase, gradient: "from-warning to-warning/80", bg: "bg-warning/8" },
  { label: "Global Markets", value: 200, suffix: "+", icon: Globe2, gradient: "from-accent to-accent/80", bg: "bg-accent/8" },
  { label: "Research Tools", value: 5, icon: Wrench, gradient: "from-teal-500 to-teal-600", bg: "bg-teal-500/8" },
  { label: "Doc Templates", value: 24, icon: FileText, gradient: "from-destructive to-destructive/80", bg: "bg-destructive/8" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    
    const duration = 1800;
    const incrementTime = (duration / end) || 50;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start >= end) clearInterval(timer);
    }, incrementTime);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return <span>{count}{suffix}</span>;
}

export function DashboardWidgets() {
  return (
    <section className="py-16 bg-muted/30 border-y border-border/40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="group"
              >
                <div className="relative p-5 rounded-2xl bg-card border border-border shadow-card hover:shadow-card-hover transition-all duration-300 cursor-pointer">
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-gradient-to-br flex items-center justify-center opacity-80 group-hover:scale-110 transition-transform duration-300">
                    <Icon className={`w-4 h-4 text-white bg-gradient-to-br ${metric.gradient} bg-clip-text`} style={{ color: "transparent" }} />
                  </div>
                  <div className="text-2xl font-extrabold tracking-tight mb-1 gradient-text">
                    <AnimatedCounter value={metric.value} suffix={metric.suffix} />
                  </div>
                  <div className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
                    {metric.label}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

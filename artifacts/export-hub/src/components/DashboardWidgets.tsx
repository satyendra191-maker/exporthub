import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Building2, Layers, Briefcase, Globe2, Wrench, FileText } from "lucide-react";

const metrics = [
  { label: "Gov't Portals", value: 10, icon: Building2, color: "from-blue-500 to-blue-600", bg: "bg-blue-50/60" },
  { label: "Export Categories", value: 6, icon: Layers, color: "from-emerald-500 to-emerald-600", bg: "bg-emerald-50/60" },
  { label: "Export Schemes", value: 15, suffix: "+", icon: Briefcase, color: "from-amber-500 to-amber-600", bg: "bg-amber-50/60" },
  { label: "Global Markets", value: 200, suffix: "+", icon: Globe2, color: "from-purple-500 to-purple-600", bg: "bg-purple-50/60" },
  { label: "Research Tools", value: 5, icon: Wrench, color: "from-teal-500 to-teal-600", bg: "bg-teal-50/60" },
  { label: "Doc Templates", value: 24, icon: FileText, color: "from-rose-500 to-rose-600", bg: "bg-rose-50/60" },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    const duration = 1800;
    const incrementTime = duration / end;
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value]);
  return <span>{count}{suffix}</span>;
}

export function DashboardWidgets() {
  return (
    <section className="py-16 bg-muted/30 border-y border-border/40">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 16, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
              >
                <div className="relative p-5 rounded-2xl bg-card border border-card-border shadow-sm hover:shadow-md transition-all duration-300 card-lift group">
                  <div className={`absolute top-3 right-3 w-8 h-8 rounded-lg ${metric.bg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className={`w-4 h-4 bg-gradient-to-br ${metric.color} bg-clip-text text-transparent`} style={{ color: "transparent" }} />
                    {/* Fallback for gradient text */}
                    <Icon className={`w-4 h-4 absolute opacity-0`} />
                  </div>
                  <div className="text-2xl font-extrabold tracking-tight mb-1 bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
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

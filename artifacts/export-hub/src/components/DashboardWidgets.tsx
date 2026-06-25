import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Building2, Layers, Briefcase, Globe2, Wrench, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const metrics = [
  { label: "Gov't Portals", value: 10, icon: Building2, color: "text-blue-500", bg: "bg-blue-50" },
  { label: "Export Categories", value: 6, icon: Layers, color: "text-emerald-500", bg: "bg-emerald-50" },
  { label: "Export Schemes", value: 15, suffix: "+", icon: Briefcase, color: "text-orange-500", bg: "bg-orange-50" },
  { label: "Markets", value: 200, suffix: "+", icon: Globe2, color: "text-purple-500", bg: "bg-purple-50" },
  { label: "Research Tools", value: 5, icon: Wrench, color: "text-teal-500", bg: "bg-teal-50" },
  { label: "Customs", value: 24, suffix: "/7", icon: Clock, color: "text-red-500", bg: "bg-red-50" }
];

function AnimatedCounter({ value }: { value: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    
    let totalDuration = 2000;
    let incrementTime = (totalDuration / end);
    
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{count}</span>;
}

export function DashboardWidgets() {
  return (
    <section className="py-12 bg-muted/30 border-y">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                    <div className={`p-3 rounded-full mb-4 ${metric.bg}`}>
                      <Icon className={`w-6 h-6 ${metric.color}`} />
                    </div>
                    <div className="text-3xl font-bold tracking-tight mb-1">
                      <AnimatedCounter value={metric.value} />
                      {metric.suffix}
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">{metric.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

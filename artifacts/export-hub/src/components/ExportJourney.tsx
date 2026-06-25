import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const steps = [
  { step: 1, title: "Choose Product", portals: ["ODOP"], desc: "Identify your product and local manufacturing clusters." },
  { step: 2, title: "Market Research", portals: ["TradeStat", "NIRYAT", "Indian Trade Portal"], desc: "Analyze data, find demand, and check HS codes and tariffs." },
  { step: 3, title: "Registration", portals: ["DGFT"], desc: "Register your business and obtain your Importer Exporter Code (IEC)." },
  { step: 4, title: "Sector Certification", portals: ["APEDA", "EPCs"], desc: "Get quality certifications and RCMC from respective councils." },
  { step: 5, title: "Customs & Shipping", portals: ["ICEGATE"], desc: "File shipping bills and clear customs electronically." },
  { step: 6, title: "Find Buyers", portals: ["FIEO"], desc: "Attend buyer-seller meets and trade delegations." },
  { step: 7, title: "Export Successfully! 🎉", portals: [], desc: "Ship your goods and claim export incentives." },
];

export function ExportJourney() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-20 bg-background" id="journey">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">The Export Journey</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A step-by-step roadmap to taking your business global. See exactly which portals you need at each stage.
          </p>
        </motion.div>

        <motion.div 
          className="relative max-w-5xl mx-auto"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical line for mobile, horizontal for desktop */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:hidden" />
          
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center gap-y-10 md:gap-y-16">
            {steps.map((step, index) => (
              <motion.div 
                key={step.step} 
                className="relative pl-20 md:pl-0 md:w-1/4 md:px-4 flex flex-col md:items-center md:text-center"
                variants={item}
              >
                {/* Desktop connector line */}
                {index !== 0 && index % 4 !== 0 && (
                  <div className="hidden md:block absolute top-6 right-[50%] left-[-50%] h-0.5 bg-border -z-10" />
                )}
                
                <div className="absolute left-4 top-0 md:relative md:left-auto md:top-auto w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shadow-md z-10 text-lg mb-4">
                  {step.step}
                </div>
                
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                
                {step.portals.length > 0 && (
                  <div className="flex flex-wrap md:justify-center gap-1.5 mb-3">
                    {step.portals.map(p => (
                      <Badge key={p} variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
                        {p}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

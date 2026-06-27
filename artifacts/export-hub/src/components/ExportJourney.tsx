import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const steps = [
  { step: 1, title: "Choose Product", portals: ["ODOP"], desc: "Identify your product and local manufacturing clusters." },
  { step: 2, title: "Market Research", portals: ["TradeStat", "NIRYAT", "Indian Trade Portal"], desc: "Analyze data, find demand, and check HS codes and tariffs." },
  { step: 3, title: "Registration", portals: ["DGFT"], desc: "Register your business and obtain your Importer Exporter Code (IEC)." },
  { step: 4, title: "Certification", portals: ["APEDA", "EPCs"], desc: "Get quality certifications and RCMC from respective councils." },
  { step: 5, title: "Customs & Shipping", portals: ["ICEGATE"], desc: "File shipping bills and clear customs electronically." },
  { step: 6, title: "Find Buyers", portals: ["FIEO"], desc: "Attend buyer-seller meets and trade delegations." },
  { step: 7, title: "Export Successfully!", portals: [], desc: "Ship your goods and claim export incentives." },
];

export function ExportJourney() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <section className="py-24 bg-background" id="journey">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Your Export Journey</h2>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            A step-by-step roadmap from product selection to successful export. Every step connected to the right portal.
          </p>
        </motion.div>

        <motion.div
          className="max-w-5xl mx-auto relative"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          {/* Vertical connector line for mobile */}
          <div className="absolute left-7 top-6 bottom-6 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent md:hidden" />

          {/* Horizontal connector for desktop */}
          <div className="hidden md:block absolute top-8 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

          <div className="flex flex-col md:flex-row md:flex-wrap md:justify-center gap-y-12 md:gap-y-16 gap-x-4">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className="relative pl-20 md:pl-0 md:w-[22%] md:px-2 flex flex-col md:items-center md:text-center"
                variants={item}
              >
                {/* Step circle */}
                <div className="absolute left-0 md:relative md:left-auto md:top-auto w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white flex items-center justify-center font-bold text-lg shadow-lg shadow-primary/20 z-10 mb-4 shrink-0 md:mb-6 border-4 border-background">
                  {step.step}
                </div>

                {/* Arrow (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-7 right-[-10%] text-primary/30 z-0">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-foreground mb-1.5">{step.title}</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-3">{step.desc}</p>

                  {step.portals.length > 0 && (
                    <div className="flex flex-wrap md:justify-center gap-1.5">
                      {step.portals.map((p) => (
                        <span
                          key={p}
                          className="inline-flex px-2.5 py-1 text-[10px] font-semibold rounded-lg bg-primary/8 text-primary border border-primary/15"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

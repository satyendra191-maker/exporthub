import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PartyPopper, RotateCcw } from "lucide-react";

const checklistItems = [
  "IEC Registration",
  "GST Registration",
  "PAN Card",
  "Bank Account (AD Category)",
  "RCMC Certificate",
  "APEDA Registration (if food)",
  "Product Standards Compliance",
  "Packaging Norms",
  "HS Code Identification",
  "Buyer Identification",
  "Shipping Line Selection",
  "CHA Appointment",
  "Export Insurance",
  "Documentation Preparation",
  "Payment Terms Agreement",
];

export function ReadinessChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("export-checklist");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch {
        console.error("Failed to parse checklist state");
      }
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("export-checklist", JSON.stringify(checkedItems));
    }
  }, [checkedItems, mounted]);

  const toggleItem = (item: string) => {
    setCheckedItems((prev) => ({ ...prev, [item]: !prev[item] }));
  };

  const resetAll = () => {
    setCheckedItems({});
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);
  const isComplete = completedCount === checklistItems.length;

  if (!mounted) return null;

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="shadow-card border border-card-border rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-primary/5 to-transparent border-b border-border/60 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight">
                      Export Readiness Checklist
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      Track your progress. Progress is saved automatically.
                    </CardDescription>
                  </div>
                  <button
                    onClick={resetAll}
                    className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
                    aria-label="Reset checklist"
                  >
                    <RotateCcw className="w-3 h-3" />
                    Reset
                  </button>
                </div>

                <div className="mt-5 space-y-2">
                  <div className="flex justify-between text-sm font-semibold">
                    <span className="text-muted-foreground">
                      {completedCount} of {checklistItems.length} completed
                    </span>
                    <span className="text-foreground">{progressPercent}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-2.5 rounded-full" />
                </div>
              </CardHeader>

              <CardContent className="p-6">
                {isComplete ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center text-center py-8"
                  >
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center mb-4 shadow-lg shadow-primary/20">
                      <PartyPopper className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">All Ready!</h3>
                    <p className="text-sm text-muted-foreground">
                      You are fully prepared to start exporting. Good luck!
                    </p>
                  </motion.div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {checklistItems.map((item, index) => (
                      <motion.div
                        key={item}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-muted/40 hover:bg-muted/60 transition-colors cursor-pointer group"
                        onClick={() => toggleItem(item)}
                      >
                        <Checkbox
                          checked={checkedItems[item] || false}
                          className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                        />
                        <span className={`text-sm font-medium transition-colors ${checkedItems[item] ? "text-muted-foreground line-through" : "text-foreground"}`}>
                          {item}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

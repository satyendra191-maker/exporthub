import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
            <Card className="shadow-card border border-border rounded-2xl overflow-hidden">
              <CardHeader className="bg-gradient-to-br from-primary/[0.03] to-transparent border-b border-border/60 pb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl font-bold tracking-tight flex items-center gap-2">
                      <span>Export Readiness Checklist</span>
                      <PartyPopper className="w-5 h-5 text-primary" />
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground mt-1">
                      Track your progress. Progress is saved automatically.
                    </CardDescription>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetAll}
                    className="text-xs text-muted-foreground hover:text-foreground rounded-lg focus-ring"
                    aria-label="Reset checklist"
                  >
                    <RotateCcw className="w-3 h-3 mr-1" />
                    Reset
                  </Button>
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
                <AnimatePresence mode="wait">
                  {isComplete ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-col items-center text-center py-10"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-success to-success/80 flex items-center justify-center mb-6 shadow-lg shadow-success/20">
                        <PartyPopper className="w-10 h-10 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">All Ready!</h3>
                      <p className="text-sm text-muted-foreground max-w-sm">
                        You are fully prepared to start exporting. Good luck with your export journey!
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
                          className="flex items-start gap-3 p-3.5 rounded-xl bg-muted/40 hover:bg-muted/60 transition-all cursor-pointer group"
                          onClick={() => toggleItem(item)}
                          whileHover={{ x: 4 }}
                        >
                          <Checkbox
                            checked={checkedItems[item] || false}
                            className="mt-0.5 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                          />
                          <span className={`text-sm font-medium transition-colors ${checkedItems[item] ? "text-muted-foreground line-through" : "text-foreground group-hover:text-primary"}`}>
                            {item}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

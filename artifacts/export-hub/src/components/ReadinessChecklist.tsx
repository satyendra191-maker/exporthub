import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PartyPopper } from "lucide-react";

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
  "Payment Terms Agreement"
];

export function ReadinessChecklist() {
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("export-checklist");
    if (saved) {
      try {
        setCheckedItems(JSON.parse(saved));
      } catch (e) {
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
    setCheckedItems(prev => ({
      ...prev,
      [item]: !prev[item]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercent = Math.round((completedCount / checklistItems.length) * 100);
  const isComplete = completedCount === checklistItems.length;

  if (!mounted) return null;

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <Card className="shadow-lg border-2">
            <CardHeader className="bg-card border-b pb-6">
              <CardTitle className="text-2xl flex items-center gap-2">
                Export Readiness Checklist
              </CardTitle>
              <CardDescription className="text-base">
                Track your progress towards becoming export-ready. Your progress is saved automatically.
              </CardDescription>
              
              <div className="mt-6 space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">{completedCount} of {checklistItems.length} Complete</span>
                  <span className="text-primary">{progressPercent}%</span>
                </div>
                <Progress value={progressPercent} className="h-2.5" />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              {isComplete && (
                <motion.div 
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="mb-8 p-4 bg-emerald-50 border border-emerald-200 rounded-lg flex items-center gap-3 text-emerald-700 font-medium"
                >
                  <PartyPopper className="w-6 h-6" />
                  You're Export Ready! 🚀 Time to take your business global.
                </motion.div>
              )}
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {checklistItems.map((item) => (
                  <div 
                    key={item} 
                    className={`flex items-start space-x-3 p-3 rounded-lg transition-colors cursor-pointer ${
                      checkedItems[item] ? "bg-muted/50" : "hover:bg-muted/30"
                    }`}
                    onClick={() => toggleItem(item)}
                  >
                    <Checkbox 
                      id={`check-${item}`} 
                      checked={!!checkedItems[item]} 
                      onCheckedChange={() => toggleItem(item)}
                      className="mt-0.5"
                    />
                    <label 
                      htmlFor={`check-${item}`} 
                      className={`text-sm font-medium leading-none cursor-pointer select-none transition-colors ${
                        checkedItems[item] ? "text-muted-foreground line-through" : "text-foreground"
                      }`}
                      onClick={(e) => e.preventDefault()} // Let parent div handle click
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { portals } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X } from "lucide-react";

export function ComparisonTable() {
  return (
    <section className="py-16 bg-muted/20" id="resources">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Portal Comparison Matrix</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A quick reference guide to understand which portal to use at what stage of your export journey.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-xl border bg-card shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-primary/5">
                <TableRow className="hover:bg-primary/5">
                  <TableHead className="w-[200px] font-semibold text-primary sticky left-0 bg-primary/5 shadow-[1px_0_0_0_hsl(var(--border))] z-10">Portal Name</TableHead>
                  <TableHead className="font-semibold">Primary Purpose</TableHead>
                  <TableHead className="font-semibold">Best For</TableHead>
                  <TableHead className="font-semibold">Registration</TableHead>
                  <TableHead className="font-semibold">Authority</TableHead>
                  <TableHead className="font-semibold">Export Stage</TableHead>
                  <TableHead className="font-semibold">Cost</TableHead>
                  <TableHead className="font-semibold text-center">Mobile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portals.map((portal, idx) => (
                  <TableRow key={portal.id} className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                    <TableCell className="font-medium sticky left-0 z-10 bg-inherit shadow-[1px_0_0_0_hsl(var(--border))]">
                      {portal.name}
                    </TableCell>
                    <TableCell>{portal.category}</TableCell>
                    <TableCell>{portal.bestFor}</TableCell>
                    <TableCell className="text-sm">{portal.registration}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">{portal.authority}</TableCell>
                    <TableCell>
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary/10 text-secondary-foreground">
                        {portal.exportStage}
                      </span>
                    </TableCell>
                    <TableCell className="text-sm">{portal.cost}</TableCell>
                    <TableCell className="text-center">
                      {portal.mobileFriendly === "Yes" ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : portal.mobileFriendly === "Limited" ? (
                        <span className="text-amber-500 text-xs font-bold">LTD</span>
                      ) : (
                        <X className="w-4 h-4 text-destructive mx-auto" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

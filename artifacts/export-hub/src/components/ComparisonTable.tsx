import { motion } from "framer-motion";
import { portals } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Phone, Mail, MessageCircle, User, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ComparisonTableProps {
  onFilterByStage: (stage: string) => void;
  onFilterByCategory: (cat: string) => void;
}

const stageColors: Record<string, string> = {
  "Pre-Export":        "bg-blue-100 text-blue-800 hover:bg-blue-200",
  "Registration":      "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
  "Product Selection": "bg-orange-100 text-orange-800 hover:bg-orange-200",
  "Market Selection":  "bg-teal-100 text-teal-800 hover:bg-teal-200",
  "Research":          "bg-cyan-100 text-cyan-800 hover:bg-cyan-200",
  "Execution":         "bg-purple-100 text-purple-800 hover:bg-purple-200",
  "Certification":     "bg-success/20 text-success hover:bg-success/30",
  "Shipping":          "bg-amber-100 text-amber-800 hover:bg-amber-200",
  "Setup":             "bg-pink-100 text-pink-800 hover:bg-pink-200",
};

const costColors: Record<string, string> = {
  "Free":              "bg-success/20 text-success hover:bg-success/30",
  "Paid (IEC ₹500)":  "bg-warning/20 text-warning hover:bg-warning/30",
  "Paid (Membership)": "bg-amber-100 text-amber-800 hover:bg-amber-200",
  "Paid (Registration)":"bg-destructive/20 text-destructive hover:bg-destructive/30",
};

export function ComparisonTable({ onFilterByStage, onFilterByCategory }: ComparisonTableProps) {
  return (
    <section className="py-20 bg-muted/20" id="resources">
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
            Click any <span className="inline-flex items-center gap-1 text-primary font-medium"><Filter className="w-3 h-3"/>Stage</span> or{" "}
            <span className="font-medium text-success">Cost</span> badge to instantly filter the portal cards above.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="rounded-2xl border bg-card shadow-card overflow-hidden"
        >
          <div className="overflow-x-auto">
            <Table>
              <TableHeader className="bg-primary/[0.03]">
                <TableRow className="hover:bg-transparent border-b-2">
                  <TableHead className="w-[180px] font-semibold text-primary sticky left-0 bg-primary/[0.03] shadow-[1px_0_0_0_hsl(var(--border))] z-10">
                    Portal
                  </TableHead>
                  <TableHead className="font-semibold">Category</TableHead>
                  <TableHead className="font-semibold">Best For</TableHead>

                  {/* Clickable columns */}
                  <TableHead className="font-semibold text-primary">
                    <span className="flex items-center gap-1"><Filter className="w-3 h-3" /> Stage</span>
                  </TableHead>
                  <TableHead className="font-semibold text-success">
                    <span className="flex items-center gap-1"><Filter className="w-3 h-3" /> Cost</span>
                  </TableHead>

                  <TableHead className="font-semibold text-center">Mobile</TableHead>

                  {/* Authority */}
                  <TableHead className="font-semibold min-w-[200px] border-l-2 border-primary/20 bg-primary/[0.02]">
                    <span className="flex items-center gap-1.5 text-primary">
                      <User className="w-3.5 h-3.5" /> Top Authority
                    </span>
                  </TableHead>
                  <TableHead className="font-semibold min-w-[160px] bg-primary/[0.02]">
                    <span className="flex items-center gap-1.5 text-primary">
                      <Phone className="w-3.5 h-3.5" /> Office Direct
                    </span>
                  </TableHead>
                  <TableHead className="font-semibold min-w-[160px] bg-primary/[0.02]">
                    <span className="flex items-center gap-1.5 text-success">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </span>
                  </TableHead>

                  {/* Helpdesk */}
                  <TableHead className="font-semibold min-w-[180px] border-l-2 border-border">
                    <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> Helpline</span>
                  </TableHead>
                  <TableHead className="font-semibold min-w-[220px]">
                    <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> Email</span>
                  </TableHead>
                  <TableHead className="font-semibold">Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portals.map((portal, idx) => (
                  <TableRow
                    key={portal.id}
                    className={`transition-colors hover:bg-muted/30 ${idx % 2 === 0 ? "bg-background" : "bg-muted/10"}`}
                    data-testid={`row-portal-${portal.id}`}
                  >
                    {/* Sticky portal name */}
                    <TableCell className="font-semibold sticky left-0 z-10 bg-inherit shadow-[1px_0_0_0_hsl(var(--border))] text-sm">
                      {portal.name}
                    </TableCell>

                    {/* Category — clickable */}
                    <TableCell>
                      <button
                        onClick={() => onFilterByCategory(portal.category)}
                        className="text-xs font-medium text-primary underline-offset-2 hover:underline cursor-pointer bg-transparent border-none text-left rounded px-1 py-0.5 hover:bg-primary/5 transition-colors"
                        title={`Filter by ${portal.category}`}
                        data-testid={`filter-cat-${portal.id}`}
                      >
                        {portal.category}
                      </button>
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground">{portal.bestFor}</TableCell>

                    {/* Stage — clickable badge */}
                    <TableCell>
                      <button
                        onClick={() => onFilterByStage(portal.exportStage)}
                        title={`Show only ${portal.exportStage} portals`}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer border-none transition-all duration-150 ${
                          stageColors[portal.exportStage] ?? "bg-slate-100 text-slate-700 hover:bg-slate-200"
                        }`}
                        data-testid={`filter-stage-${portal.id}`}
                      >
                        <Filter className="w-2.5 h-2.5" />
                        {portal.exportStage}
                      </button>
                    </TableCell>

                    {/* Cost — clickable badge */}
                    <TableCell>
                      <button
                        onClick={() => onFilterByStage(portal.cost)}
                        title={`Show ${portal.cost} portals`}
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold cursor-pointer border-none transition-all duration-150 ${
                          costColors[portal.cost] ?? "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                        data-testid={`filter-cost-${portal.id}`}
                      >
                        <Filter className="w-2.5 h-2.5" />
                        {portal.cost}
                      </button>
                    </TableCell>

                    {/* Mobile */}
                    <TableCell className="text-center">
                      {portal.mobileFriendly === "Yes" ? (
                        <Check className="w-5 h-5 text-success mx-auto" />
                      ) : portal.mobileFriendly === "Limited" ? (
                        <span className="text-warning font-bold text-xs">LTD</span>
                      ) : portal.mobileFriendly === "Depends" ? (
                        <span className="text-warning/70 font-bold text-xs">~</span>
                      ) : (
                        <X className="w-5 h-5 text-destructive mx-auto" />
                      )}
                    </TableCell>

                    {/* Authority */}
                    <TableCell className="border-l-2 border-primary/20 bg-primary/[0.02]">
                      <div className="flex items-start gap-1.5">
                        <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-xs font-semibold text-foreground leading-tight">
                          {portal.headTitle}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="bg-primary/[0.02]">
                      <a
                        href={`tel:${portal.headOfficePhone.replace(/[^0-9+]/g, "")}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline whitespace-nowrap"
                        data-testid={`head-phone-${portal.id}`}
                      >
                        <Phone className="w-3 h-3 shrink-0" />
                        {portal.headOfficePhone}
                      </a>
                    </TableCell>

                    <TableCell className="bg-primary/[0.02]">
                      {portal.whatsapp === "N/A" ? (
                        <Badge variant="outline" className="text-[10px] text-muted-foreground">Not listed</Badge>
                      ) : (
                        <a
                          href={`https://wa.me/91${portal.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-success hover:underline whitespace-nowrap"
                          data-testid={`whatsapp-${portal.id}`}
                        >
                          <MessageCircle className="w-3 h-3 shrink-0" />
                          {portal.whatsapp}
                        </a>
                      )}
                    </TableCell>

                    {/* Helpdesk */}
                    <TableCell className="border-l-2 border-border">
                      <a
                        href={`tel:${portal.phone.replace(/[^0-9+]/g, "")}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline whitespace-nowrap"
                        data-testid={`phone-${portal.id}`}
                      >
                        <Phone className="w-3 h-3 shrink-0" />
                        {portal.phone}
                      </a>
                    </TableCell>

                    <TableCell>
                      <a
                        href={`mailto:${portal.email}`}
                        className="inline-flex items-center gap-1 text-xs text-primary hover:underline whitespace-nowrap"
                        data-testid={`email-${portal.id}`}
                      >
                        <Mail className="w-3 h-3 shrink-0" />
                        {portal.email}
                      </a>
                    </TableCell>

                    <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                      {portal.helpdesk}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        <p className="text-xs text-muted-foreground text-center mt-4">
          <span className="font-medium">Tip:</span> Click any coloured Stage or Cost badge to instantly filter portal cards.
          Top Authority numbers are official direct office lines. Toll-free 1800-xxx numbers are free from any Indian landline or mobile.
        </p>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { portals } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Check, X, Phone, Mail, MessageCircle, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
            Quick reference for every portal — including the top authority's office contact and official WhatsApp helpline.
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
                  <TableHead className="w-[160px] font-semibold text-primary sticky left-0 bg-primary/5 shadow-[1px_0_0_0_hsl(var(--border))] z-10">
                    Portal
                  </TableHead>
                  <TableHead className="font-semibold">Purpose</TableHead>
                  <TableHead className="font-semibold">Best For</TableHead>
                  <TableHead className="font-semibold">Stage</TableHead>
                  <TableHead className="font-semibold">Cost</TableHead>
                  <TableHead className="font-semibold text-center">Mobile</TableHead>

                  {/* Authority Officer columns */}
                  <TableHead className="font-semibold min-w-[200px] border-l-2 border-primary/20 bg-primary/[0.03]">
                    <span className="flex items-center gap-1.5 text-primary">
                      <User className="w-3.5 h-3.5" /> Top Authority
                    </span>
                  </TableHead>
                  <TableHead className="font-semibold min-w-[160px] bg-primary/[0.03]">
                    <span className="flex items-center gap-1.5 text-primary">
                      <Phone className="w-3.5 h-3.5" /> Office Direct
                    </span>
                  </TableHead>
                  <TableHead className="font-semibold min-w-[160px] bg-primary/[0.03]">
                    <span className="flex items-center gap-1.5 text-green-600">
                      <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                    </span>
                  </TableHead>

                  {/* Helpdesk columns */}
                  <TableHead className="font-semibold min-w-[170px] border-l-2 border-muted">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5" /> Helpline
                    </span>
                  </TableHead>
                  <TableHead className="font-semibold min-w-[210px]">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5" /> Email
                    </span>
                  </TableHead>
                  <TableHead className="font-semibold">Hours</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {portals.map((portal, idx) => (
                  <TableRow
                    key={portal.id}
                    className={idx % 2 === 0 ? "bg-background" : "bg-muted/30"}
                    data-testid={`row-portal-${portal.id}`}
                  >
                    {/* Portal name — sticky */}
                    <TableCell className="font-semibold sticky left-0 z-10 bg-inherit shadow-[1px_0_0_0_hsl(var(--border))] text-sm">
                      {portal.name}
                    </TableCell>

                    <TableCell className="text-sm">{portal.category}</TableCell>
                    <TableCell className="text-sm">{portal.bestFor}</TableCell>

                    <TableCell>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-secondary/10 text-secondary-foreground">
                        {portal.exportStage}
                      </span>
                    </TableCell>

                    <TableCell className="text-sm">{portal.cost}</TableCell>

                    <TableCell className="text-center">
                      {portal.mobileFriendly === "Yes" ? (
                        <Check className="w-4 h-4 text-emerald-500 mx-auto" />
                      ) : portal.mobileFriendly === "Limited" ? (
                        <span className="text-amber-500 text-xs font-bold">LTD</span>
                      ) : portal.mobileFriendly === "Depends" ? (
                        <span className="text-amber-400 text-xs font-bold">~</span>
                      ) : (
                        <X className="w-4 h-4 text-destructive mx-auto" />
                      )}
                    </TableCell>

                    {/* Authority officer — highlighted */}
                    <TableCell className="border-l-2 border-primary/20 bg-primary/[0.03]">
                      <div className="flex items-start gap-1.5">
                        <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                          <User className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-xs font-semibold text-foreground leading-tight">
                          {portal.headTitle}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="bg-primary/[0.03]">
                      <a
                        href={`tel:${portal.headOfficePhone.replace(/[^0-9+]/g, "")}`}
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline whitespace-nowrap"
                        data-testid={`head-phone-${portal.id}`}
                      >
                        <Phone className="w-3 h-3 shrink-0" />
                        {portal.headOfficePhone}
                      </a>
                    </TableCell>

                    <TableCell className="bg-primary/[0.03]">
                      {portal.whatsapp === "N/A" ? (
                        <Badge variant="outline" className="text-[10px] text-muted-foreground">
                          Not listed
                        </Badge>
                      ) : (
                        <a
                          href={`https://wa.me/91${portal.whatsapp.replace(/[^0-9]/g, "")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-green-600 hover:underline whitespace-nowrap"
                          data-testid={`whatsapp-${portal.id}`}
                        >
                          <MessageCircle className="w-3 h-3 shrink-0" />
                          {portal.whatsapp}
                        </a>
                      )}
                    </TableCell>

                    {/* Helpdesk */}
                    <TableCell className="border-l-2 border-muted">
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
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:underline whitespace-nowrap"
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
          <strong>Top Authority</strong> office numbers are official direct lines of each organisation's head.
          WhatsApp numbers are official government / organisation helplines — not personal numbers.
          Toll-free numbers (1800-xxx) are free from any Indian landline or mobile.
        </p>
      </div>
    </section>
  );
}

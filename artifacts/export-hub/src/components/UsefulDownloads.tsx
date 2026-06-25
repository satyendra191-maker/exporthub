import { motion } from "framer-motion";
import { FileDown, FileText, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const downloads = [
  { name: "Commercial Invoice Template", format: "Excel", icon: FileSpreadsheet, desc: "Standard template for international billing." },
  { name: "Packing List Template", format: "Excel", icon: FileSpreadsheet, desc: "Detailed breakdown of shipment contents." },
  { name: "Proforma Invoice Template", format: "Word", icon: FileText, desc: "Preliminary bill of sale for buyers." },
  { name: "Certificate of Origin Checklist", format: "PDF", icon: FileDown, desc: "Requirements for COO issuance." },
  { name: "Shipping Bill Checklist", format: "PDF", icon: FileDown, desc: "Mandatory fields for customs filing." },
  { name: "Export Readiness Checklist", format: "PDF", icon: FileDown, desc: "Printable version of the readiness tracker." },
];

export function UsefulDownloads() {
  const { toast } = useToast();

  const handleDownload = (name: string) => {
    toast({
      title: "Coming soon",
      description: `${name} will be available for download shortly.`,
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Useful Templates & Downloads</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Standardized documents to help you prepare your export shipments without starting from scratch.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {downloads.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="hover:shadow-md transition-all group border-muted hover:border-primary/30">
                  <CardContent className="p-5 flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-semibold text-sm truncate" title={item.name}>{item.name}</h4>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">{item.format}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3 line-clamp-2">{item.desc}</p>
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        className="w-full text-xs h-8"
                        onClick={() => handleDownload(item.name)}
                        data-testid={`btn-download-${i}`}
                      >
                        <FileDown className="w-3 h-3 mr-2" /> Download
                      </Button>
                    </div>
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

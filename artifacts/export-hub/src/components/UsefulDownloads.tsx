import { motion } from "framer-motion";
import { FileDown, FileText, FileSpreadsheet, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  downloadHtml,
  generateCommercialInvoice,
  generatePackingList,
  generateProformaInvoice,
  generateCOOChecklist,
  generateShippingBillChecklist,
  generateExportReadinessChecklist,
} from "@/lib/documents";

type DownloadItem = {
  name: string;
  filename: string;
  format: string;
  icon: typeof FileDown;
  desc: string;
  generate: () => string;
};

const downloads: DownloadItem[] = [
  {
    name: "Commercial Invoice",
    filename: "commercial-invoice-template.html",
    format: "HTML",
    icon: FileSpreadsheet,
    desc: "Standard international billing template with all mandatory fields — exporter, consignee, HS codes, payment terms, and totals.",
    generate: generateCommercialInvoice,
  },
  {
    name: "Packing List",
    filename: "packing-list-template.html",
    format: "HTML",
    icon: FileSpreadsheet,
    desc: "Detailed shipment packing list with package-wise weight, dimensions, volume, and marks & numbers.",
    generate: generatePackingList,
  },
  {
    name: "Proforma Invoice",
    filename: "proforma-invoice-template.html",
    format: "HTML",
    icon: FileText,
    desc: "Pre-shipment quote template with buyer/seller details, itemized pricing, bank details, and payment terms.",
    generate: generateProformaInvoice,
  },
  {
    name: "Certificate of Origin Checklist",
    filename: "certificate-of-origin-checklist.html",
    format: "HTML",
    icon: ClipboardList,
    desc: "Complete COO issuance checklist covering Non-Preferential, GSP, SAFTA, ASEAN, India-UAE CEPA, and APEDA COO types.",
    generate: generateCOOChecklist,
  },
  {
    name: "Shipping Bill Checklist",
    filename: "shipping-bill-checklist.html",
    format: "HTML",
    icon: FileDown,
    desc: "Comprehensive ICEGATE filing checklist — all mandatory fields, document list, types of shipping bill, and post-filing actions.",
    generate: generateShippingBillChecklist,
  },
  {
    name: "Export Readiness Checklist",
    filename: "export-readiness-checklist.html",
    format: "HTML",
    icon: ClipboardList,
    desc: "30-item printable self-assessment covering registration, product research, certification, logistics, and documentation phases.",
    generate: generateExportReadinessChecklist,
  },
];

export function UsefulDownloads() {
  const { toast } = useToast();

  const handleDownload = (item: DownloadItem) => {
    try {
      const html = item.generate();
      downloadHtml(item.filename, html);
      toast({
        title: "Download started",
        description: `${item.name} is downloading. Open it in your browser and use File → Print → Save as PDF.`,
      });
    } catch {
      toast({
        title: "Download failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
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
          <h2 className="text-3xl font-bold tracking-tight mb-4">Useful Templates &amp; Downloads</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professionally formatted export documents ready to fill in. Download as HTML, then print or save as PDF from your browser.
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
                <Card className="hover:shadow-md transition-all group border-muted hover:border-primary/30 h-full flex flex-col">
                  <CardContent className="p-5 flex flex-col h-full">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-primary/10 text-primary rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="font-semibold text-sm" title={item.name}>{item.name}</h4>
                          <Badge variant="outline" className="text-[10px] px-1.5 py-0 shrink-0">{item.format}</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-3">{item.desc}</p>
                      </div>
                    </div>
                    <div className="mt-auto">
                      <Button
                        variant="secondary"
                        size="sm"
                        className="w-full text-xs h-8"
                        onClick={() => handleDownload(item)}
                        data-testid={`btn-download-${i}`}
                      >
                        <FileDown className="w-3 h-3 mr-2" /> Download Template
                      </Button>
                      <p className="text-[10px] text-muted-foreground text-center mt-2">
                        Opens in browser · Print → Save as PDF
                      </p>
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

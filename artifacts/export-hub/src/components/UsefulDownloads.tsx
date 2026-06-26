import { motion } from "framer-motion";
import { FileDown, FileText, FileSpreadsheet, ClipboardList, Ship, Plane, Shield, CreditCard, FileCheck, Apple, Globe2, ReceiptText } from "lucide-react";
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
  generateBillOfLading,
  generateAirWaybill,
  generateInsuranceCertificate,
  generateLCChecklist,
  generateLUTApplication,
  generateHealthCertificate,
  generateFDAPriorNotice,
  generateRoDTEPClaim,
} from "@/lib/documents";

type DownloadItem = {
  name: string;
  filename: string;
  tag: string;
  tagColor: string;
  icon: typeof FileDown;
  desc: string;
  countries: string;
  generate: () => string;
};

const groups: { title: string; subtitle: string; items: DownloadItem[] }[] = [
  {
    title: "Core Export Documents",
    subtitle: "Required for every international shipment regardless of destination",
    items: [
      {
        name: "Commercial Invoice",
        filename: "commercial-invoice.html",
        tag: "All Countries",
        tagColor: "bg-blue-100 text-blue-800",
        icon: FileSpreadsheet,
        desc: "Primary billing document with exporter, consignee, HS codes, unit price, payment terms, and totals. Mandatory for customs clearance everywhere.",
        countries: "Universal",
        generate: generateCommercialInvoice,
      },
      {
        name: "Packing List",
        filename: "packing-list.html",
        tag: "All Countries",
        tagColor: "bg-blue-100 text-blue-800",
        icon: FileSpreadsheet,
        desc: "Package-wise weight, dimensions, volume, marks & numbers. Required by customs in every country alongside the commercial invoice.",
        countries: "Universal",
        generate: generatePackingList,
      },
      {
        name: "Proforma Invoice",
        filename: "proforma-invoice.html",
        tag: "Pre-Shipment",
        tagColor: "bg-indigo-100 text-indigo-800",
        icon: FileText,
        desc: "Pre-shipment quotation with pricing, delivery terms, bank details, and payment conditions. Needed by buyer to arrange LC or advance payment.",
        countries: "Universal",
        generate: generateProformaInvoice,
      },
    ],
  },
  {
    title: "Freight & Transport Documents",
    subtitle: "Issued per mode of transport — sea or air",
    items: [
      {
        name: "Bill of Lading (Sea)",
        filename: "bill-of-lading.html",
        tag: "Sea Freight",
        tagColor: "bg-cyan-100 text-cyan-800",
        icon: Ship,
        desc: "Title document for sea shipments. Covers vessel, container, cargo description, freight terms, and consignee. Required by every sea-freight importer worldwide.",
        countries: "All sea-freight destinations",
        generate: generateBillOfLading,
      },
      {
        name: "Air Waybill (AWB)",
        filename: "air-waybill.html",
        tag: "Air Freight",
        tagColor: "bg-sky-100 text-sky-800",
        icon: Plane,
        desc: "Non-negotiable transport contract for air cargo. Covers airline, flight, goods description, chargeable weight, IATA codes, and handling instructions.",
        countries: "All air-freight destinations",
        generate: generateAirWaybill,
      },
      {
        name: "Marine Insurance Certificate",
        filename: "insurance-certificate.html",
        tag: "CIF / LC Required",
        tagColor: "bg-teal-100 text-teal-800",
        icon: Shield,
        desc: "Cargo insurance covering All Risks (ICC-A). Mandatory under CIF/CIP terms and when Letter of Credit specifies insurance. Insured value = 110% of invoice.",
        countries: "Universal (mandatory for CIF/LC)",
        generate: generateInsuranceCertificate,
      },
    ],
  },
  {
    title: "Compliance & Certification",
    subtitle: "Country-specific and product-specific certificates",
    items: [
      {
        name: "Certificate of Origin Checklist",
        filename: "certificate-of-origin-checklist.html",
        tag: "FTA Countries",
        tagColor: "bg-emerald-100 text-emerald-800",
        icon: FileCheck,
        desc: "Comprehensive COO issuance checklist — Non-Preferential, GSP (Form A), SAFTA, ASEAN, India-UAE CEPA, India-Australia ECTA, and APEDA COO types.",
        countries: "EU, USA, ASEAN, UAE, Australia & more",
        generate: generateCOOChecklist,
      },
      {
        name: "Health & Sanitary Certificate",
        filename: "health-sanitary-certificate.html",
        tag: "Food / Agri",
        tagColor: "bg-green-100 text-green-800",
        icon: Apple,
        desc: "Official health / phytosanitary certificate for food and agricultural exports. Includes lab test results, FSSAI & APEDA details, and product safety declaration.",
        countries: "All food-importing countries",
        generate: generateHealthCertificate,
      },
      {
        name: "US FDA Prior Notice Checklist",
        filename: "fda-prior-notice-checklist.html",
        tag: "USA",
        tagColor: "bg-red-100 text-red-800",
        icon: Globe2,
        desc: "Step-by-step checklist for mandatory US FDA Prior Notice filing (required 4–8 hrs before arrival). Covers facility registration, FSMA, labelling, and CBP entry.",
        countries: "United States only",
        generate: generateFDAPriorNotice,
      },
    ],
  },
  {
    title: "Financial & Incentive Documents",
    subtitle: "For payment security, GST compliance, and claiming export benefits",
    items: [
      {
        name: "LC Compliance Checklist",
        filename: "lc-compliance-checklist.html",
        tag: "LC Payments",
        tagColor: "bg-yellow-100 text-yellow-800",
        icon: CreditCard,
        desc: "UCP 600 / ISBP 821 compliant LC checklist. Covers terms verification, required documents per LC, common discrepancy prevention, and bank presentation steps.",
        countries: "Any country using LC payment",
        generate: generateLCChecklist,
      },
      {
        name: "GST LUT Application",
        filename: "gst-lut-application.html",
        tag: "India GST",
        tagColor: "bg-orange-100 text-orange-800",
        icon: FileText,
        desc: "Form GST RFD-11 — Letter of Undertaking for zero-rated exports without IGST payment. Pre-filled with company details, undertaking clauses, witness table, and document checklist.",
        countries: "India (mandatory for all exporters)",
        generate: generateLUTApplication,
      },
      {
        name: "RoDTEP / Drawback Claim",
        filename: "rodtep-drawback-claim.html",
        tag: "Export Incentive",
        tagColor: "bg-purple-100 text-purple-800",
        icon: ReceiptText,
        desc: "Combined RoDTEP and Duty Drawback claim form. Covers HS code-wise entitlement, shipping bill reference, e-scrip credit, Brand Rate drawback, and document checklist.",
        countries: "Applies to all export destinations",
        generate: generateRoDTEPClaim,
      },
      {
        name: "Shipping Bill Checklist",
        filename: "shipping-bill-checklist.html",
        tag: "ICEGATE",
        tagColor: "bg-amber-100 text-amber-800",
        icon: FileDown,
        desc: "Comprehensive ICEGATE filing checklist — all mandatory fields, document list, types of shipping bill (Free/Drawback/DEPB), and post-LEO actions.",
        countries: "India (for all exports)",
        generate: generateShippingBillChecklist,
      },
      {
        name: "Export Readiness Checklist",
        filename: "export-readiness-checklist.html",
        tag: "Self-Assessment",
        tagColor: "bg-gray-100 text-gray-800",
        icon: ClipboardList,
        desc: "30-item self-assessment across 5 phases: Registration, Market Research, Certification, Logistics, and Documentation. Pre-filled with your company info.",
        countries: "All destinations",
        generate: generateExportReadinessChecklist,
      },
    ],
  },
];

export function UsefulDownloads() {
  const { toast } = useToast();

  const handleDownload = (item: DownloadItem) => {
    try {
      const html = item.generate();
      downloadHtml(item.filename, html);
      toast({
        title: `Downloading: ${item.name}`,
        description: "Open the file in your browser → File → Print → Save as PDF for a clean printout.",
      });
    } catch {
      toast({
        title: "Download failed",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

  let cardIndex = 0;

  return (
    <section className="py-16 bg-muted/20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Export Document Templates</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            14 professionally formatted documents, pre-filled with your company details — ready to complete and submit.
            Download as HTML and print / Save as PDF from your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs">
            {["Sea Freight","Air Freight","USA","EU / FTA","Food & Agri","LC Payments","GST","Incentives"].map(t => (
              <span key={t} className="px-2.5 py-1 rounded-full bg-primary/10 text-primary font-medium">{t}</span>
            ))}
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-12">
          {groups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
            >
              <div className="mb-5">
                <h3 className="text-xl font-bold text-foreground">{group.title}</h3>
                <p className="text-sm text-muted-foreground mt-1">{group.subtitle}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const idx = cardIndex++;
                  return (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <Card className="hover:shadow-md transition-all group border hover:border-primary/40 h-full flex flex-col bg-card">
                        <CardContent className="p-5 flex flex-col h-full">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2.5 bg-primary/10 text-primary rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-1 mb-1">
                                <h4 className="font-semibold text-sm leading-tight" title={item.name}>{item.name}</h4>
                              </div>
                              <span className={`inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full ${item.tagColor}`}>
                                {item.tag}
                              </span>
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-3 mb-3 flex-grow">{item.desc}</p>

                          <div className="text-[10px] text-muted-foreground mb-3 flex items-center gap-1">
                            <Globe2 className="w-3 h-3 shrink-0" />
                            {item.countries}
                          </div>

                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full text-xs h-8 mt-auto"
                            onClick={() => handleDownload(item)}
                            data-testid={`btn-download-${idx}`}
                          >
                            <FileDown className="w-3 h-3 mr-2" /> Download Template
                          </Button>
                          <p className="text-[10px] text-muted-foreground text-center mt-1.5">
                            HTML · Open in browser · Print → Save as PDF
                          </p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground text-center mt-10 max-w-2xl mx-auto">
          All templates are pre-filled with <strong>Savita Global Interprises</strong> details.
          Fields shown in <span style={{color:"#1e3a5f",fontWeight:600}}>blue</span> are pre-filled; fill remaining blank fields before use.
          For official government filings, always verify the latest format on the respective portal.
        </p>
      </div>
    </section>
  );
}

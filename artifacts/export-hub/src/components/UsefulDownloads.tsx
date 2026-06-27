import { motion } from "framer-motion";
import {
  FileDown, FileText, FileSpreadsheet, ClipboardList,
  Ship, Plane, Shield, CreditCard, FileCheck, Apple,
  Globe2, ReceiptText, Flame, Search, AlertTriangle,
  Star, Award, Users, DollarSign, FlaskConical
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
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
  generateFumigationCertificate,
  generatePSICertificate,
  generateHalalCertificate,
  generateEUR1Certificate,
  generateSAFTACertificate,
  generateArabLeagueCOO,
  generateBillOfExchange,
  generateBRCDeclaration,
  generateSafetyDataSheet,
} from "@/lib/documents";

function generateDangerousGoodsDeclaration() {
  return "";
}

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
        countries: "Universal — all 200+ countries",
        generate: generateCommercialInvoice,
      },
      {
        name: "Packing List",
        filename: "packing-list.html",
        tag: "All Countries",
        tagColor: "bg-blue-100 text-blue-800",
        icon: FileSpreadsheet,
        desc: "Package-wise weight, dimensions, volume, marks & numbers. Required by customs in every country alongside the commercial invoice.",
        countries: "Universal — all 200+ countries",
        generate: generatePackingList,
      },
      {
        name: "Proforma Invoice",
        filename: "proforma-invoice.html",
        tag: "Pre-Shipment",
        tagColor: "bg-indigo-100 text-indigo-800",
        icon: FileText,
        desc: "Pre-shipment quotation with itemised pricing, delivery terms, bank details, and payment conditions. Needed by buyer to arrange LC or advance payment.",
        countries: "Universal — all 200+ countries",
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
      {
        name: "Fumigation Certificate (ISPM-15)",
        filename: "fumigation-certificate.html",
        tag: "Wooden Packaging",
        tagColor: "bg-amber-100 text-amber-800",
        icon: Flame,
        desc: "ISPM-15 compliant treatment certificate for all wooden packaging material (pallets, crates, dunnage). Required by 180+ countries — mandatory for USA, EU, Australia, China, Japan, and more.",
        countries: "180+ countries (USA, EU, AU, CN, JP…)",
        generate: generateFumigationCertificate,
      },
      {
        name: "Dangerous Goods Declaration",
        filename: "dangerous-goods-declaration.html",
        tag: "Hazmat / DG",
        tagColor: "bg-red-100 text-red-800",
        icon: AlertTriangle,
        desc: "IATA DGR / IMDG Code compliant shipper's declaration for hazardous goods, chemicals, batteries, flammables, gases, and corrosives. Mandatory for all DG shipments worldwide.",
        countries: "Universal — all DG shipments",
        generate: generateDangerousGoodsDeclaration,
      },
    ],
  },
  {
    title: "Product Certificates & Country-Specific Compliance",
    subtitle: "Required by importing countries for specific product types",
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
        desc: "Official health / phytosanitary certificate for food and agricultural exports. Includes lab test results (microbial, pesticide, heavy metals), FSSAI & APEDA details.",
        countries: "All food-importing countries (160+)",
        generate: generateHealthCertificate,
      },
      {
        name: "Pre-Shipment Inspection Certificate",
        filename: "psi-certificate.html",
        tag: "PSI Countries",
        tagColor: "bg-orange-100 text-orange-800",
        icon: Search,
        desc: "Third-party inspection report (SGS / Bureau Veritas / Intertek) covering quality, quantity, packaging, and country-specific requirements. Required by Indonesia, GCC, several African nations, Iran, Bangladesh, Tanzania, Ethiopia.",
        countries: "Indonesia, GCC, Africa, Iran, BD…",
        generate: generatePSICertificate,
      },
      {
        name: "Halal Certificate Application",
        filename: "halal-certificate-application.html",
        tag: "OIC Countries",
        tagColor: "bg-lime-100 text-lime-800",
        icon: Star,
        desc: "Halal certification application covering ingredients, supply chain, facility compliance, and certifying body requirements. Mandatory for food, cosmetics, and pharma to 57 OIC member countries.",
        countries: "Saudi Arabia, UAE, Malaysia, Indonesia & 53 more",
        generate: generateHalalCertificate,
      },
      {
        name: "US FDA Prior Notice Checklist",
        filename: "fda-prior-notice-checklist.html",
        tag: "USA",
        tagColor: "bg-red-100 text-red-800",
        icon: Globe2,
        desc: "Step-by-step checklist for mandatory US FDA Prior Notice filing (required 4–8 hrs before arrival). Covers FDA facility registration, FSMA, labelling (Big 9 allergens), and CBP entry.",
        countries: "United States only",
        generate: generateFDAPriorNotice,
      },
      {
        name: "Safety Data Sheet (SDS / MSDS)",
        filename: "safety-data-sheet.html",
        tag: "Chemicals / DG",
        tagColor: "bg-purple-100 text-purple-800",
        icon: FlaskConical,
        desc: "All 16 mandatory GHS Rev.9 sections — identification, hazard classification, composition, first aid, firefighting, handling, PPE, toxicology, ecology, transport, and regulatory info.",
        countries: "EU, USA, UK, Australia, China, Japan…",
        generate: generateSafetyDataSheet,
      },
    ],
  },
  {
    title: "Preferential Origin Certificates (FTA / Trade Agreements)",
    subtitle: "Claim reduced or zero import duties in partner countries",
    items: [
      {
        name: "EUR.1 Movement Certificate",
        filename: "eur1-certificate.html",
        tag: "EU / FTA",
        tagColor: "bg-blue-100 text-blue-800",
        icon: Award,
        desc: "Official EU-format preferential origin certificate for claiming GSP+ / EPA / bilateral FTA reduced duties. Covers all 27 EU members, UK (DCTS), EFTA countries, and other FTA partners with India.",
        countries: "EU-27, UK, Norway, Switzerland & FTA partners",
        generate: generateEUR1Certificate,
      },
      {
        name: "SAFTA Certificate of Origin",
        filename: "safta-coo.html",
        tag: "SAARC",
        tagColor: "bg-teal-100 text-teal-800",
        icon: Users,
        desc: "South Asian Free Trade Area (SAFTA) preferential COO for reduced duties in SAARC nations. Covers WO, PE, and PSR origin criteria with value-addition requirements.",
        countries: "Bangladesh, Sri Lanka, Nepal, Pakistan, Bhutan, Maldives, Afghanistan",
        generate: generateSAFTACertificate,
      },
      {
        name: "Arab League COO (AACO Form)",
        filename: "arab-league-coo.html",
        tag: "Arab League",
        tagColor: "bg-yellow-100 text-yellow-800",
        icon: Globe2,
        desc: "Arab League / AACO format Certificate of Origin for 22 Arab League nations. Includes special attestation notes for Saudi Arabia, UAE, Egypt, and country-specific requirements.",
        countries: "Saudi Arabia, UAE, Qatar, Kuwait, Oman, Egypt & 16 more",
        generate: generateArabLeagueCOO,
      },
    ],
  },
  {
    title: "Financial, Incentive & India Compliance Documents",
    subtitle: "For payment security, GST, forex, and claiming all export benefits",
    items: [
      {
        name: "LC Compliance Checklist",
        filename: "lc-compliance-checklist.html",
        tag: "LC Payments",
        tagColor: "bg-yellow-100 text-yellow-800",
        icon: CreditCard,
        desc: "UCP 600 / ISBP 821 compliant LC checklist. Covers terms verification, 10-document checklist per LC, discrepancy prevention guide, and bank presentation steps.",
        countries: "Any country using LC payment",
        generate: generateLCChecklist,
      },
      {
        name: "Bill of Exchange / Trade Draft",
        filename: "bill-of-exchange.html",
        tag: "LC / DA / DP",
        tagColor: "bg-indigo-100 text-indigo-800",
        icon: DollarSign,
        desc: "Negotiable instrument for sight/usance LC, D/P, and D/A payment terms. Pre-filled with your company as drawer; covers drawee, accompanying document checklist, and acceptance block.",
        countries: "All LC, DA, DP payment destinations",
        generate: generateBillOfExchange,
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
        desc: "Combined RoDTEP and Duty Drawback claim form. Covers HS code-wise entitlement, shipping bill reference, e-scrip credit, Brand Rate drawback, and full document checklist.",
        countries: "Applies to all export destinations",
        generate: generateRoDTEPClaim,
      },
      {
        name: "BRC / FIRC Declaration",
        filename: "brc-firc-declaration.html",
        tag: "Forex Compliance",
        tagColor: "bg-cyan-100 text-cyan-800",
        icon: FileCheck,
        desc: "Bank Realisation Certificate and Foreign Inward Remittance Certificate declaration. Mandatory under FEMA 1999 for all export forex — required for DGFT, RoDTEP, Drawback, and export obligation discharge.",
        countries: "India (mandatory for all exporters)",
        generate: generateBRCDeclaration,
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

  const totalDocs = groups.reduce((sum, g) => sum + g.items.length, 0);

  const handleDownload = (item: DownloadItem) => {
    try {
      const html = item.generate();
      downloadHtml(item.filename, html);
      toast({
        title: `Downloading: ${item.name}`,
        description: "Open the file in your browser → File → Print → Save as PDF for a clean printout."
      });
    } catch {
      toast({
        title: "Download failed",
        description: "Please try again.",
        variant: "destructive"
      });
    }
  };

  let cardIndex = 0;

  return (
    <section className="py-20 bg-muted/20" id="downloads">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold tracking-tight mb-4">Export Document Templates</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            <strong>{totalDocs} professionally formatted documents</strong>, pre-filled with your company details — covering every major trade corridor, product type, and destination country. Download as HTML and print / Save as PDF from your browser.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4 text-xs">
            {["Universal","Sea / Air Freight","USA","EU / FTA","Arab League / GCC","SAARC","Food & Agri","Halal (OIC)","Hazmat / DG","GST / FEMA","Incentives"].map(t => (
              <Badge key={t} variant="outline" className="text-[10px] font-medium">
                {t}
              </Badge>
            ))}
          </div>
        </motion.div>

        <div className="max-w-6xl mx-auto space-y-14">
          {groups.map((group, gi) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.08 }}
            >
              <div className="mb-5 pb-3 border-b">
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
                      transition={{ delay: idx * 0.04 }}
                      whileHover={{ y: -4 }}
                    >
                      <Card className="h-full flex flex-col bg-card rounded-2xl shadow-card hover:shadow-card-hover transition-all duration-300 group border">
                        <CardContent className="p-5 flex flex-col h-full">
                          <div className="flex items-start gap-3 mb-3">
                            <div className="p-2.5 bg-primary/8 text-primary rounded-lg shrink-0 group-hover:scale-110 transition-transform">
                              <Icon className="w-5 h-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm leading-tight mb-1.5" title={item.name}>{item.name}</h4>
                              <Badge variant="outline" className="text-[10px] font-medium">
                                {item.tag}
                              </Badge>
                            </div>
                          </div>

                          <p className="text-xs text-muted-foreground line-clamp-3 mb-3 flex-grow">{item.desc}</p>

                          <div className="text-[10px] text-muted-foreground mb-3 flex items-start gap-1">
                            <Globe2 className="w-3 h-3 shrink-0 mt-0.5" />
                            <span>{item.countries}</span>
                          </div>

                          <Button
                            variant="secondary"
                            size="sm"
                            className="w-full text-xs h-9 mt-auto rounded-xl focus-ring"
                            onClick={() => handleDownload(item)}
                            data-testid={`btn-download-${idx}`}
                          >
                            <FileDown className="w-4 h-4 mr-2" /> Download Template
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

        <p className="text-xs text-muted-foreground text-center mt-12 max-w-2xl mx-auto">
          All templates are pre-filled with <strong>Savita Global Interprises</strong> details.
          Fields shown in <span className="text-primary font-semibold">blue</span> are pre-filled; complete remaining blank fields before official submission.
          Always verify the latest format on the respective government / certifying body portal before use.
        </p>
      </div>
    </section>
  );
}

import { LucideIcon, BarChart3, FileText, MapPin, Globe, TrendingUp, Building2, Award, Leaf, Shield } from "lucide-react";

export type Portal = {
  id: string;
  name: string;
  url: string;
  icon: LucideIcon;
  color: string;
  category: string;
  description: string;
  bestFor: string;
  whyImportant: string;
  whoShouldUse: string;
  keyFeatures: string[];
  benefits: string;
  registration: string;
  authority: string;
  exportStage: string;
  cost: string;
  mobileFriendly: string;
  phone: string;
  email: string;
  helpdesk: string;
};

export const categories = [
  "All",
  "Market Research",
  "Compliance",
  "Analytics",
  "Food & Agri",
  "Customs",
  "Investment"
];

export const portals: Portal[] = [
  {
    id: "1",
    name: "NIRYAT Portal",
    url: "https://niryat.gov.in",
    icon: BarChart3,
    color: "blue",
    category: "Analytics",
    description: "India's official export analytics platform.",
    bestFor: "Market Research",
    whyImportant: "Provides comprehensive data on India's export performance.",
    whoShouldUse: "Researchers, Policymakers, Exporters looking for trends.",
    keyFeatures: ["Export trends", "Country analysis", "State & district exports", "Commodity breakdown", "Growth analysis"],
    benefits: "Data-driven insights to identify high-growth markets.",
    registration: "Not required for basic data",
    authority: "Ministry of Commerce",
    exportStage: "Pre-Export",
    cost: "Free",
    mobileFriendly: "Yes",
    phone: "1800-111-550",
    email: "helpdesk@dgci.gov.in",
    helpdesk: "Mon–Fri, 9:30 AM – 6:00 PM"
  },
  {
    id: "2",
    name: "DGFT",
    url: "https://dgft.gov.in",
    icon: FileText,
    color: "indigo",
    category: "Compliance",
    description: "Official Foreign Trade Portal.",
    bestFor: "Export Compliance",
    whyImportant: "Mandatory for all exporters for IEC and licenses.",
    whoShouldUse: "All exporters, Importers, Manufacturers.",
    keyFeatures: ["IEC Registration", "Export Licenses", "FTP schemes", "RoDTEP claims", "EPCG", "Advance Authorization"],
    benefits: "Single window for all foreign trade schemes and licenses.",
    registration: "Mandatory (IEC)",
    authority: "DGFT",
    exportStage: "Registration",
    cost: "Paid (IEC ₹500)",
    mobileFriendly: "Yes",
    phone: "1800-111-550",
    email: "helpdesk@dgft.gov.in",
    helpdesk: "Mon–Fri, 9:00 AM – 5:30 PM"
  },
  {
    id: "3",
    name: "ODOP",
    url: "https://odop.gov.in",
    icon: MapPin,
    color: "orange",
    category: "Market Research",
    description: "One District One Product initiative.",
    bestFor: "Manufacturers",
    whyImportant: "Promotes local manufacturing and exports at the district level.",
    whoShouldUse: "Local artisans, MSMEs, District administrations.",
    keyFeatures: ["District-wise products", "Cluster development", "Local manufacturing support", "Govt scheme access"],
    benefits: "Boosts local economy and provides global market access.",
    registration: "Optional",
    authority: "DPIIT",
    exportStage: "Product Selection",
    cost: "Free",
    mobileFriendly: "Yes",
    phone: "011-23062261",
    email: "odop-dpiit@gov.in",
    helpdesk: "Mon–Fri, 9:30 AM – 6:00 PM"
  },
  {
    id: "4",
    name: "Indian Trade Portal",
    url: "https://indiantradeportal.in",
    icon: Globe,
    color: "teal",
    category: "Market Research",
    description: "International market intelligence hub.",
    bestFor: "International Research",
    whyImportant: "Crucial for understanding international trade regulations and tariffs.",
    whoShouldUse: "Exporters exploring new markets.",
    keyFeatures: ["Tariff schedules", "HS Codes", "Country regulations", "SPS/TBT measures", "FTA details"],
    benefits: "Reduces compliance risks in destination countries.",
    registration: "Optional",
    authority: "FIEO",
    exportStage: "Market Selection",
    cost: "Free",
    mobileFriendly: "Yes",
    phone: "011-46013888",
    email: "support@indiantradeportal.in",
    helpdesk: "Mon–Fri, 9:00 AM – 6:00 PM"
  },
  {
    id: "5",
    name: "TradeStat",
    url: "https://tradestat.commerce.gov.in",
    icon: TrendingUp,
    color: "emerald",
    category: "Analytics",
    description: "Official trade statistics portal.",
    bestFor: "Trade Analytics",
    whyImportant: "Provides official import/export statistics of India.",
    whoShouldUse: "Analysts, Exporters, Economists.",
    keyFeatures: ["HS Code analysis", "Import/export data", "Country-wise trade", "Commodity trends"],
    benefits: "Accurate historical data for strategic planning.",
    registration: "Optional",
    authority: "Ministry of Commerce",
    exportStage: "Research",
    cost: "Free",
    mobileFriendly: "No",
    phone: "011-23063900",
    email: "tradestat@nic.in",
    helpdesk: "Mon–Fri, 9:30 AM – 5:30 PM"
  },
  {
    id: "6",
    name: "FIEO",
    url: "https://fieo.org",
    icon: Building2,
    color: "purple",
    category: "Compliance",
    description: "India's apex export promotion body.",
    bestFor: "New Exporters",
    whyImportant: "Apex body for export promotion representing Indian entrepreneurs.",
    whoShouldUse: "All exporters seeking RCMC and guidance.",
    keyFeatures: ["Buyer-Seller meets", "Training programs", "Export documentation help", "Trade delegations"],
    benefits: "Networking opportunities and capacity building.",
    registration: "Required for RCMC",
    authority: "FIEO",
    exportStage: "Execution",
    cost: "Paid (Membership)",
    mobileFriendly: "Yes",
    phone: "011-26153040",
    email: "fieo@fieo.org",
    helpdesk: "Mon–Sat, 9:30 AM – 6:00 PM"
  },
  {
    id: "7",
    name: "Export Promotion Councils",
    url: "https://eparakrama.commerce.gov.in",
    icon: Award,
    color: "pink",
    category: "Compliance",
    description: "Industry-specific export promotion.",
    bestFor: "Sector Exporters",
    whyImportant: "Provides sector-specific export assistance and incentives.",
    whoShouldUse: "Exporters of specific commodities (e.g., textiles, chemicals).",
    keyFeatures: ["Trade fairs", "Buyer databases", "Export incentives", "Industry reports"],
    benefits: "Targeted support for specific industries.",
    registration: "Required (RCMC)",
    authority: "Various EPCs",
    exportStage: "Execution",
    cost: "Paid (Membership)",
    mobileFriendly: "Depends",
    phone: "011-23063900",
    email: "epc@commerce.gov.in",
    helpdesk: "Mon–Fri, 9:30 AM – 5:30 PM"
  },
  {
    id: "8",
    name: "APEDA",
    url: "https://apeda.gov.in",
    icon: Leaf,
    color: "green",
    category: "Food & Agri",
    description: "Agricultural & Processed Food Export Authority.",
    bestFor: "Food Exporters",
    whyImportant: "Mandatory for export of scheduled agricultural products.",
    whoShouldUse: "Farmers, Agri-businesses, Food processors.",
    keyFeatures: ["RCMC registration", "Export standards", "Flour/Rice/Fruits certification", "Processed food norms"],
    benefits: "Ensures quality and global compliance for agri-exports.",
    registration: "Mandatory for scheduled items",
    authority: "Ministry of Commerce",
    exportStage: "Certification",
    cost: "Paid (Registration)",
    mobileFriendly: "Yes",
    phone: "1800-111-175",
    email: "helpdesk@apeda.gov.in",
    helpdesk: "Mon–Fri, 9:30 AM – 5:30 PM"
  },
  {
    id: "9",
    name: "ICEGATE",
    url: "https://icegate.gov.in",
    icon: Shield,
    color: "red",
    category: "Customs",
    description: "Indian Customs & Central Excise Gateway.",
    bestFor: "Export Operations",
    whyImportant: "National portal for customs clearance and electronic document filing.",
    whoShouldUse: "Exporters, Importers, Customs Brokers (CHAs).",
    keyFeatures: ["Shipping bill filing", "Customs clearance", "Bill of Entry", "GST integration", "Duty payment"],
    benefits: "Paperless and efficient customs clearance.",
    registration: "Mandatory",
    authority: "CBIC",
    exportStage: "Shipping",
    cost: "Free",
    mobileFriendly: "Limited",
    phone: "1800-3010-1000",
    email: "helpdesk@icegate.gov.in",
    helpdesk: "24 × 7 Helpdesk"
  },
  {
    id: "10",
    name: "Invest India",
    url: "https://investindia.gov.in",
    icon: TrendingUp,
    color: "amber",
    category: "Investment",
    description: "National investment promotion agency.",
    bestFor: "Manufacturers & Investors",
    whyImportant: "Facilitates investments and promotes India as a manufacturing hub.",
    whoShouldUse: "Foreign investors, Domestic manufacturers.",
    keyFeatures: ["Sector reports", "Manufacturing incentives", "Logistics support", "Investment opportunities"],
    benefits: "End-to-end handholding for setting up manufacturing bases.",
    registration: "Not required",
    authority: "DPIIT",
    exportStage: "Setup",
    cost: "Free",
    mobileFriendly: "Yes",
    phone: "011-23048155",
    email: "invest@investindia.org.in",
    helpdesk: "Mon–Fri, 9:00 AM – 6:00 PM"
  }
];

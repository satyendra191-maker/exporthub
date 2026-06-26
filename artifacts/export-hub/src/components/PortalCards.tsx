import { motion } from "framer-motion";
import { ExternalLink, BookmarkPlus, Share2, Copy, ShieldCheck, Globe, Phone, Mail, Clock, User, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { portals } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface PortalCardsProps {
  searchQuery: string;
  selectedCategory: string;
}

const colorMap: Record<string, string> = {
  blue:   "bg-blue-50 text-blue-600 border-blue-200 group-hover:border-blue-400 group-hover:shadow-blue-100",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-200 group-hover:border-indigo-400 group-hover:shadow-indigo-100",
  orange: "bg-orange-50 text-orange-600 border-orange-200 group-hover:border-orange-400 group-hover:shadow-orange-100",
  teal:   "bg-teal-50 text-teal-600 border-teal-200 group-hover:border-teal-400 group-hover:shadow-teal-100",
  emerald:"bg-emerald-50 text-emerald-600 border-emerald-200 group-hover:border-emerald-400 group-hover:shadow-emerald-100",
  purple: "bg-purple-50 text-purple-600 border-purple-200 group-hover:border-purple-400 group-hover:shadow-purple-100",
  pink:   "bg-pink-50 text-pink-600 border-pink-200 group-hover:border-pink-400 group-hover:shadow-pink-100",
  green:  "bg-green-50 text-green-600 border-green-200 group-hover:border-green-400 group-hover:shadow-green-100",
  red:    "bg-red-50 text-red-600 border-red-200 group-hover:border-red-400 group-hover:shadow-red-100",
  amber:  "bg-amber-50 text-amber-600 border-amber-200 group-hover:border-amber-400 group-hover:shadow-amber-100",
};

export function PortalCards({ searchQuery, selectedCategory }: PortalCardsProps) {
  const { toast } = useToast();

  const filteredPortals = portals.filter(portal => {
    const matchesCategory = selectedCategory === "All" || portal.category === selectedCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      portal.name.toLowerCase().includes(q) ||
      portal.description.toLowerCase().includes(q) ||
      portal.keyFeatures.some(f => f.toLowerCase().includes(q)) ||
      portal.phone.includes(q) ||
      portal.email.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({ title: "Link Copied", description: `${url} copied to clipboard.` });
    });
  };

  const handleShare = (portal: typeof portals[0]) => {
    if (navigator.share) {
      navigator.share({ title: portal.name, text: portal.description, url: portal.url }).catch(() => null);
    } else {
      navigator.clipboard.writeText(portal.url).then(() => {
        toast({ title: "Link Copied", description: `${portal.url} copied — share it anywhere.` });
      });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {filteredPortals.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No portals found matching your criteria.</p>
          </div>
        ) : (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
          >
            {filteredPortals.map((portal) => {
              const Icon = portal.icon;
              const colorClass = colorMap[portal.color] || colorMap.blue;
              const parts = colorClass.split(" ");
              const iconBg   = parts[0];
              const iconText = parts[1];
              const hoverBorder = parts.filter(c => c.startsWith("group-hover:border")).join(" ");
              const hoverShadow = parts.filter(c => c.startsWith("group-hover:shadow")).join(" ");

              return (
                <motion.div key={portal.id} variants={item}>
                  <Card className={`h-full flex flex-col rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 bg-card group ${hoverBorder} ${hoverShadow}`}>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${iconBg} ${iconText}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex gap-2">
                          <Badge variant="secondary" className="bg-muted text-xs font-semibold text-muted-foreground">OFFICIAL</Badge>
                          <Badge variant="outline" className="text-xs font-semibold flex items-center gap-1 border-primary/20 text-primary">
                            <ShieldCheck className="w-3 h-3" /> GOVT.
                          </Badge>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {portal.name}
                      </h3>
                      <a
                        href={portal.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-muted-foreground flex items-center gap-1 mt-1 hover:text-primary transition-colors"
                        data-testid={`link-url-${portal.id}`}
                      >
                        <Globe className="w-3 h-3" />
                        {portal.url.replace("https://", "")}
                      </a>
                    </CardHeader>

                    <CardContent className="flex-grow">
                      <p className="text-sm text-foreground/80 mb-4 h-10 line-clamp-2">
                        {portal.description}
                      </p>

                      <Badge className={`mb-4 ${iconBg} ${iconText} border-none`}>
                        Best For: {portal.bestFor}
                      </Badge>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="details" className="border-b-0">
                          <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline hover:text-primary">
                            View Details &amp; Contact
                          </AccordionTrigger>
                          <AccordionContent className="text-sm text-muted-foreground space-y-3 pb-2 pt-1">
                            <div>
                              <strong className="text-foreground">Why Important:</strong> {portal.whyImportant}
                            </div>
                            <div>
                              <strong className="text-foreground">Who Should Use:</strong> {portal.whoShouldUse}
                            </div>
                            <div>
                              <strong className="text-foreground">Key Features:</strong>
                              <ul className="list-disc pl-4 mt-1 space-y-1">
                                {portal.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
                              </ul>
                            </div>
                            <div>
                              <strong className="text-foreground">Benefits:</strong> {portal.benefits}
                            </div>

                            <div className="mt-3 pt-3 border-t border-border/50 space-y-2.5">
                              <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Top Authority</p>
                              <div className="flex items-center gap-2 text-xs text-foreground/80 font-medium bg-primary/5 rounded-lg px-2.5 py-2">
                                <User className="w-3.5 h-3.5 text-primary shrink-0" />
                                {portal.headTitle}
                              </div>
                              <a
                                href={`tel:${portal.headOfficePhone.replace(/[^0-9+]/g, "")}`}
                                className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                data-testid={`card-head-phone-${portal.id}`}
                              >
                                <Phone className="w-3.5 h-3.5 shrink-0" />
                                {portal.headOfficePhone} <span className="text-xs text-muted-foreground">(Direct)</span>
                              </a>
                              {portal.whatsapp !== "N/A" && (
                                <a
                                  href={`https://wa.me/91${portal.whatsapp.replace(/[^0-9]/g, "")}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 text-sm font-medium text-green-600 hover:underline"
                                  data-testid={`card-whatsapp-${portal.id}`}
                                >
                                  <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                                  {portal.whatsapp} <span className="text-xs text-muted-foreground">(WhatsApp)</span>
                                </a>
                              )}

                              <p className="text-xs font-semibold text-foreground uppercase tracking-wide pt-1">Helpdesk</p>
                              <a
                                href={`tel:${portal.phone.replace(/[^0-9+]/g, "")}`}
                                className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                                data-testid={`card-phone-${portal.id}`}
                              >
                                <Phone className="w-3.5 h-3.5 shrink-0" />
                                {portal.phone}
                              </a>
                              <a
                                href={`mailto:${portal.email}`}
                                className="flex items-center gap-2 text-sm text-blue-600 hover:underline break-all"
                                data-testid={`card-email-${portal.id}`}
                              >
                                <Mail className="w-3.5 h-3.5 shrink-0" />
                                {portal.email}
                              </a>
                              <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="w-3 h-3 shrink-0" />
                                {portal.helpdesk}
                              </p>
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>

                    <CardFooter className="pt-4 border-t border-border/50 gap-2">
                      {/* Use asChild so the button renders as a real <a> tag — avoids popup blocker */}
                      <Button asChild className="flex-1 rounded-lg" data-testid={`btn-launch-${portal.id}`}>
                        <a href={portal.url} target="_blank" rel="noopener noreferrer">
                          Launch Website <ExternalLink className="w-4 h-4 ml-2" />
                        </a>
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-lg shrink-0 text-muted-foreground hover:text-foreground"
                        onClick={() => toast({ title: "Bookmarked", description: `${portal.name} saved.` })}
                        data-testid={`btn-bookmark-${portal.id}`}
                        title="Bookmark"
                      >
                        <BookmarkPlus className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-lg shrink-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleShare(portal)}
                        data-testid={`btn-share-${portal.id}`}
                        title="Share"
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>

                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-lg shrink-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleCopyLink(portal.url)}
                        data-testid={`btn-copy-${portal.id}`}
                        title="Copy link"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}

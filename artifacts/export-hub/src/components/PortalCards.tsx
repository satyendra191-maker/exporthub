import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, BookmarkPlus, Share2, Copy, ShieldCheck, Globe, Phone, Mail, Clock, User, MessageCircle, Search } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Empty, EmptyMedia, EmptyTitle, EmptyDescription } from "@/components/ui/empty";
import { portals } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";

interface PortalCardsProps {
  searchQuery: string;
  selectedCategory: string;
}

const colorMap: Record<string, string> = {
  blue:   "from-blue-500 to-blue-600",
  indigo: "from-indigo-500 to-indigo-600",
  orange: "from-orange-500 to-orange-600",
  teal:   "from-teal-500 to-teal-600",
  emerald:"from-emerald-500 to-emerald-600",
  purple: "from-purple-500 to-purple-600",
  pink:   "from-pink-500 to-pink-600",
  green:  "from-green-500 to-green-600",
  red:    "from-red-500 to-red-600",
  amber:  "from-amber-500 to-amber-600",
};

const iconColorMap: Record<string, string> = {
  blue:   "text-blue-600",
  indigo: "text-indigo-600",
  orange: "text-orange-600",
  teal:   "text-teal-600",
  emerald:"text-emerald-600",
  purple: "text-purple-600",
  pink:   "text-pink-600",
  green:  "text-green-600",
  red:    "text-red-600",
  amber:  "text-amber-600",
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
      portal.exportStage.toLowerCase().includes(q) ||
      portal.cost.toLowerCase().includes(q) ||
      portal.authority.toLowerCase().includes(q) ||
      portal.phone.includes(q) ||
      portal.email.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({ 
        title: "Link Copied", 
        description: `${url} copied to clipboard.`
      });
    });
  };

  const handleShare = (portal: typeof portals[0]) => {
    if (navigator.share) {
      navigator.share({ title: portal.name, text: portal.description, url: portal.url }).catch(() => null);
    } else {
      navigator.clipboard.writeText(portal.url).then(() => {
        toast({ 
          title: "Link Copied", 
          description: `${portal.url} copied — share it anywhere.`
        });
      });
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 bg-background" id="tools">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {filteredPortals.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex justify-center"
            >
              <Empty className="max-w-md py-16 bg-card/50 rounded-2xl border border-border">
                <EmptyMedia variant="icon">
                  <Search className="w-8 h-8" />
                </EmptyMedia>
                <EmptyTitle>No portals found</EmptyTitle>
                <EmptyDescription>
                  Try adjusting your search or filter criteria to find what you're looking for.
                </EmptyDescription>
              </Empty>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              variants={container}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
            >
              {filteredPortals.map((portal) => {
                const Icon = portal.icon;
                const gradient = colorMap[portal.color] || colorMap.blue;
                const iconColor = iconColorMap[portal.color] || iconColorMap.blue;

                return (
                  <motion.div key={portal.id} variants={item}>
                    <Card className="h-full flex flex-col rounded-2xl border-2 bg-card group hover:shadow-card-hover transition-all duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-4">
                          <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md group-hover:scale-110 transition-transform duration-300`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div className="flex gap-2">
                            <Badge variant="secondary" className="text-xs font-semibold">OFFICIAL</Badge>
                            <Badge variant="outline" className="text-xs font-semibold flex items-center gap-1">
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
                          className="text-sm font-medium text-muted-foreground flex items-center gap-1.5 mt-1 hover:text-primary transition-colors"
                          data-testid={`link-url-${portal.id}`}
                        >
                          <Globe className="w-4 h-4" />
                          <span className="truncate">{portal.url.replace("https://", "")}</span>
                        </a>
                      </CardHeader>

                      <CardContent className="flex-grow">
                        <p className="text-sm text-foreground/80 mb-4 line-clamp-2">
                          {portal.description}
                        </p>

                        <Badge variant="outline" className="mb-4">
                          Best For: {portal.bestFor}
                        </Badge>

                        <Accordion type="single" collapsible className="w-full">
                          <AccordionItem value="details" className="border-b-0">
                            <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline hover:text-primary rounded-lg hover:bg-muted/30 px-2 transition-colors">
                              View Details & Contact
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
                                  {portal.keyFeatures.map((f, i) => <li key={i} className="text-xs">{f}</li>)}
                                </ul>
                              </div>
                              <div>
                                <strong className="text-foreground">Benefits:</strong> {portal.benefits}
                              </div>

                              <div className="mt-3 pt-3 border-t border-border/50 space-y-2.5">
                                <p className="text-xs font-semibold text-foreground uppercase tracking-wide">Top Authority</p>
                                <div className="flex items-center gap-2 text-xs font-medium bg-primary/5 rounded-lg px-2.5 py-2">
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
                                    className="flex items-center gap-2 text-sm font-medium text-success hover:underline"
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
                                  className="flex items-center gap-2 text-sm text-primary hover:underline break-all"
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
                        <Button asChild className="flex-1 rounded-xl" data-testid={`btn-launch-${portal.id}`}>
                          <a href={portal.url} target="_blank" rel="noopener noreferrer">
                            Launch Website <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl shrink-0 h-10 w-10 focus-ring"
                          onClick={() => toast({ 
                            title: "Bookmarked", 
                            description: `${portal.name} saved to your bookmarks.`,
                            className: "bg-card border"
                          })}
                          data-testid={`btn-bookmark-${portal.id}`}
                          title="Bookmark this portal"
                          aria-label={`Bookmark ${portal.name}`}
                        >
                          <BookmarkPlus className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl shrink-0 h-10 w-10 focus-ring"
                          onClick={() => handleShare(portal)}
                          data-testid={`btn-share-${portal.id}`}
                          title="Share this portal"
                          aria-label={`Share ${portal.name}`}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>

                        <Button
                          variant="outline"
                          size="icon"
                          className="rounded-xl shrink-0 h-10 w-10 focus-ring"
                          onClick={() => handleCopyLink(portal.url)}
                          data-testid={`btn-copy-${portal.id}`}
                          title="Copy link"
                          aria-label={`Copy link for ${portal.name}`}
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
        </AnimatePresence>
      </div>
    </section>
  );
}

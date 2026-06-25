import { motion } from "framer-motion";
import { ExternalLink, BookmarkPlus, Share2, Copy, ShieldCheck, Globe } from "lucide-react";
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
  blue: "bg-blue-50 text-blue-600 border-blue-200 group-hover:border-blue-400 group-hover:shadow-blue-100",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-200 group-hover:border-indigo-400 group-hover:shadow-indigo-100",
  orange: "bg-orange-50 text-orange-600 border-orange-200 group-hover:border-orange-400 group-hover:shadow-orange-100",
  teal: "bg-teal-50 text-teal-600 border-teal-200 group-hover:border-teal-400 group-hover:shadow-teal-100",
  emerald: "bg-emerald-50 text-emerald-600 border-emerald-200 group-hover:border-emerald-400 group-hover:shadow-emerald-100",
  purple: "bg-purple-50 text-purple-600 border-purple-200 group-hover:border-purple-400 group-hover:shadow-purple-100",
  pink: "bg-pink-50 text-pink-600 border-pink-200 group-hover:border-pink-400 group-hover:shadow-pink-100",
  green: "bg-green-50 text-green-600 border-green-200 group-hover:border-green-400 group-hover:shadow-green-100",
  red: "bg-red-50 text-red-600 border-red-200 group-hover:border-red-400 group-hover:shadow-red-100",
  amber: "bg-amber-50 text-amber-600 border-amber-200 group-hover:border-amber-400 group-hover:shadow-amber-100"
};

export function PortalCards({ searchQuery, selectedCategory }: PortalCardsProps) {
  const { toast } = useToast();

  const filteredPortals = portals.filter(portal => {
    const matchesCategory = selectedCategory === "All" || portal.category === selectedCategory;
    const matchesSearch = 
      portal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portal.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      portal.keyFeatures.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleCopyLink = (url: string) => {
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied",
      description: `Copied ${url} to clipboard.`
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {filteredPortals.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg">No portals found matching your criteria.</p>
            <Button 
              variant="link" 
              onClick={() => {}}
              className="mt-2"
            >
              Clear filters
            </Button>
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
              
              return (
                <motion.div key={portal.id} variants={item}>
                  <Card className={`h-full flex flex-col rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border-2 bg-card group ${colorClass.split(' ').filter(c => c.startsWith('group-hover:')).join(' ')}`}>
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-4">
                        <div className={`p-3 rounded-xl ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]}`}>
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
                      <p className="text-sm font-medium text-muted-foreground flex items-center gap-1 mt-1">
                        <Globe className="w-3 h-3" /> {portal.url}
                      </p>
                    </CardHeader>
                    
                    <CardContent className="flex-grow">
                      <p className="text-sm text-foreground/80 mb-4 h-10 line-clamp-2">
                        {portal.description}
                      </p>
                      
                      <Badge className={`mb-4 ${colorClass.split(' ')[0]} ${colorClass.split(' ')[1]} border-none`}>
                        Best For: {portal.bestFor}
                      </Badge>

                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="details" className="border-b-0">
                          <AccordionTrigger className="py-2 text-sm font-medium hover:no-underline hover:text-primary">
                            View Details
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
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>

                    <CardFooter className="pt-4 border-t border-border/50 gap-2">
                      <Button 
                        className="flex-1 rounded-lg" 
                        onClick={(e) => {
                          e.preventDefault();
                          toast({ title: "Redirecting...", description: `Opening ${portal.url} in a new tab.` });
                        }}
                        data-testid={`btn-launch-${portal.id}`}
                      >
                        Launch Website <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-lg shrink-0 text-muted-foreground hover:text-foreground">
                        <BookmarkPlus className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-lg shrink-0 text-muted-foreground hover:text-foreground">
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="icon" 
                        className="rounded-lg shrink-0 text-muted-foreground hover:text-foreground"
                        onClick={() => handleCopyLink(portal.url)}
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

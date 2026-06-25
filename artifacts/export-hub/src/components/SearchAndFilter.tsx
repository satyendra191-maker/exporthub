import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/data";

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
}

export function SearchAndFilter({ 
  searchQuery, 
  setSearchQuery, 
  selectedCategory, 
  setSelectedCategory 
}: SearchAndFilterProps) {
  return (
    <section className="py-12 bg-background" id="tools">
      <div className="container mx-auto px-4">
        <motion.div 
          className="max-w-3xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative group">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              type="text"
              placeholder="Search portals, HS codes, schemes, regulations..."
              className="pl-10 h-14 text-base rounded-full border-border bg-card shadow-sm hover:border-primary/50 focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-portals"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                className={`rounded-full transition-all ${
                  selectedCategory === category 
                    ? "shadow-md" 
                    : "hover:bg-muted"
                }`}
                onClick={() => setSelectedCategory(category)}
                data-testid={`filter-category-${category.replace(/[^a-zA-Z]/g, '').toLowerCase()}`}
              >
                {category}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

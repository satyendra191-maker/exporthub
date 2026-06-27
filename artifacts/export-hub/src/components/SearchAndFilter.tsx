import { motion } from "framer-motion";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/data";

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
}

const categoryStyles: Record<string, { active: string; idle: string }> = {
  "All": {
    active: "bg-foreground text-white border-foreground",
    idle: "text-foreground border-foreground/20 hover:bg-foreground/5",
  },
  "Market Research": {
    active: "bg-blue-600 text-white border-blue-600",
    idle: "text-blue-600 border-blue-300/50 hover:bg-blue-50",
  },
  "Compliance": {
    active: "bg-indigo-600 text-white border-indigo-600",
    idle: "text-indigo-600 border-indigo-300/50 hover:bg-indigo-50",
  },
  "Analytics": {
    active: "bg-teal-600 text-white border-teal-600",
    idle: "text-teal-600 border-teal-300/50 hover:bg-teal-50",
  },
  "Food & Agri": {
    active: "bg-emerald-600 text-white border-emerald-600",
    idle: "text-emerald-600 border-emerald-300/50 hover:bg-emerald-50",
  },
  "Customs": {
    active: "bg-orange-600 text-white border-orange-600",
    idle: "text-orange-600 border-orange-300/50 hover:bg-orange-50",
  },
  "Investment": {
    active: "bg-purple-600 text-white border-purple-600",
    idle: "text-purple-600 border-purple-300/50 hover:bg-purple-50",
  },
};

export function SearchAndFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
}: SearchAndFilterProps) {
  return (
    <section className="py-16 bg-background" id="tools">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="max-w-3xl mx-auto space-y-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Section title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">Explore Government Portals</h2>
            <p className="text-sm text-muted-foreground">Search across 10 portals or filter by category</p>
          </div>

          {/* Search input */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              type="text"
              placeholder="Search portals, HS codes, schemes, export stages..."
              className="pl-12 pr-12 h-14 text-base rounded-2xl border border-border bg-card shadow-sm hover:shadow-md focus:shadow-md focus:border-primary/50 transition-all duration-300"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-portals"
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {/* Category filter pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex items-center gap-1.5 text-muted-foreground mr-1">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span className="text-xs font-medium">Filter:</span>
            </div>
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              const styles = categoryStyles[category] ?? categoryStyles["All"];
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-xl px-4 py-2 text-xs font-semibold border transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? `${styles.active} shadow-sm`
                      : `bg-white ${styles.idle}`
                  }`}
                  data-testid={`filter-category-${category.replace(/[^a-zA-Z]/g, "").toLowerCase()}`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* Filter status */}
          {(searchQuery || selectedCategory !== "All") && (
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center gap-2 text-xs text-muted-foreground"
            >
              <span>
                Showing results
                {selectedCategory !== "All" && <span className="font-semibold text-foreground"> {selectedCategory}</span>}
                {searchQuery && <span> matching <span className="font-semibold text-foreground">"{searchQuery}"</span></span>}
              </span>
              <button
                className="text-xs underline hover:text-primary font-medium"
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              >
                Clear all
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

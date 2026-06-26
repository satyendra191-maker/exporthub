import { motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { categories } from "@/lib/data";

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  selectedCategory: string;
  setSelectedCategory: (val: string) => void;
}

const categoryColors: Record<string, string> = {
  "All":             "bg-gray-800  text-white  border-gray-800",
  "Market Research": "bg-blue-600  text-white  border-blue-600",
  "Compliance":      "bg-indigo-600 text-white border-indigo-600",
  "Analytics":       "bg-teal-600  text-white  border-teal-600",
  "Food & Agri":     "bg-green-600 text-white  border-green-600",
  "Customs":         "bg-orange-600 text-white border-orange-600",
  "Investment":      "bg-purple-600 text-white border-purple-600",
};

const categoryColorsIdle: Record<string, string> = {
  "All":             "text-gray-700  border-gray-300  hover:bg-gray-100",
  "Market Research": "text-blue-700  border-blue-300  hover:bg-blue-50",
  "Compliance":      "text-indigo-700 border-indigo-300 hover:bg-indigo-50",
  "Analytics":       "text-teal-700  border-teal-300  hover:bg-teal-50",
  "Food & Agri":     "text-green-700 border-green-300 hover:bg-green-50",
  "Customs":         "text-orange-700 border-orange-300 hover:bg-orange-50",
  "Investment":      "text-purple-700 border-purple-300 hover:bg-purple-50",
};

export function SearchAndFilter({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
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
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </div>
            <Input
              type="text"
              placeholder="Search portals, HS codes, schemes, export stage..."
              className="pl-11 pr-10 h-14 text-base rounded-full border-2 border-border bg-card shadow-sm hover:border-primary/40 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-portals"
            />
            {searchQuery && (
              <button
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2">
            {categories.map((category) => {
              const isActive = selectedCategory === category;
              const activeClass  = categoryColors[category]     ?? "bg-gray-800 text-white border-gray-800";
              const idleClass    = categoryColorsIdle[category] ?? "text-gray-700 border-gray-300 hover:bg-gray-100";
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold border-2 transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? `${activeClass} shadow-md scale-105 ring-2 ring-offset-2 ring-current/30`
                      : `bg-white ${idleClass}`
                  }`}
                  data-testid={`filter-category-${category.replace(/[^a-zA-Z]/g, "").toLowerCase()}`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {(searchQuery || selectedCategory !== "All") && (
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>
                Filtering by:
                {selectedCategory !== "All" && <strong className="text-foreground ml-1">{selectedCategory}</strong>}
                {searchQuery && <span className="ml-1">matching <strong className="text-foreground">"{searchQuery}"</strong></span>}
              </span>
              <button
                className="text-xs underline hover:text-primary"
                onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }}
              >
                Clear all
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

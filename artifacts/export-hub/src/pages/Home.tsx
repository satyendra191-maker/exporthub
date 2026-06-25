import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { DashboardWidgets } from "@/components/DashboardWidgets";
import { SearchAndFilter } from "@/components/SearchAndFilter";
import { PortalCards } from "@/components/PortalCards";
import { ComparisonTable } from "@/components/ComparisonTable";
import { ExportJourney } from "@/components/ExportJourney";
import { ReadinessChecklist } from "@/components/ReadinessChecklist";
import { UsefulDownloads } from "@/components/UsefulDownloads";
import { AIAssistant } from "@/components/AIAssistant";
import { BackToTop } from "@/components/BackToTop";
import { Footer } from "@/components/Footer";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Navbar />
      <main>
        <HeroSection />
        <DashboardWidgets />
        <SearchAndFilter 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          selectedCategory={selectedCategory} 
          setSelectedCategory={setSelectedCategory} 
        />
        <PortalCards 
          searchQuery={searchQuery} 
          selectedCategory={selectedCategory} 
        />
        <ComparisonTable />
        <ExportJourney />
        <ReadinessChecklist />
        <UsefulDownloads />
      </main>
      <Footer />
      <AIAssistant />
      <BackToTop />
    </div>
  );
}

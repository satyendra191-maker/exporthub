import { Link } from "wouter";
import { Facebook, Twitter, Linkedin, Youtube, Mail, MapPin, Phone } from "lucide-react";
import { portals } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-card text-foreground pt-16 pb-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Col 1 */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="font-bold text-lg text-foreground">Export Intelligence</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              Your centralized gateway to navigate India's export ecosystem, find schemes, and connect with global markets.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {portals.slice(0, 6).map(p => (
                <li key={p.id}>
                  <a href={`#${p.id}`} className="hover:text-primary transition-colors">{p.name}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Export Journey</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#journey" className="hover:text-primary transition-colors">1. Choose Product</a></li>
              <li><a href="#journey" className="hover:text-primary transition-colors">2. Market Research</a></li>
              <li><a href="#journey" className="hover:text-primary transition-colors">3. IEC Registration</a></li>
              <li><a href="#journey" className="hover:text-primary transition-colors">4. Quality Certification</a></li>
              <li><a href="#journey" className="hover:text-primary transition-colors">5. Customs Clearance</a></li>
              <li><a href="#journey" className="hover:text-primary transition-colors">6. Find Buyers</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-bold text-foreground mb-4">Contact & Support</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>support@exporthub.example.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>1800-111-XXXX (Toll Free)</span>
              </li>
              <li className="pt-2 space-y-2">
                <a href="#" className="hover:text-primary transition-colors block">Privacy Policy</a>
                <a href="#" className="hover:text-primary transition-colors block">Terms of Service</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2025 Export Intelligence Hub · Last Updated: June 2025 · Version 2.0</p>
          <p>Made with ❤️ for Indian Exporters</p>
          <p className="md:text-right max-w-sm">
            Disclaimer: This platform is an independent aggregator. All linked portals are official Government of India websites.
          </p>
        </div>
      </div>
    </footer>
  );
}

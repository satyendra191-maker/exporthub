import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
};

const suggestedQuestions = [
  "How to register for IEC?",
  "What HS codes do I need?",
  "Which portal for food exports?",
  "Export incentives available?",
];

const getBotResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  if (lowerQuery.includes("iec")) return "For IEC (Importer Exporter Code) registration, visit DGFT portal (dgft.gov.in). The process takes 2-3 working days and costs ₹500.";
  if (lowerQuery.includes("hs code") || lowerQuery.includes("hsn")) return "Find HS Codes on Indian Trade Portal (indiantradeportal.in). Search by product name or browse by chapter. Each code has specific duty rates.";
  if (lowerQuery.includes("wheat") || lowerQuery.includes("flour") || lowerQuery.includes("rice") || lowerQuery.includes("food")) return "Food exporters must register with APEDA (apeda.gov.in) and obtain necessary certifications. Check if your product requires FSSAI approval.";
  if (lowerQuery.includes("tariff")) return "Tariff schedules and import duties are on Indian Trade Portal. Use their duty calculator for accurate estimates.";
  if (lowerQuery.includes("customs") || lowerQuery.includes("shipping bill")) return "File shipping bills and clear customs through ICEGATE (icegate.gov.in). You'll need IEC, invoice, and packing list.";
  if (lowerQuery.includes("buyer") || lowerQuery.includes("find buyers")) return "FIEO (fieo.org) organizes buyer-seller meets. Export Promotion Councils also have buyer databases.";
  if (lowerQuery.includes("export benefit") || lowerQuery.includes("rodtep") || lowerQuery.includes("scheme")) return "RoDTEP and other FTP schemes are managed by DGFT. Check dgft.gov.in for current incentive rates.";
  if (lowerQuery.includes("invest") || lowerQuery.includes("investment")) return "Invest India (investindia.gov.in) provides investment facilitation. Great for setting up manufacturing for exports.";
  
  return "Great question! For official export queries, I recommend visiting DGFT (dgft.gov.in) for licensing, or NIRYAT (niryat.gov.in) for trade analytics.";
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Namaste! I'm your Export AI Assistant. Ask me about IEC, HS Codes, schemes, or any export query.", sender: "bot" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setInput("");
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userMsg, sender: "user" }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        text: getBotResponse(userMsg), 
        sender: "bot" 
      }]);
    }, 800);
  };

  const handleSuggestedQuestion = (q: string) => {
    setInput(q);
    handleSend(new Event("submit") as any);
  };

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button 
              size="icon" 
              className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl transition-all ai-gradient focus-ring"
              onClick={() => setIsOpen(true)}
              data-testid="btn-open-chat"
              aria-label="Open AI Assistant chat"
            >
              <MessageSquare className="h-6 w-6" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ y: 50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", bounce: 0.3 }}
            className="fixed bottom-6 right-6 z-50 w-[350px] sm:w-[400px] shadow-2xl rounded-2xl overflow-hidden border-2 border-border bg-card"
            role="dialog"
            aria-label="Export AI Assistant"
          >
            <Card className="border-0 rounded-none shadow-none">
              <CardHeader className="p-4 ai-gradient text-white flex flex-row justify-between items-center space-y-0">
                <div className="flex items-center gap-2">
                  <div className="bg-white/20 p-1.5 rounded-lg">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="font-semibold">Export AI Assistant</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white hover:bg-white/20 rounded-lg focus-ring"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat"
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 bg-background">
                <ScrollArea className="h-[350px] p-4 flex flex-col gap-4" viewportRef={scrollRef}>
                  <div className="flex flex-col gap-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id} 
                        className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${msg.sender === 'user' ? 'bg-primary/20 text-primary' : 'bg-muted text-muted-foreground'}`}>
                          {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                        </div>
                        <div className={`p-3.5 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-card border rounded-tl-none shadow-sm'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-2 max-w-[85%] self-start">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-muted text-muted-foreground">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="p-4 rounded-2xl bg-card border rounded-tl-none flex items-center gap-1">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.15s]" />
                          <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:0.3s]" />
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
              <CardFooter className="p-3 bg-card border-t">
                <form onSubmit={handleSend} className="flex w-full gap-2">
                  <Input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about IEC, HS Codes..."
                    className="flex-1 h-10 rounded-xl focus-ring"
                    data-testid="input-chat"
                    aria-label="Chat message input"
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    disabled={!input.trim()}
                    className="h-10 w-10 rounded-xl focus-ring"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </form>
              </CardFooter>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

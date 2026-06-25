import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

type Message = {
  id: string;
  text: string;
  sender: "bot" | "user";
};

const getBotResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  if (lowerQuery.includes("iec")) return "For IEC (Importer Exporter Code) registration, you need to visit the DGFT portal (dgft.gov.in). It's mandatory for all exporters.";
  if (lowerQuery.includes("hs code") || lowerQuery.includes("hsn")) return "You can find and verify HS Codes and associated tariffs on the Indian Trade Portal (indiantradeportal.in).";
  if (lowerQuery.includes("wheat") || lowerQuery.includes("flour") || lowerQuery.includes("rice") || lowerQuery.includes("food")) return "For agricultural and processed food exports, you must register with APEDA (apeda.gov.in) and comply with their standards.";
  if (lowerQuery.includes("tariff")) return "Tariff schedules and import duties of destination countries are available on the Indian Trade Portal.";
  if (lowerQuery.includes("customs") || lowerQuery.includes("shipping bill")) return "All customs clearances, including filing of shipping bills, are handled through ICEGATE (icegate.gov.in).";
  if (lowerQuery.includes("buyer") || lowerQuery.includes("find buyers")) return "FIEO (fieo.org) and various Export Promotion Councils organize buyer-seller meets to help you find international buyers.";
  if (lowerQuery.includes("export benefit") || lowerQuery.includes("rodtep") || lowerQuery.includes("scheme")) return "Export benefits like RoDTEP and other schemes under the Foreign Trade Policy are managed by DGFT.";
  
  return "Great question! For official export queries, I recommend visiting DGFT (dgft.gov.in) for licensing, or NIRYAT (niryat.gov.in) for trade analytics.";
};

export function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Namaste! I'm your Export AI Assistant. How can I help you navigate the Indian export ecosystem today?", sender: "bot" }
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
    }, 1000);
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
              className="h-14 w-14 rounded-full shadow-xl hover:shadow-2xl transition-all"
              onClick={() => setIsOpen(true)}
              data-testid="btn-open-chat"
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
            className="fixed bottom-6 right-6 z-50 w-[350px] shadow-2xl rounded-2xl overflow-hidden border-2"
          >
            <Card className="border-0 rounded-none shadow-none">
              <CardHeader className="p-4 bg-primary text-primary-foreground flex flex-row justify-between items-center space-y-0">
                <div className="flex items-center gap-2">
                  <div className="bg-primary-foreground/20 p-1.5 rounded-md">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div className="font-semibold">Export AI Assistant</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="w-5 h-5" />
                </Button>
              </CardHeader>
              <CardContent className="p-0 bg-muted/10">
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
                        <div className={`p-3 rounded-2xl text-sm ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-tr-none' : 'bg-card border rounded-tl-none'}`}>
                          {msg.text}
                        </div>
                      </div>
                    ))}
                    {isTyping && (
                      <div className="flex gap-2 max-w-[85%] self-start">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-muted text-muted-foreground">
                          <Bot className="w-4 h-4" />
                        </div>
                        <div className="p-4 rounded-2xl bg-card border rounded-tl-none flex items-center gap-1.5">
                          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce" />
                          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce [animation-delay:0.4s]" />
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
                    className="flex-1"
                    data-testid="input-chat"
                  />
                  <Button type="submit" size="icon" disabled={!input.trim()}>
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

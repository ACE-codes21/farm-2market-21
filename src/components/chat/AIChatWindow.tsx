
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface AIChatWindowProps {
  onClose: () => void;
}

const AIChatWindow: React.FC<AIChatWindowProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: 'Hello! I\'m here to help you with any questions about Farm2Market. How can I assist you today?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const generateAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Order-related queries
    if (message.includes('order') || message.includes('buy') || message.includes('purchase')) {
      return 'To place an order, browse through our product listings, add items to your cart, and proceed to checkout. You can pay using various methods including cards and UPI.';
    }
    
    // Vendor finding queries
    if (message.includes('vendor') || message.includes('seller') || message.includes('find') || message.includes('near')) {
      return 'You can find vendors near you using our map view in the "Vendors" tab. Filter by location, product type, and other criteria to find the perfect match.';
    }
    
    // Dashboard help
    if (message.includes('dashboard') || message.includes('navigate') || message.includes('use')) {
      return 'The dashboard has several tabs: Products (browse and buy), Vendors (find sellers), Wishlist (saved items), and Orders (track purchases). Use the top navigation to switch between sections.';
    }
    
    // Payment queries
    if (message.includes('payment') || message.includes('pay') || message.includes('card') || message.includes('upi')) {
      return 'We accept multiple payment methods including credit/debit cards, UPI, and digital wallets. All payments are secure and processed through encrypted channels.';
    }
    
    // Vendor features
    if (message.includes('vendor features') || message.includes('selling') || message.includes('business')) {
      return 'As a vendor, you can list products, manage inventory, track orders, view analytics, and access financial tools. Switch to vendor mode to explore these features.';
    }
    
    // Greetings
    if (message.includes('hello') || message.includes('hi') || message.includes('help')) {
      return 'Hello! I can help you with ordering products, finding vendors, navigating the dashboard, payment methods, and vendor features. What would you like to know?';
    }
    
    // Default response
    return 'I can help you with ordering, finding vendors, payment methods, and using the platform. Could you please be more specific about what you need help with?';
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Generate AI response based on user input
    setTimeout(() => {
      const aiResponse: Message = { 
        role: 'ai', 
        content: generateAIResponse(inputValue)
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      // A small delay to ensure the new message is rendered before scrolling.
      setTimeout(() => {
        const viewport = scrollAreaRef.current?.querySelector('[data-radix-scroll-area-viewport]');
        if (viewport) {
          viewport.scrollTop = viewport.scrollHeight;
        }
      }, 100);
    }
  }, [messages]);

  return (
    <Card className="fixed bottom-24 right-8 w-80 h-[28rem] bg-slate-900/80 backdrop-blur-lg border-slate-700 text-white flex flex-col shadow-2xl animate-fade-in-up z-50">
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-slate-700 flex-shrink-0">
        <div className="flex items-center gap-2">
          <Bot className="text-green-400" />
          <CardTitle className="text-lg font-bold">AI Assistant</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full" ref={scrollAreaRef}>
          <div className="p-4 space-y-4 min-h-0">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-start gap-2",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'ai' && <Bot className="w-6 h-6 shrink-0 text-green-400 mt-1" />}
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 max-w-[75%] break-words",
                    message.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-800 text-slate-300'
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex items-start gap-2 justify-start">
                <Bot className="w-6 h-6 shrink-0 text-green-400 mt-1" />
                <div className="bg-slate-800 text-slate-300 rounded-lg px-3 py-2">
                  <div className="flex items-center gap-1">
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
                    <span className="h-2 w-2 bg-slate-400 rounded-full animate-pulse"></span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="p-4 border-t border-slate-700 flex-shrink-0">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder="Ask me anything about Farm2Market..."
            className="bg-slate-800/80 border-slate-600/50 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            disabled={isLoading}
          />
          <Button type="submit" onClick={handleSendMessage} disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default AIChatWindow;

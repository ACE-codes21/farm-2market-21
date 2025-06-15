
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Send, Bot } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface Message {
  role: 'user' | 'ai';
  content: string;
}

interface AIChatWindowProps {
  onClose: () => void;
}

const AIChatWindow: React.FC<AIChatWindowProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', content: t('ai_chat.welcome_message') }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const userMessage: Message = { role: 'user', content: inputValue };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Mock AI response
    setTimeout(() => {
      const aiResponse: Message = { role: 'ai', content: t('ai_chat.mock_response') };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
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
      <CardHeader className="flex flex-row items-center justify-between p-4 border-b border-slate-700">
        <div className="flex items-center gap-2">
            <Bot className="text-green-400" />
            <CardTitle className="text-lg font-bold">{t('ai_chat.title')}</CardTitle>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-end gap-2",
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'ai' && <Bot className="w-6 h-6 shrink-0 text-green-400" />}
                <div
                  className={cn(
                    "rounded-lg px-3 py-2 max-w-[80%]",
                    message.role === 'user'
                      ? 'bg-green-600 text-white'
                      : 'bg-slate-800 text-slate-300'
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
             {isLoading && (
                <div className="flex items-end gap-2 justify-start">
                    <Bot className="w-6 h-6 shrink-0 text-green-400" />
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
      <CardFooter className="p-4 border-t border-slate-700">
        <div className="flex w-full items-center space-x-2">
          <Input
            type="text"
            placeholder={t('ai_chat.placeholder')}
            className="dark-input"
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

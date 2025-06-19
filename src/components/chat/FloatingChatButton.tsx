
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import AIChatWindow from './AIChatWindow';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/contexts/LanguageContext';

const FloatingChatButton: React.FC = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const { t } = useLanguage();

    const toggleChat = () => {
        setIsChatOpen(prev => !prev);
    };

    return (
        <>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button
                        onClick={toggleChat}
                        className="fixed bottom-8 right-8 h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg z-50 transition-transform transform hover:scale-110"
                        size="icon"
                    >
                        <MessageSquare className="h-7 w-7 text-white" />
                    </Button>
                </TooltipTrigger>
                <TooltipContent>
                    <p>{t('chat.aiAssistant')}</p>
                </TooltipContent>
            </Tooltip>

            {isChatOpen && <AIChatWindow onClose={toggleChat} />}
        </>
    );
};

export default FloatingChatButton;

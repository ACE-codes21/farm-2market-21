
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

const AIChatAssistant: React.FC = () => {
    return (
        <Card className="dark-modern-card mt-6 animate-fade-in">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                    <Sparkles className="text-green-400" /> AI Assistant
                </CardTitle>
                <CardDescription>Ask questions about schemes, licenses, and more.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="p-4 bg-slate-800/50 rounded-md text-slate-400 text-sm mb-4">
                    <p className="font-medium">Example questions:</p>
                    <ul className="list-disc pl-5 mt-1">
                        <li>"Which scheme gives a 10k loan?"</li>
                        <li>"How do I renew my vendor license?"</li>
                    </ul>
                </div>
                <div className="flex gap-2">
                    <Input placeholder="Type your question here..." className="dark-input" />
                    <Button>Ask</Button>
                </div>
            </CardContent>
        </Card>
    );
}

export default AIChatAssistant;

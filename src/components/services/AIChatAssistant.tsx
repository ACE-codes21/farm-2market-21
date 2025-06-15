
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const faqs = [
  {
    q: "Which scheme gives 10k loan?",
    a: "The PM SVANidhi scheme offers loans up to ₹10,000 for street vendors."
  },
  {
    q: "How do I renew license?",
    a: "Visit your local municipal office or use the online licensing portal for renewal."
  }
];

export const AIChatAssistant = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <Card className="bg-slate-800/70 border-neon-400/15 rounded-xl shadow">
      <CardContent className="p-6">
        <CardTitle className="mb-2 text-white flex gap-3 items-center">
          <span role="img">🤖</span> Ask Our Assistant
        </CardTitle>
        <div className="flex flex-col gap-2 my-2">
          {faqs.map((faq, i) => (
            <Button
              key={faq.q}
              className="justify-start bg-slate-700/80 text-white border border-slate-600 hover:bg-cyan-900"
              size="sm"
              variant="outline"
              onClick={() => setSelected(i)}
            >
              {faq.q}
            </Button>
          ))}
        </div>
        {selected !== null && (
          <div className="rounded bg-slate-900/90 text-cyan-200 p-3 mt-4 animate-fade-in">
            <b>Answer:</b> {faqs[selected].a}
          </div>
        )}
        <div className="text-xs text-slate-400 mt-6 opacity-75">
          <span role="img">🛈</span> More assistant features coming soon!
        </div>
      </CardContent>
    </Card>
  );
};

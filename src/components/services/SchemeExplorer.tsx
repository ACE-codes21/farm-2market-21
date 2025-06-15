
import { schemes } from "@/data/services";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SchemeExplorerProps {}

export const SchemeExplorer: React.FC<SchemeExplorerProps> = () => (
  <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2">
    {schemes.map((scheme) => (
      <Card
        key={scheme.id}
        className="bg-slate-800/80 border-green-500/10 shadow-lg rounded-xl transition hover:scale-105 hover:shadow-green-400/30"
      >
        <CardContent className="flex items-center gap-4 p-6">
          <span className="text-3xl">{scheme.icon}</span>
          <div className="flex-1">
            <CardTitle className="text-lg text-white font-bold">{scheme.name}</CardTitle>
            <div className="text-slate-300 text-sm mb-3 mt-1">{scheme.description}</div>
            <Button
              className="mt-1 bg-green-500 hover:bg-green-400 font-bold shadow-neon-green"
              asChild
              size="sm"
            >
              <a href={scheme.link} target="_blank" rel="noopener noreferrer">
                {scheme.link.startsWith("http") ? "Learn More" : "Apply Now"}
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);


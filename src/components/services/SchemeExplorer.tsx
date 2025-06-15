
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scheme } from '@/data/services';
import { ArrowRight } from 'lucide-react';

interface SchemeExplorerProps {
  schemes: Scheme[];
}

const SchemeExplorer: React.FC<SchemeExplorerProps> = ({ schemes }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 animate-fade-in">
      {schemes.map((scheme) => (
        <Card key={scheme.id} className="dark-modern-card flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <div className="p-3 bg-slate-700/50 rounded-lg">
                <scheme.icon className="w-8 h-8 text-green-400" />
              </div>
              <CardTitle className="text-white text-lg">{scheme.name}</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <p className="text-slate-400 text-sm">{scheme.description}</p>
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold">
              Learn More <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default SchemeExplorer;

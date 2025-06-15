
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle, HelpCircle, XCircle } from 'lucide-react';

const questions = [
  { id: 'q1', text: 'Do you have a street vendor certificate (Certificate of Vending)?' },
  { id: 'q2', text: 'Have you availed a government-backed loan in the past 2 years?' },
  { id: 'q3', text: 'Is your Aadhaar card linked to your mobile number and bank account?' },
];

const EligibilityChecker: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<'eligible' | 'ineligible' | null>(null);

  const handleValueChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };
  
  const checkEligibility = () => {
    if(answers.q1 === 'yes' && answers.q3 === 'yes') {
      setResult('eligible');
    } else {
      setResult('ineligible');
    }
  };

  const isCheckDisabled = Object.keys(answers).length !== questions.length;

  return (
    <Card className="dark-modern-card mt-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <HelpCircle className="text-green-400" /> Quick Eligibility Check
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map(q => (
          <div key={q.id}>
            <p className="font-medium text-slate-300 mb-2">{q.text}</p>
            <RadioGroup onValueChange={(value) => handleValueChange(q.id, value)} className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes" id={`${q.id}-yes`} />
                <Label htmlFor={`${q.id}-yes`}>Yes</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id={`${q.id}-no`} />
                <Label htmlFor={`${q.id}-no`}>No</Label>
              </div>
            </RadioGroup>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button onClick={checkEligibility} disabled={isCheckDisabled}>Check Now</Button>
        {result === 'eligible' && (
          <div className="flex items-center gap-2 text-green-400 p-3 bg-green-500/10 rounded-md">
            <CheckCircle />
            <p className="font-semibold">Congratulations! You appear to be eligible for several key schemes.</p>
          </div>
        )}
        {result === 'ineligible' && (
          <div className="flex items-center gap-2 text-yellow-400 p-3 bg-yellow-500/10 rounded-md">
            <XCircle />
            <p className="font-semibold">You may not qualify for some schemes. Ensure you have a vendor certificate and linked Aadhaar.</p>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EligibilityChecker;


import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle, HelpCircle, XCircle, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const questions = [
  { 
    id: 'q1', 
    text: 'Do you have a street vendor certificate (Certificate of Vending)?',
    weight: 3,
    schemes: ['PM SVANidhi', 'Mudra Loan']
  },
  { 
    id: 'q2', 
    text: 'Have you availed a government-backed loan in the past 2 years?',
    weight: 2,
    schemes: ['PM SVANidhi', 'Mudra Loan']
  },
  { 
    id: 'q3', 
    text: 'Is your Aadhaar card linked to your mobile number and bank account?',
    weight: 3,
    schemes: ['All schemes']
  },
  {
    id: 'q4',
    text: 'Do you have a PAN card?',
    weight: 2,
    schemes: ['Mudra Loan', 'Udyog Aadhar', 'FSSAI Registration']
  },
  {
    id: 'q5',
    text: 'Are you involved in food business/street food vending?',
    weight: 2,
    schemes: ['FSSAI Registration', 'PM SVANidhi']
  },
  {
    id: 'q6',
    text: 'Do you have a valid bank account in your name?',
    weight: 3,
    schemes: ['All schemes']
  },
  {
    id: 'q7',
    text: 'Are you a member of any Self Help Group (SHG)?',
    weight: 1,
    schemes: ['PM-SYM', 'Jan Dhan Yojana']
  },
  {
    id: 'q8',
    text: 'What is your monthly income range?',
    weight: 2,
    schemes: ['PM SVANidhi', 'Mudra Loan'],
    type: 'select',
    options: [
      { value: 'below-10000', label: 'Below ₹10,000' },
      { value: '10000-25000', label: '₹10,000 - ₹25,000' },
      { value: '25000-50000', label: '₹25,000 - ₹50,000' },
      { value: 'above-50000', label: 'Above ₹50,000' }
    ]
  }
];

const EligibilityChecker: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: string]: string }>({});
  const [result, setResult] = useState<{
    status: 'eligible' | 'partially-eligible' | 'ineligible' | null;
    score: number;
    eligibleSchemes: string[];
    recommendations: string[];
  }>({
    status: null,
    score: 0,
    eligibleSchemes: [],
    recommendations: []
  });

  const handleValueChange = (id: string, value: string) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };
  
  const checkEligibility = () => {
    let totalScore = 0;
    let maxScore = 0;
    const eligibleSchemes: string[] = [];
    const recommendations: string[] = [];

    // Calculate eligibility score
    questions.forEach(question => {
      maxScore += question.weight;
      const answer = answers[question.id];
      
      if (question.type === 'select') {
        if (answer && answer !== 'above-50000') {
          totalScore += question.weight;
        }
      } else {
        if (answer === 'yes') {
          totalScore += question.weight;
        }
      }
    });

    const scorePercentage = Math.round((totalScore / maxScore) * 100);

    // Check specific scheme eligibility
    const hasVendorCert = answers.q1 === 'yes';
    const hasAadhaarLinked = answers.q3 === 'yes';
    const hasBankAccount = answers.q6 === 'yes';
    const hasPAN = answers.q4 === 'yes';
    const isInFood = answers.q5 === 'yes';
    const noRecentLoan = answers.q2 === 'no';
    const isSHGMember = answers.q7 === 'yes';
    const incomeRange = answers.q8;

    // Scheme-specific eligibility
    if (hasVendorCert && hasAadhaarLinked && hasBankAccount && noRecentLoan) {
      eligibleSchemes.push('PM SVANidhi');
    }
    
    if (hasPAN && hasBankAccount && hasAadhaarLinked) {
      eligibleSchemes.push('Mudra Loan', 'Udyog Aadhar');
    }
    
    if (isInFood && hasBankAccount) {
      eligibleSchemes.push('FSSAI Registration');
    }
    
    if (hasAadhaarLinked && hasBankAccount) {
      eligibleSchemes.push('Jan Dhan Yojana');
    }
    
    if (isSHGMember || (incomeRange && ['below-10000', '10000-25000'].includes(incomeRange))) {
      eligibleSchemes.push('PM-SYM');
    }

    // Generate recommendations
    if (!hasVendorCert) {
      recommendations.push('Obtain a street vendor certificate from your local municipal authority');
    }
    if (!hasAadhaarLinked) {
      recommendations.push('Link your Aadhaar card to your mobile number and bank account');
    }
    if (!hasPAN) {
      recommendations.push('Apply for a PAN card to access more loan schemes');
    }
    if (!hasBankAccount) {
      recommendations.push('Open a bank account in your name for scheme eligibility');
    }
    if (answers.q2 === 'yes') {
      recommendations.push('Wait for 2 years since your last government loan before applying for PM SVANidhi');
    }

    // Determine overall status
    let status: 'eligible' | 'partially-eligible' | 'ineligible';
    if (scorePercentage >= 80) {
      status = 'eligible';
    } else if (scorePercentage >= 50) {
      status = 'partially-eligible';
    } else {
      status = 'ineligible';
    }

    setResult({
      status,
      score: scorePercentage,
      eligibleSchemes: [...new Set(eligibleSchemes)], // Remove duplicates
      recommendations
    });
  };

  const isCheckDisabled = Object.keys(answers).length !== questions.length;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'eligible':
        return { icon: CheckCircle, color: 'text-green-400', bg: 'bg-green-500/10', border: 'border-green-400/30' };
      case 'partially-eligible':
        return { icon: AlertTriangle, color: 'text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-400/30' };
      case 'ineligible':
        return { icon: XCircle, color: 'text-red-400', bg: 'bg-red-500/10', border: 'border-red-400/30' };
      default:
        return { icon: HelpCircle, color: 'text-slate-400', bg: 'bg-slate-500/10', border: 'border-slate-400/30' };
    }
  };

  return (
    <Card className="dark-modern-card mt-6 animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-white">
          <HelpCircle className="text-green-400" /> Enhanced Eligibility Check
        </CardTitle>
        <p className="text-sm text-slate-400">Answer all questions to get personalized scheme recommendations</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {questions.map(q => (
          <div key={q.id} className="space-y-3">
            <p className="font-medium text-slate-300 mb-2">{q.text}</p>
            {q.type === 'select' ? (
              <select 
                value={answers[q.id] || ''} 
                onChange={(e) => handleValueChange(q.id, e.target.value)}
                className="w-full p-2 bg-slate-700 border border-slate-600 rounded-md text-white focus:border-green-500"
              >
                <option value="">Select an option</option>
                {q.options?.map(option => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            ) : (
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
            )}
            <div className="flex flex-wrap gap-1">
              {q.schemes.map(scheme => (
                <Badge key={scheme} variant="outline" className="text-xs text-blue-300 border-blue-400/30">
                  {scheme}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-4">
        <Button onClick={checkEligibility} disabled={isCheckDisabled} className="w-full">
          Check Eligibility Now
        </Button>
        
        {result.status && (
          <div className="w-full space-y-4">
            <div className={`flex items-center gap-3 p-4 rounded-lg border ${getStatusConfig(result.status).bg} ${getStatusConfig(result.status).border}`}>
              {React.createElement(getStatusConfig(result.status).icon, {
                className: `h-6 w-6 ${getStatusConfig(result.status).color}`
              })}
              <div className="flex-1">
                <p className="font-semibold text-white">
                  Eligibility Score: {result.score}%
                </p>
                <p className={`text-sm ${getStatusConfig(result.status).color}`}>
                  {result.status === 'eligible' && 'Excellent! You qualify for multiple schemes.'}
                  {result.status === 'partially-eligible' && 'Good! You qualify for some schemes with improvements.'}
                  {result.status === 'ineligible' && 'Limited eligibility. Follow recommendations to improve.'}
                </p>
              </div>
            </div>

            {result.eligibleSchemes.length > 0 && (
              <div className="p-4 bg-green-500/10 rounded-lg border border-green-400/30">
                <h4 className="font-semibold text-green-400 mb-2">Eligible Schemes:</h4>
                <div className="flex flex-wrap gap-2">
                  {result.eligibleSchemes.map(scheme => (
                    <Badge key={scheme} className="bg-green-500/20 text-green-300 border-green-400/30">
                      {scheme}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {result.recommendations.length > 0 && (
              <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-400/30">
                <h4 className="font-semibold text-blue-400 mb-2">Recommendations:</h4>
                <ul className="space-y-1 text-sm text-slate-300">
                  {result.recommendations.map((rec, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-400 mt-1">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default EligibilityChecker;

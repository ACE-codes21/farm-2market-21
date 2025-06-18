
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { CheckCircle, HelpCircle, XCircle, AlertTriangle, Award, Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';

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
      eligibleSchemes: [...new Set(eligibleSchemes)],
      recommendations
    });
  };

  const isCheckDisabled = Object.keys(answers).length !== questions.length;
  const progressPercentage = (Object.keys(answers).length / questions.length) * 100;

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
    <div className="space-y-6 mt-6">
      {/* Header Card */}
      <Card className="dark-modern-card animate-fade-in bg-gradient-to-r from-slate-800/80 to-slate-700/80 backdrop-blur-lg border border-slate-600/50">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-3 text-xl text-white">
            <div className="p-2 rounded-lg bg-green-500/20">
              <Target className="h-6 w-6 text-green-400" />
            </div>
            Enhanced Eligibility Assessment
          </CardTitle>
          <p className="text-slate-300 leading-relaxed">
            Complete our comprehensive assessment to discover your eligibility for government schemes and receive personalized recommendations.
          </p>
          
          {/* Progress Bar */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Progress</span>
              <span className="text-slate-300">{Object.keys(answers).length}/{questions.length} completed</span>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-slate-700/50" />
          </div>
        </CardHeader>
      </Card>

      {/* Questions Card */}
      <Card className="dark-modern-card animate-fade-in">
        <CardContent className="p-6">
          <div className="grid gap-6">
            {questions.map((q, index) => (
              <div key={q.id} className="p-4 rounded-lg bg-slate-800/30 border border-slate-700/50 hover:border-slate-600/50 transition-all duration-200">
                <div className="flex items-start gap-3 mb-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-sm font-medium text-slate-300">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-200 mb-3 leading-relaxed">{q.text}</p>
                    
                    {q.type === 'select' ? (
                      <select 
                        value={answers[q.id] || ''} 
                        onChange={(e) => handleValueChange(q.id, e.target.value)}
                        className="w-full p-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white focus:border-green-500 focus:ring-2 focus:ring-green-500/20 transition-all"
                      >
                        <option value="">Select your income range</option>
                        {q.options?.map(option => (
                          <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                      </select>
                    ) : (
                      <RadioGroup 
                        onValueChange={(value) => handleValueChange(q.id, value)} 
                        className="flex gap-6"
                        value={answers[q.id] || ''}
                      >
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="yes" id={`${q.id}-yes`} className="border-slate-500 text-green-400" />
                          <Label htmlFor={`${q.id}-yes`} className="text-slate-300 cursor-pointer">Yes</Label>
                        </div>
                        <div className="flex items-center space-x-3">
                          <RadioGroupItem value="no" id={`${q.id}-no`} className="border-slate-500 text-red-400" />
                          <Label htmlFor={`${q.id}-no`} className="text-slate-300 cursor-pointer">No</Label>
                        </div>
                      </RadioGroup>
                    )}
                    
                    <div className="flex flex-wrap gap-2 mt-3">
                      {q.schemes.map(scheme => (
                        <Badge key={scheme} variant="outline" className="text-xs text-blue-300 border-blue-400/40 bg-blue-500/10 hover:bg-blue-500/20 transition-colors">
                          {scheme}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        
        <CardFooter className="p-6 pt-0">
          <Button 
            onClick={checkEligibility} 
            disabled={isCheckDisabled} 
            className="w-full h-12 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 text-white font-medium rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isCheckDisabled ? `Complete ${questions.length - Object.keys(answers).length} more questions` : 'Analyze My Eligibility'}
          </Button>
        </CardFooter>
      </Card>

      {/* Results Card */}
      {result.status && (
        <Card className="dark-modern-card animate-fade-in">
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Score Display */}
              <div className={`p-6 rounded-xl border-2 ${getStatusConfig(result.status).bg} ${getStatusConfig(result.status).border}`}>
                <div className="flex items-center gap-4 mb-4">
                  {React.createElement(getStatusConfig(result.status).icon, {
                    className: `h-8 w-8 ${getStatusConfig(result.status).color}`
                  })}
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-1">
                      Eligibility Score: {result.score}%
                    </h3>
                    <p className={`text-sm ${getStatusConfig(result.status).color}`}>
                      {result.status === 'eligible' && 'Excellent! You qualify for multiple schemes.'}
                      {result.status === 'partially-eligible' && 'Good! You qualify for some schemes with improvements.'}
                      {result.status === 'ineligible' && 'Limited eligibility. Follow recommendations to improve.'}
                    </p>
                  </div>
                </div>
                <Progress value={result.score} className="h-3" />
              </div>

              {/* Eligible Schemes */}
              {result.eligibleSchemes.length > 0 && (
                <div className="p-6 bg-green-500/10 rounded-xl border border-green-400/30">
                  <div className="flex items-center gap-2 mb-4">
                    <Award className="h-5 w-5 text-green-400" />
                    <h4 className="font-semibold text-green-400">You're Eligible For:</h4>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {result.eligibleSchemes.map(scheme => (
                      <div key={scheme} className="p-3 bg-green-500/20 rounded-lg border border-green-400/30">
                        <Badge className="bg-green-500/30 text-green-300 border-green-400/50 mb-2">
                          {scheme}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Recommendations */}
              {result.recommendations.length > 0 && (
                <div className="p-6 bg-blue-500/10 rounded-xl border border-blue-400/30">
                  <h4 className="font-semibold text-blue-400 mb-4 flex items-center gap-2">
                    <HelpCircle className="h-5 w-5" />
                    Improvement Recommendations:
                  </h4>
                  <div className="space-y-3">
                    {result.recommendations.map((rec, index) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-blue-500/5 rounded-lg">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs text-blue-400 font-medium">{index + 1}</span>
                        </div>
                        <span className="text-sm text-slate-300 leading-relaxed">{rec}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EligibilityChecker;

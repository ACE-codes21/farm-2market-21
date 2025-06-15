
import { CircleCheck, CircleX, type LucideIcon } from "lucide-react";

export interface LoanScheme {
  id: string;
  title: string;
  description: string;
  status: 'Approved' | 'Pending' | 'Not Applied';
}

export const loanSchemes: LoanScheme[] = [
  {
    id: 'pmsvanidhi',
    title: 'PM SVANidhi Scheme',
    description: 'Special micro-credit facility for street vendors.',
    status: 'Approved',
  },
  {
    id: 'mudra',
    title: 'Mudra Loan',
    description: 'Funding for non-corporate, non-farm small/micro enterprises.',
    status: 'Pending',
  },
  {
    id: 'standup',
    title: 'Stand-Up India',
    description: 'Promoting entrepreneurship among women and SC/ST communities.',
    status: 'Not Applied',
  },
];

export const creditScore = 780;

export const repaymentData = {
  installments: [
    { date: 'May 2025', status: 'Paid' as const },
    { date: 'Jun 2025', status: 'Paid' as const },
    { date: 'Jul 2025', status: 'Upcoming' as const },
    { date: 'Aug 2025', status: 'Upcoming' as const },
    { date: 'Sep 2025', status: 'Upcoming' as const },
  ],
  missedPayments: 0,
};

export const quickTips = [
  "Pay your loan EMIs on time to improve your credit score.",
  "Keep your credit utilization ratio low (under 30%).",
  "Regularly check your credit report for any errors.",
  "Avoid applying for multiple loans in a short period.",
  "A healthy mix of credit types can positively impact your score.",
];

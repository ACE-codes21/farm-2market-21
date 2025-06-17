
import { CircleCheck, CircleX, type LucideIcon } from "lucide-react";

export interface LoanScheme {
  id: string;
  title: string;
  description: string;
  status: 'Approved' | 'Pending' | 'Not Applied';
}

export interface VendorActivityData {
  totalOrders: number;
  returnRate: number;
  avgRating: number;
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

// Mock vendor activity data for trust level calculation
export const vendorActivityData: VendorActivityData = {
  totalOrders: 127,
  returnRate: 2.3,
  avgRating: 4.6
};

// Calculate trust level based on activity data
export const calculateTrustLevel = (activityData: VendorActivityData): number => {
  let trustLevel = 0;
  
  // Base trust from order count (0-2 stars)
  if (activityData.totalOrders >= 50) trustLevel += 1;
  if (activityData.totalOrders >= 100) trustLevel += 1;
  
  // Trust from low return rate (0-1 star)
  if (activityData.returnRate < 5) trustLevel += 1;
  
  // Trust from high rating (0-2 stars)
  if (activityData.avgRating >= 4.0) trustLevel += 1;
  if (activityData.avgRating >= 4.5) trustLevel += 1;
  
  return Math.min(trustLevel, 5);
};

export const trustLevel = calculateTrustLevel(vendorActivityData);

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

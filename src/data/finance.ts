
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

// Enhanced trust level calculation for real-time credibility
export const calculateTrustLevel = (activityData: VendorActivityData): number => {
  let trustLevel = 0;
  
  // Base trust from order count (0-2 stars)
  if (activityData.totalOrders >= 10) trustLevel += 1;
  if (activityData.totalOrders >= 50) trustLevel += 1;
  if (activityData.totalOrders >= 100) trustLevel += 1;
  
  // Trust from low return rate (0-1 star)
  if (activityData.returnRate < 5) trustLevel += 1;
  if (activityData.returnRate < 2) trustLevel += 1;
  
  // Trust from high rating (0-1 star)
  if (activityData.avgRating >= 4.0) trustLevel += 1;
  if (activityData.avgRating >= 4.5) trustLevel += 1;
  
  return Math.min(trustLevel, 5);
};

// Mock vendor activity data for demonstration
export const vendorActivityData: VendorActivityData = {
  totalOrders: 127,
  returnRate: 2.3,
  avgRating: 4.6
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
  "Complete orders on time to build buyer trust and improve your platform rating.",
  "Respond quickly to buyer messages - fast communication boosts your credibility score.",
  "Upload high-quality product photos to increase buyer confidence and trust.",
  "Maintain consistent product quality to reduce returns and improve trust rating.",
  "Engage with customer reviews professionally to show reliability.",
  "Keep your profile updated with accurate business information for better credibility."
];

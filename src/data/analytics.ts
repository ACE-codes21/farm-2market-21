
import { IndianRupee, Clock, Leaf, LucideIcon } from 'lucide-react';

export const salesSummary: {
  title: string;
  value: string;
  icon: LucideIcon;
  change?: string;
  changeType?: 'increase' | 'decrease';
}[] = [
  {
    title: "Today's Earnings",
    value: "₹2,450",
    change: "+12.5%",
    changeType: "increase",
    icon: IndianRupee,
  },
  {
    title: "Top Selling Product",
    value: "Organic Tomatoes",
    icon: Leaf,
  },
  {
    title: "Most Active Time",
    value: "4 PM - 7 PM",
    icon: Clock,
  },
];

export const timeAnalyticsData = {
  daily: [
    { name: 'Mon', revenue: 1200, items: 30 },
    { name: 'Tue', revenue: 1500, items: 35 },
    { name: 'Wed', revenue: 1300, items: 32 },
    { name: 'Thu', revenue: 1800, items: 45 },
    { name: 'Fri', revenue: 2200, items: 55 },
    { name: 'Sat', revenue: 2500, items: 60 },
    { name: 'Sun', revenue: 2300, items: 58 },
  ],
  weekly: [
    { name: 'Week 1', revenue: 8000, items: 200 },
    { name: 'Week 2', revenue: 9500, items: 240 },
    { name: 'Week 3', revenue: 8700, items: 220 },
    { name: 'Week 4', revenue: 11000, items: 280 },
  ],
  monthly: [
    { name: 'Jan', revenue: 35000, items: 900 },
    { name: 'Feb', revenue: 38000, items: 950 },
    { name: 'Mar', revenue: 42000, items: 1050 },
    { name: 'Apr', revenue: 40000, items: 1000 },
    { name: 'May', revenue: 45000, items: 1100 },
    { name: 'Jun', revenue: 48000, items: 1200 },
  ],
};

export const aiBusinessTips = [
    "Paneer sells best on weekends. Try adding a 'Fresh Batch' tag on Friday to boost sales.",
    "You've had fewer evening customers this week. Consider offering a small discount after 6 PM to attract more buyers.",
    "Your organic carrots are trending! Bundle them with tomatoes for a combo deal."
];

export const productTrends = [
  {
    id: 1,
    name: 'Organic Tomatoes',
    trend: 'Trending' as const,
    icon: '🔥',
    salesData: [ { day: 'M', sales: 5 }, { day: 'T', sales: 7 }, { day: 'W', sales: 6 }, { day: 'T', sales: 9 }, { day: 'F', sales: 12 }, { day: 'S', sales: 15 }, { day: 'S', sales: 14 } ],
    image: '/placeholder.svg'
  },
  {
    id: 2,
    name: 'Fresh Spinach',
    trend: 'Steady' as const,
    icon: '📈',
    salesData: [ { day: 'M', sales: 4 }, { day: 'T', sales: 4 }, { day: 'W', sales: 5 }, { day: 'T', sales: 4 }, { day: 'F', sales: 6 }, { day: 'S', sales: 7 }, { day: 'S', sales: 6 } ],
    image: '/placeholder.svg'
  },
  {
    id: 3,
    name: 'Cauliflower',
    trend: 'Low Demand' as const,
    icon: '⚠️',
    salesData: [ { day: 'M', sales: 2 }, { day: 'T', sales: 1 }, { day: 'W', sales: 2 }, { day: 'T', sales: 1 }, { day: 'F', sales: 2 }, { day: 'S', sales: 3 }, { day: 'S', sales: 2 } ],
    image: '/placeholder.svg'
  },
    {
    id: 4,
    name: 'Potatoes',
    trend: 'Trending' as const,
    icon: '🔥',
    salesData: [ { day: 'M', sales: 10 }, { day: 'T', sales: 12 }, { day: 'W', sales: 11 }, { day: 'T', sales: 14 }, { day: 'F', sales: 18 }, { day: 'S', sales: 20 }, { day: 'S', sales: 19 } ],
    image: '/placeholder.svg'
  }
];

export const predictiveInsight = {
    message: "Expected revenue boost this week: ~₹5,230 if current trends continue.",
};

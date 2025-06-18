
import { useQuery } from '@tanstack/react-query';
import { useTodaysEarnings } from './useTodaysEarnings';
import { useTopSellingProduct } from './useTopSellingProduct';
import { useActiveTimeAnalysis } from './useActiveTimeAnalysis';
import { useProductTrends } from './useProductTrends';

interface AITipsData {
  tips: string[];
}

const generateAITips = (
  earningsData: any,
  topProduct: any,
  activeTime: any,
  productTrends: any[]
): string[] => {
  const tips: string[] = [];
  
  // Earnings-based tips
  if (earningsData) {
    if (earningsData.changeType === 'decrease' && earningsData.percentageChange < -10) {
      tips.push("Your earnings dropped this week. Consider offering flash sales or bundle deals to boost revenue.");
    } else if (earningsData.changeType === 'increase' && earningsData.percentageChange > 20) {
      tips.push("Great job! Your earnings are up this week. Maintain this momentum by restocking popular items.");
    } else if (earningsData.todaysEarnings === 0) {
      tips.push("No sales today yet. Try promoting your best-selling items on social media to drive traffic.");
    } else if (earningsData.todaysEarnings > 0) {
      tips.push(`You've earned ₹${earningsData.todaysEarnings} today! Keep up the good work and consider expanding your product range.`);
    }
  }

  // Top product tips
  if (topProduct) {
    if (topProduct.category === 'vegetables') {
      tips.push(`${topProduct.name} is your top seller! Consider bundling it with complementary vegetables for higher order values.`);
    } else if (topProduct.category === 'fruits') {
      tips.push(`${topProduct.name} is trending! Promote seasonal fruit combos to maximize sales.`);
    } else {
      tips.push(`${topProduct.name} is performing well! Stock up and consider creating variations or combos.`);
    }
  }

  // Active time tips
  if (activeTime && activeTime.orderCount > 0) {
    const timeWindow = activeTime.timeWindow;
    if (timeWindow.includes('AM')) {
      tips.push(`Most customers order during ${timeWindow}. Consider promoting breakfast-friendly items during this time.`);
    } else if (timeWindow.includes('PM')) {
      tips.push(`Peak ordering time is ${timeWindow}. Stock up on dinner ingredients and offer quick meal solutions.`);
    }
  } else {
    tips.push("Try offering time-limited discounts during evening hours (6-8 PM) to boost orders.");
  }

  // Product trends tips
  if (productTrends && productTrends.length > 0) {
    const trendingProducts = productTrends.filter(p => p.trend === 'Trending');
    const lowDemandProducts = productTrends.filter(p => p.trend === 'Low Demand');
    
    if (trendingProducts.length > 0) {
      tips.push(`${trendingProducts[0].name} is trending! Increase stock and consider raising prices slightly.`);
    }
    
    if (lowDemandProducts.length > 0) {
      tips.push(`${lowDemandProducts[0].name} has low demand. Try offering it at a discount or in combo deals.`);
    }
  }

  // Time-based contextual tips
  const currentHour = new Date().getHours();
  const currentDay = new Date().getDay();
  
  if (currentHour < 10) {
    tips.push("Start your day strong! Post fresh produce photos to attract early morning shoppers.");
  } else if (currentHour > 18) {
    tips.push("Evening rush approaching! Ensure your delivery slots are available for dinner preparations.");
  }
  
  // Weekend vs weekday tips
  if (currentDay === 0 || currentDay === 6) {
    tips.push("Weekend shoppers love fresh produce! Highlight your freshest items and offer family-size portions.");
  } else {
    tips.push("Weekday customers need convenience! Offer pre-cut vegetables and ready-to-cook packages.");
  }

  // Seasonal tips based on month
  const currentMonth = new Date().getMonth();
  if (currentMonth >= 2 && currentMonth <= 4) { // Spring
    tips.push("Spring season is perfect for fresh leafy greens and early summer vegetables!");
  } else if (currentMonth >= 5 && currentMonth <= 7) { // Summer
    tips.push("Summer fruits are in high demand! Stock up on mangoes, watermelons, and seasonal produce.");
  } else if (currentMonth >= 8 && currentMonth <= 10) { // Monsoon/Fall
    tips.push("Monsoon season calls for fresh herbs and vegetables. Offer immunity-boosting produce.");
  } else { // Winter
    tips.push("Winter vegetables are popular! Focus on root vegetables and seasonal produce.");
  }

  // Default tips if no specific data
  if (tips.length === 0) {
    tips.push(
      "Focus on quality over quantity. Fresh, high-quality produce builds customer loyalty.",
      "Engage with customers through photos of your fresh harvests to build trust.",
      "Consider offering subscription boxes for regular customers to ensure steady income."
    );
  }

  // Return maximum 3 most relevant tips
  return tips.slice(0, 3);
};

export const useAIBusinessTips = () => {
  const { data: earningsData } = useTodaysEarnings();
  const { data: topProduct } = useTopSellingProduct();
  const { data: activeTime } = useActiveTimeAnalysis();
  const { data: productTrends } = useProductTrends();

  return useQuery({
    queryKey: ['ai-business-tips', earningsData, topProduct, activeTime, productTrends],
    queryFn: () => ({
      tips: generateAITips(earningsData, topProduct, activeTime, productTrends)
    }),
    enabled: true,
    refetchInterval: 60 * 60 * 1000, // Refetch every hour for fresh tips
  });
};

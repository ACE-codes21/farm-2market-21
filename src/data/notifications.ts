
import { LucideIcon } from "lucide-react";

export interface BuyerReview {
  id: string;
  buyerName: string;
  buyerTag?: "Top Buyer" | "First-time Buyer";
  productName: string;
  productImage: string;
  rating: number;
  feedback: string;
  timestamp: string;
}

export interface EmergencyAlert {
  id: string;
  type: "Theft Report" | "Weather Alert" | "Market Closure";
  message: string;
  timestamp: string;
}

export interface SystemNotification {
  id:string;
  title: string;
  description: string;
  timestamp: string;
  link?: string;
}

export const buyerReviews: BuyerReview[] = [
  {
    id: "review-1",
    buyerName: "Aisha Khan",
    buyerTag: "Top Buyer",
    productName: "Fresh Spinach",
    productImage: "/placeholder.svg",
    rating: 5,
    feedback: "The spinach was incredibly fresh and green. Best quality I've found in a while!",
    timestamp: "2 hrs ago",
  },
  {
    id: "review-2",
    buyerName: "Rohan Verma",
    buyerTag: "First-time Buyer",
    productName: "Organic Tomatoes",
    productImage: "/placeholder.svg",
    rating: 4,
    feedback: "Good quality tomatoes, but delivery was a bit late. Overall happy with the purchase.",
    timestamp: "5 hrs ago",
  },
  {
    id: "review-3",
    buyerName: "Anonymous Buyer",
    productName: "Carrots",
    productImage: "/placeholder.svg",
    rating: 5,
    feedback: "Sweet and crunchy carrots. Perfect for salads.",
    timestamp: "1 day ago",
  },
];

export const emergencyAlerts: EmergencyAlert[] = [
    {
      id: "alert-1",
      type: "Theft Report",
      message: "Theft reported in the west section of the market. Please be vigilant.",
      timestamp: "3 hrs ago",
    },
    {
      id: "alert-2",
      type: "Weather Alert",
      message: "Heavy rain expected tomorrow from 10 AM. Secure your stalls.",
      timestamp: "1 day ago",
    },
];

export const systemNotifications: SystemNotification[] = [
    {
      id: "sys-1",
      title: "New Loan Scheme Added",
      description: "The 'Agri-Growth' loan scheme is now available. Check eligibility in the Services tab.",
      timestamp: "2 days ago",
      link: "/vendor/services",
    },
    {
      id: "sys-2",
      title: "App Update Available",
      description: "Version 2.1 is here with performance improvements and new features.",
      timestamp: "3 days ago",
    },
    {
        id: "sys-3",
        title: "License Renewal Approved",
        description: "Your vendor license renewal has been approved. You can download the new license from the Services tab.",
        timestamp: "5 days ago",
        link: "/vendor/services",
    }
];

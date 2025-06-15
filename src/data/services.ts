
import { Banknote, FileText, Landmark, ShieldCheck, HeartHandshake, BadgeHelp } from 'lucide-react';
import React from 'react';

export interface Scheme {
  id: string;
  name: string;
  icon: React.ElementType;
  description: string;
  category: 'Loan' | 'License' | 'Welfare';
  link: string;
}

export interface Application {
    id: string;
    schemeName: string;
    status: 'Approved' | 'In Review' | 'Rejected';
    submittedDate: string;
    lastUpdate: string;
}

export interface Document {
    id: string;
    name: string;
    status: 'Verified' | 'Pending';
    uploadDate: string;
    previewUrl: string;
}

export const schemes: Scheme[] = [
  {
    id: 'svanidhi',
    name: 'PM SVANidhi',
    icon: Banknote,
    description: 'Micro-credit facility providing collateral-free loans up to ₹50,000 for street vendors.',
    category: 'Loan',
    link: '#',
  },
  {
    id: 'fssai',
    name: 'FSSAI Registration',
    icon: FileText,
    description: 'Mandatory license for food business operators to ensure food safety and standards.',
    category: 'License',
    link: '#',
  },
  {
    id: 'udyog',
    name: 'Udyog Aadhar',
    icon: Landmark,
    description: 'A government registration for MSMEs, providing a unique identity and access to benefits.',
    category: 'License',
    link: '#',
  },
  {
    id: 'pmsym',
    name: 'PM-SYM',
    icon: ShieldCheck,
    description: 'A voluntary and contributory pension scheme for unorganized workers, including vendors.',
    category: 'Welfare',
    link: '#',
  },
  {
    id: 'jan-dhan',
    name: 'Jan Dhan Yojana',
    icon: BadgeHelp,
    description: 'National mission for financial inclusion to ensure access to financial services.',
    category: 'Welfare',
    link: '#',
  },
  {
    id: 'mudra',
    name: 'Mudra Loan',
    icon: HeartHandshake,
    description: 'Loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises.',
    category: 'Loan',
    link: '#',
  },
];

export const applications: Application[] = [
    {
        id: 'app-1',
        schemeName: 'PM SVANidhi',
        status: 'Approved',
        submittedDate: '2025-05-20',
        lastUpdate: '2025-06-10'
    },
    {
        id: 'app-2',
        schemeName: 'FSSAI Registration',
        status: 'In Review',
        submittedDate: '2025-06-05',
        lastUpdate: '2025-06-12'
    },
    {
        id: 'app-3',
        schemeName: 'Mudra Loan',
        status: 'Rejected',
        submittedDate: '2025-05-15',
        lastUpdate: '2025-05-30'
    },
];

export const documents: Document[] = [
    {
        id: 'doc-1',
        name: 'Aadhaar Card.pdf',
        status: 'Verified',
        uploadDate: '2025-01-10',
        previewUrl: '/placeholder.svg'
    },
    {
        id: 'doc-2',
        name: 'Vendor License.pdf',
        status: 'Verified',
        uploadDate: '2025-02-15',
        previewUrl: '/placeholder.svg'
    },
    {
        id: 'doc-3',
        name: 'PAN Card.pdf',
        status: 'Pending',
        uploadDate: '2025-06-14',
        previewUrl: '/placeholder.svg'
    },
];

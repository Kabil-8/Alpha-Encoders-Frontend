export type ServiceCategory = 'core' | 'specialized' | 'optimization';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  slug: string;
  shortDesc: string;
  fullDesc: string;
  targetAudience: string;
  keyFeatures: string[];
  businessBenefits: string[];
  icon: string;
  category: ServiceCategory;
}

export interface ProjectMetrics {
  lighthousePerformance?: number;
  pageSpeed?: string;
  accessibility?: number;
  seoScore?: number;
  payloadSize?: string;
}

export interface ProjectItem {
  id: string;
  name: string;
  slug: string;
  industry: string;
  tagline: string;
  description: string;
  clientName?: string;
  clientFeedback?: string;
  projectBudget?: string;
  deliveryDuration?: string;
  completionDate?: string;
  services: string[];
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  verifiedResult?: string;
  featured: boolean;
  category: string;
  highlights: string[];
  architectureOverview: string;
  metrics?: ProjectMetrics;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserInquirySnapshot {
  inquiryId: string;
  websiteType: string;
  submittedAt: string;
  estimatedBudget?: string;
  completionTimeline?: string;
  status: string;
  description: string;
  requiredFeatures: string[];
}

export interface UserItem {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  company?: string;
  location?: string;
  role: 'client' | 'prospect' | 'lead' | 'vip';
  status: 'active' | 'in_discussion' | 'completed' | 'onboarding';
  totalInquiries: number;
  totalEstimatedValue: number;
  currency: string;
  notes: string;
  websiteTypes: string[];
  associatedProjects: string[];
  inquiryHistory: UserInquirySnapshot[];
  createdAt: string;
  lastActiveAt: string;
  liveInquiries?: any[];
}

export interface ProcessStage {
  number: string;
  title: string;
  timeline: string;
  summary: string;
  deliverables: string[];
  clientInvolvement: string;
  technicalFocus: string;
}

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  company: string;
  websiteType: string;
  requiredFeatures: string[];
  estimatedBudget: string;
  completionTimeline: string;
  description: string;
  honeypot?: string;
}

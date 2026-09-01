export interface SkillItem {
  name: string;
  percentage: number;
}

export interface SiteSettings {
  _id?: string;
  // Identity & Branding
  siteName: string;
  consultantName: string;
  consultantInitials?: string;
  consultantPhoto?: string;
  logoUrl?: string;
  faviconUrl?: string;
  tagline: string;
  locationBadge?: string;
  experienceBadge?: string;

  // Hero Section
  heroBadge?: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroPrimaryCtaText?: string;
  heroPrimaryCtaUrl?: string;
  heroSecondaryCtaText?: string;
  heroSecondaryCtaUrl?: string;
  heroCounters: {
    clientsServed: number;
    yearsExperience: number;
    fiveStarReviews: number;
    revenueGenerated: string;
  };

  // About & Bio Section
  aboutBadge?: string;
  aboutHeading?: string;
  aboutBioParagraph1?: string;
  aboutBioParagraph2?: string;
  aboutCredentials?: string[];
  aboutSkills?: SkillItem[];

  // Why Choose Us Section
  whyChooseBadge?: string;
  whyChooseHeading?: string;
  whyChooseSubheading?: string;

  // CTA Section
  ctaAuditHeading?: string;
  ctaAuditSubheading?: string;
  whatsappCtaText?: string;

  // Contact Channels
  contactEmail: string;
  contactPhone: string;
  whatsappNumber: string;
  address: string;
  socialLinks: {
    linkedin: string;
    twitter: string;
    github: string;
    youtube: string;
  };

  // SEO
  globalSeo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImageUrl: string;
  };
}

export interface Service {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  order: number;
  featured: boolean;
  deliverables: string[];
  benefits: string[];
  targetAudience: string;
  startingPrice: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface MetricPair {
  label: string;
  before: string;
  after: string;
  change: string;
}

export interface CaseStudy {
  _id: string;
  title: string;
  slug: string;
  client: string;
  clientIndustry: string;
  timeframe: string;
  summary: string;
  challenge: string;
  strategy: string;
  execution: string[];
  results: string[];
  metrics: MetricPair[];
  coverImage: string;
  testimonialQuote?: string;
  testimonialAuthor?: string;
  featured: boolean;
  order: number;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface Testimonial {
  _id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  initials: string;
  location: string;
  rating: number;
  quote: string;
  metricHighlight?: string;
  serviceProvided?: string;
  featured: boolean;
  order: number;
}

export interface PricingPlan {
  _id: string;
  name: string;
  badge?: string;
  priceMonthly: number;
  priceQuarterly: number;
  description: string;
  features: string[];
  notIncluded?: string[];
  ctaText: string;
  ctaUrl: string;
  popular: boolean;
  order: number;
}

export interface BlogPost {
  _id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  readTimeMinutes: number;
  tags: string[];
  status: 'draft' | 'published';
  publishedAt: string;
  seo?: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
  };
}

export interface FAQ {
  _id: string;
  question: string;
  answer: string;
  category: string;
  order: number;
}

export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';

export interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  websiteUrl?: string;
  serviceNeeded: string;
  monthlyBudget?: string;
  message: string;
  status: LeadStatus;
  notes?: string;
  source?: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

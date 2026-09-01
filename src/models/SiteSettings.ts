import mongoose, { Document, Schema, Model } from 'mongoose';

export interface ISiteSettings extends Document {
  siteName: string;
  consultantName: string;
  consultantInitials?: string;
  consultantPhoto?: string;
  logoUrl?: string;
  faviconUrl?: string;
  tagline: string;
  locationBadge?: string;
  experienceBadge?: string;

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

  aboutBadge?: string;
  aboutHeading?: string;
  aboutBioParagraph1?: string;
  aboutBioParagraph2?: string;
  aboutCredentials?: string[];
  aboutSkills?: { name: string; percentage: number }[];

  whyChooseBadge?: string;
  whyChooseHeading?: string;
  whyChooseSubheading?: string;

  ctaAuditHeading?: string;
  ctaAuditSubheading?: string;
  whatsappCtaText?: string;

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
  globalSeo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImageUrl: string;
  };
}

const SiteSettingsSchema: Schema<ISiteSettings> = new Schema(
  {
    siteName: { type: String, default: 'Alex Rivera | Growth Consulting' },
    consultantName: { type: String, default: 'Alex Rivera' },
    consultantInitials: { type: String, default: 'AR' },
    consultantPhoto: {
      type: String,
      default: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
    },
    logoUrl: { type: String, default: '' },
    faviconUrl: { type: String, default: '' },
    tagline: { type: String, default: 'Senior Growth & Technical SEO Consultant' },
    locationBadge: { type: String, default: 'San Francisco & Worldwide' },
    experienceBadge: { type: String, default: '10+ Years Growth Engineering' },

    heroBadge: { type: String, default: 'Available for Q3/Q4 Advisory & Retainers' },
    heroHeadline: { type: String, default: 'Scale Organic Search & High-Intent Pipeline by 300%+' },
    heroSubheadline: {
      type: String,
      default:
        'Battle-tested Technical SEO, Paid Performance, and Conversion Architecture for high-growth B2B, SaaS, and D2C brands. Zero agency fluff — direct senior consultant execution.',
    },
    heroPrimaryCtaText: { type: String, default: 'Claim Free 20-Point Audit' },
    heroPrimaryCtaUrl: { type: String, default: '/#audit-form' },
    heroSecondaryCtaText: { type: String, default: 'Explore Case Studies' },
    heroSecondaryCtaUrl: { type: String, default: '/case-studies' },
    heroCounters: {
      clientsServed: { type: Number, default: 160 },
      yearsExperience: { type: Number, default: 10 },
      fiveStarReviews: { type: Number, default: 99 },
      revenueGenerated: { type: String, default: '$48M+' },
    },

    aboutBadge: { type: String, default: 'ABOUT THE CONSULTANT' },
    aboutHeading: { type: String, default: 'A Direct Senior Partner For Ambitious Scale-Ups' },
    aboutBioParagraph1: {
      type: String,
      default:
        'I am Alex Rivera, an independent growth engineer and technical SEO consultant. For over a decade, I have operated at the intersection of technical crawl architecture, performance paid advertising, and conversion rate optimization.',
    },
    aboutBioParagraph2: {
      type: String,
      default:
        'Unlike traditional agencies that pass your account to inexperienced coordinators, I personally architect and execute every growth initiative. My client partners get executive-level speed, absolute financial transparency, and predictable compounding pipeline.',
    },
    aboutCredentials: {
      type: [String],
      default: [
        'Google Premier Partner 2026',
        'Meta Certified Media Buying Expert',
        'HubSpot Inbound Marketing Leader',
      ],
    },
    aboutSkills: {
      type: [
        {
          name: { type: String },
          percentage: { type: Number },
        },
      ],
      default: [
        { name: 'Technical SEO & Crawl Architecture', percentage: 98 },
        { name: 'Google & Meta Performance Ad Scaling', percentage: 95 },
        { name: 'Conversion Rate Optimization (CRO) & UX', percentage: 92 },
        { name: 'High-Performance Next.js Engineering', percentage: 90 },
      ],
    },

    whyChooseBadge: { type: String, default: 'WHY PARTNER WITH A SENIOR CONSULTANT' },
    whyChooseHeading: { type: String, default: 'Agencies Sell You The VP, Then Assign You The Intern' },
    whyChooseSubheading: {
      type: String,
      default:
        'When you hire an agency, you pay for expensive overhead and get junior account managers. When you partner with me, you work directly with a 10-year veteran with over $48M in tracked revenue.',
    },

    ctaAuditHeading: { type: String, default: 'Ready to Uncover 300%+ High-Intent Search Pipeline?' },
    ctaAuditSubheading: {
      type: String,
      default:
        'Get a comprehensive 20-point technical crawl, schema audit, and competitor breakdown within 48 hours.',
    },
    whatsappCtaText: { type: String, default: 'Chat Directly on WhatsApp' },

    contactEmail: { type: String, default: 'alex@apexconsulting.com' },
    contactPhone: { type: String, default: '+1 (415) 890-3421' },
    whatsappNumber: { type: String, default: '+14158903421' },
    address: { type: String, default: '500 Howard Street, Suite 400, San Francisco, CA 94105' },
    socialLinks: {
      linkedin: { type: String, default: 'https://linkedin.com/in/alexriveragrowth' },
      twitter: { type: String, default: 'https://twitter.com/alexriveraseo' },
      github: { type: String, default: 'https://github.com/alexrivera' },
      youtube: { type: String, default: 'https://youtube.com/@alexriveragrowth' },
    },
    globalSeo: {
      metaTitle: {
        type: String,
        default: 'Alex Rivera | Senior SEO & Growth Marketing Consultant',
      },
      metaDescription: {
        type: String,
        default:
          'Transform your organic search visibility, reduce CAC, and scale conversion rates with bespoke marketing blueprints by Alex Rivera.',
      },
      keywords: {
        type: [String],
        default: ['SEO consultant', 'growth marketing', 'technical SEO audit', 'SaaS marketing', 'PPC management'],
      },
      ogImageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
      },
    },
  },
  { timestamps: true }
);

export const SiteSettings: Model<ISiteSettings> =
  mongoose.models.MarketingSiteSettings ||
  mongoose.model<ISiteSettings>('MarketingSiteSettings', SiteSettingsSchema, 'marketing_site_settings');

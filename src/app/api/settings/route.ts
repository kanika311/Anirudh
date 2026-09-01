import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { SiteSettings } from '@/models/SiteSettings';
import { verifyAuth } from '@/lib/auth';

export const dynamic = 'force-dynamic';

const DEFAULT_SETTINGS = {
  siteName: 'Alex Rivera | Growth & Technical SEO Consulting',
  consultantName: 'Alex Rivera',
  consultantInitials: 'AR',
  consultantPhoto: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=800&auto=format&fit=crop',
  logoUrl: '',
  tagline: 'Senior Growth & Technical SEO Consultant',
  locationBadge: 'San Francisco & Worldwide',
  experienceBadge: '10+ Years Growth Engineering',

  heroBadge: 'Available for Q3/Q4 Advisory & Retainers',
  heroHeadline: 'Scale Organic Search & High-Intent Pipeline by 300%+',
  heroSubheadline:
    'Battle-tested Technical SEO, Paid Performance, and Conversion Architecture for high-growth B2B, SaaS, and D2C brands. Zero agency fluff — direct senior consultant execution.',
  heroPrimaryCtaText: 'Claim Free 20-Point Audit',
  heroPrimaryCtaUrl: '/#audit-form',
  heroSecondaryCtaText: 'Explore Case Studies',
  heroSecondaryCtaUrl: '/case-studies',
  heroCounters: {
    clientsServed: 160,
    yearsExperience: 10,
    fiveStarReviews: 99,
    revenueGenerated: '$48M+',
  },

  aboutBadge: 'ABOUT THE CONSULTANT',
  aboutHeading: 'A Direct Senior Partner For Ambitious Scale-Ups',
  aboutBioParagraph1:
    'I am Alex Rivera, an independent growth engineer and technical SEO consultant. For over a decade, I have operated at the intersection of technical crawl architecture, performance paid advertising, and conversion rate optimization.',
  aboutBioParagraph2:
    'Unlike traditional agencies that pass your account to inexperienced coordinators, I personally architect and execute every growth initiative. My client partners get executive-level speed, absolute financial transparency, and predictable compounding pipeline.',
  aboutCredentials: [
    'Google Premier Partner 2026',
    'Meta Certified Media Buying Expert',
    'HubSpot Inbound Marketing Leader',
  ],
  aboutSkills: [
    { name: 'Technical SEO & Crawl Architecture', percentage: 98 },
    { name: 'Google & Meta Performance Ad Scaling', percentage: 95 },
    { name: 'Conversion Rate Optimization (CRO) & UX', percentage: 92 },
    { name: 'High-Performance Next.js Engineering', percentage: 90 },
  ],

  whyChooseBadge: 'WHY PARTNER WITH A SENIOR CONSULTANT',
  whyChooseHeading: 'Agencies Sell You The VP, Then Assign You The Intern',
  whyChooseSubheading:
    'When you hire an agency, you pay for expensive overhead and get junior account managers. When you partner with me, you work directly with a 10-year veteran with over $48M in tracked revenue.',

  ctaAuditHeading: 'Ready to Uncover 300%+ High-Intent Search Pipeline?',
  ctaAuditSubheading:
    'Get a comprehensive 20-point technical crawl, schema audit, and competitor breakdown within 48 hours.',
  whatsappCtaText: 'Chat Directly on WhatsApp',

  contactEmail: 'alex@apexconsulting.com',
  contactPhone: '+1 (415) 890-3421',
  whatsappNumber: '+14158903421',
  address: '500 Howard Street, Suite 400, San Francisco, CA 94105',
  socialLinks: {
    linkedin: 'https://linkedin.com/in/alexriveragrowth',
    twitter: 'https://twitter.com/alexriveraseo',
    github: 'https://github.com/alexrivera',
    youtube: 'https://youtube.com/@alexriveragrowth',
  },
  globalSeo: {
    metaTitle: 'Alex Rivera | Freelance SEO & Digital Marketing Consultant',
    metaDescription:
      'Transform your organic visibility, reduce customer acquisition costs (CAC), and scale ARR with data-driven Technical SEO, Paid Ads, and CRO blueprints.',
    keywords: [
      'SEO consultant',
      'freelance digital marketing',
      'technical SEO audit',
      'SaaS SEO strategy',
      'Google Ads specialist',
      'CRO consultant',
    ],
    ogImageUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
  },
};

export async function GET() {
  try {
    const conn = await connectDB();
    if (!conn) {
      return NextResponse.json({ success: true, data: DEFAULT_SETTINGS });
    }
    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(DEFAULT_SETTINGS);
    } else {
      const sObj = settings.toObject ? settings.toObject() : settings;
      if (!sObj.consultantName || !sObj.heroHeadline || !sObj.heroCounters?.clientsServed) {
        settings = await SiteSettings.findByIdAndUpdate(
          settings._id,
          { $set: { ...DEFAULT_SETTINGS, ...sObj } },
          { new: true }
        );
      }
    }
    return NextResponse.json({ success: true, data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: true, data: DEFAULT_SETTINGS });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authResult = await verifyAuth(request);
    if (!authResult) {
      return NextResponse.json({ success: false, message: 'Authentication required' }, { status: 401 });
    }

    const body = await request.json();
    const { _id, ...updateData } = body;
    const conn = await connectDB();

    if (!conn) {
      return NextResponse.json({ success: true, message: 'Settings saved in preview mode', data: updateData });
    }

    let settings = await SiteSettings.findOne();
    if (!settings) {
      settings = await SiteSettings.create(updateData);
    } else {
      settings = await SiteSettings.findByIdAndUpdate(settings._id, { $set: updateData }, {
        new: true,
        runValidators: false,
      });
    }

    return NextResponse.json({ success: true, message: 'Settings updated successfully', data: settings });
  } catch (error: any) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

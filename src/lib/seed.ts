import { connectDB } from './db';
import { Admin } from '../models/Admin';
import { SiteSettings } from '../models/SiteSettings';
import { Service } from '../models/Service';
import { CaseStudy } from '../models/CaseStudy';
import { Testimonial } from '../models/Testimonial';
import { PricingPlan } from '../models/PricingPlan';
import { BlogPost } from '../models/BlogPost';
import { FAQ } from '../models/FAQ';
import { Lead } from '../models/Lead';

export const seedDatabase = async (): Promise<void> => {
  try {
    console.log('🌱 Starting Database Seeding...');
    await connectDB();

    // 1. Admin
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@apexconsulting.com';
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123456';
    
    await Admin.deleteMany({});
    await Admin.create({
      email: adminEmail,
      password: adminPassword,
      name: 'Alex Rivera',
      role: 'admin',
    });
    console.log(`✅ Admin created: ${adminEmail}`);

    // 2. Site Settings
    await SiteSettings.deleteMany({});
    await SiteSettings.create({
      siteName: 'Alex Rivera | Growth & Technical SEO Consulting',
      consultantName: 'Alex Rivera',
      tagline: 'Senior Growth & Technical SEO Consultant',
      heroHeadline: 'Scale Organic Search & High-Intent Pipeline by 300%+',
      heroSubheadline:
        'Battle-tested Technical SEO, Paid Performance, and Conversion Architecture for high-growth B2B, SaaS, and D2C brands. Zero agency fluff — direct senior consultant execution.',
      heroCounters: {
        clientsServed: 160,
        yearsExperience: 10,
        fiveStarReviews: 99,
        revenueGenerated: '$48M+',
      },
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
    });
    console.log('✅ Site settings seeded');

    // 3. Services (6 core services)
    await Service.deleteMany({});
    await Service.create([
      {
        title: 'Technical & Organic SEO Domination',
        slug: 'seo',
        shortDescription:
          'Deep architectural audits, Core Web Vitals optimization, programmatic SEO, and high-authority link acquisition that drive predictable organic revenue.',
        fullDescription:
          'Comprehensive search engine optimization built for modern search engines. We reconstruct site architectures, fix crawl budget bottlenecks, optimize JavaScript rendering, and implement semantic topic clusters that capture high-intent buyers before your competitors do.',
        icon: 'Search',
        order: 1,
        featured: true,
        deliverables: [
          'Full-Stack 120-Point Technical SEO & Crawlability Audit',
          'High-Intent Keyword & Topic Cluster Mapping',
          'On-Page Semantic & Schema Markup Architecture',
          'Core Web Vitals & Speed Optimization (Sub-1s LCP)',
          'Editorial Content Briefs & Scalable Production Engine',
          'High-Authority White-Hat PR & Link Building Strategy',
        ],
        benefits: [
          'Zero reliance on volatile ad costs',
          'Compounds in value month-over-month',
          'Attracts purchase-ready decision makers',
          'Improves overall domain authority and trust',
        ],
        targetAudience: 'B2B SaaS, High-Ticket Service Providers, and E-Commerce Brands',
        startingPrice: '$3,500/mo',
        seo: {
          metaTitle: 'Technical SEO Consulting Services | Alex Rivera',
          metaDescription: 'Dominate organic search with senior Technical SEO audits, site speed optimization, and semantic topic cluster architecture.',
          keywords: ['technical SEO consultant', 'organic search strategy', 'SaaS SEO audit', 'Core Web Vitals'],
        },
      },
      {
        title: 'High-Impact Social Media Marketing',
        slug: 'social-media-marketing',
        shortDescription:
          'Build founder-led authority, viral organic distribution, and community-driven customer acquisition on LinkedIn, X/Twitter, and Instagram.',
        fullDescription:
          'Transform your brand from invisible to industry-leading. We engineer executive ghostwriting systems, short-form video strategies, and algorithmic distribution loops that turn passive impressions into qualified demo calls and signed contracts.',
        icon: 'Share2',
        order: 2,
        featured: true,
        deliverables: [
          'Founder Authority & Personal Brand Blueprints',
          'Omnichannel Content Calendar & Repurposing Engine',
          'High-Engagement Carousel & Visual Asset Design',
          'Community Engagement & Social Selling Inbound Funnels',
          'Viral Hook Testing & Engagement Rate Analytics',
        ],
        benefits: [
          'Builds unbreakable founder trust and brand affinity',
          'Dramatically lowers sales cycle friction',
          'Generates consistent inbound organic pipeline',
        ],
        targetAudience: 'Founders, VCs, B2B Executives, and Growth-Stage Tech Companies',
        startingPrice: '$2,800/mo',
        seo: {
          metaTitle: 'B2B Social Media Marketing & Founder Branding | Alex Rivera',
          metaDescription: 'Scale your personal brand and founder authority with battle-tested organic social media strategies.',
          keywords: ['social media marketing', 'founder branding', 'B2B LinkedIn strategy', 'organic social growth'],
        },
      },
      {
        title: 'Google & Meta Performance Ads',
        slug: 'paid-ads',
        shortDescription:
          'Laser-targeted paid search and conversion-engineered social ad campaigns with hyper-efficient ROAS and low customer acquisition costs.',
        fullDescription:
          'Stop burning capital on unoptimized ad spend. We structure high-converting Google Search intent funnels, Meta creative testing frameworks, and advanced retargeting matrixes that turn every advertising dollar into predictable enterprise pipeline.',
        icon: 'BarChart3',
        order: 3,
        featured: true,
        deliverables: [
          'Search Intent Structure (High-Value Commercial Keywords)',
          'Meta Video/Static Creative Testing Frameworks',
          'Server-Side CAPI & Offline Conversion Tracking',
          'Continuous Multivariate Ad Copy & LP Testing',
          'Omnichannel Retargeting & Churn Winback Sequences',
        ],
        benefits: [
          'Immediate, measurable pipeline and lead generation',
          'Predictable unit economics and blended CAC',
          'Continuous multivariate creative optimization',
        ],
        targetAudience: 'Direct-to-Consumer Brands & B2B SaaS with >$5k monthly ad budget',
        startingPrice: '$3,200/mo + % Ad Spend',
        seo: {
          metaTitle: 'PPC & Performance Paid Ads Management | Alex Rivera',
          metaDescription: 'Maximize ROAS with high-intent Google Ads and creative-led Meta ad campaigns managed directly by a senior growth consultant.',
          keywords: ['Google Ads consultant', 'Meta ads management', 'PPC agency alternative', 'ROAS optimization'],
        },
      },
      {
        title: 'Conversion-Focused Web Development',
        slug: 'web-development',
        shortDescription:
          'Blazing fast Next.js websites and landing pages engineered for maximum conversions, flawless Core Web Vitals, and effortless lead capture.',
        fullDescription:
          'Your website is your 24/7 sales representative. We engineer lightning-fast modern web applications built on Next.js, TypeScript, and Tailwind CSS that achieve 98+ Google PageSpeed scores and turn visitors into pipeline.',
        icon: 'Globe',
        order: 4,
        featured: true,
        deliverables: [
          'Custom Next.js & React High-Performance Architecture',
          'Mobile-First UI/UX Design System & Micro-Interactions',
          'Full Technical SEO & Structured Data Implementation',
          'Sub-Second Page Loads & 95+ Core Web Vitals',
          'CRM, Analytics & Webhook Automation Integration',
        ],
        benefits: [
          '2x to 4x higher visitor-to-lead conversion rates',
          'Instant page loads that minimize bounce rates',
          'Modern, luxury brand perception',
        ],
        targetAudience: 'Companies redesigning their web presence or launching new growth initiatives',
        startingPrice: '$4,500 one-time / custom',
        seo: {
          metaTitle: 'High-Converting Web Development & Next.js Design | Alex Rivera',
          metaDescription: 'Modern, high-performance website design engineered for conversion rate optimization and technical SEO excellence.',
          keywords: ['Next.js developer', 'high-converting web design', 'CRO web development', 'Core Web Vitals website'],
        },
      },
      {
        title: 'City-Specific & Local Dominance',
        slug: 'local-marketing',
        shortDescription:
          'Dominate local search map packs, hyper-targeted geo-landing pages, and neighborhood-level lead generation campaigns.',
        fullDescription:
          'Own your regional market. We build geo-targeted landing page architectures, optimize Google Business Profiles for map pack top rankings, and generate localized high-intent phone calls and store visits.',
        icon: 'MapPin',
        order: 5,
        featured: true,
        deliverables: [
          'Google Business Profile (GBP) 3-Pack Optimization',
          'Hyper-Local Schema & Geo-Coordinate Embedding',
          'Dynamic City & Neighborhood Landing Page Matrices',
          'Local Citation Clean-Up & Review Generation Systems',
          'Localized Google Local Services Ads (LSA) Setup',
        ],
        benefits: [
          'Capture local customers at exact moment of high intent',
          'Outrank entrenched regional competitors',
          'Drive direct phone calls, appointments, and foot traffic',
        ],
        targetAudience: 'Multi-Location Businesses, Law Firms, Clinics, and Regional Service Providers',
        startingPrice: '$2,200/mo',
        seo: {
          metaTitle: 'Local SEO & Multi-Location Growth Marketing | Alex Rivera',
          metaDescription: 'Rank in the top 3 Google Map pack and capture local market share with localized SEO strategies.',
          keywords: ['local SEO consultant', 'Google Map Pack ranking', 'multi-location SEO', 'local lead generation'],
        },
      },
      {
        title: 'Growth Advisory & Fractional CMO',
        slug: 'consulting',
        shortDescription:
          'Strategic executive advisory, marketing stack audits, attribution modeling, and team upskilling to unlock scalable growth.',
        fullDescription:
          'Get the executive leadership of a veteran Chief Marketing Officer at a fraction of the full-time executive salary. We audit your entire go-to-market engine, remove bottlenecks, and guide your internal team to victory.',
        icon: 'Compass',
        order: 6,
        featured: true,
        deliverables: [
          'Quarterly GTM & Omnichannel Growth Roadmap',
          'Full-Funnel CAC vs LTV Economics Modeling',
          'MarTech Stack & Multi-Touch Attribution Audits',
          'Bi-Weekly Strategic Leadership & Team Coaching Calls',
          'Direct Asynchronous Slack/WhatsApp Access for Founders',
        ],
        benefits: [
          'C-Suite strategic clarity without full-time overhead',
          'Empowers internal team with battle-tested frameworks',
          'Prevents costly marketing and vendor missteps',
        ],
        targetAudience: 'Seed to Series B Tech Startups & $1M–$15M ARR Founders',
        startingPrice: '$4,000/mo retainer',
        seo: {
          metaTitle: 'Fractional CMO & Growth Strategy Consulting | Alex Rivera',
          metaDescription: 'Strategic growth advisory and Fractional CMO services for ambitious tech founders and scale-ups.',
          keywords: ['fractional CMO', 'growth marketing consultant', 'GTM strategy advisor', 'marketing audit'],
        },
      },
    ]);
    console.log('✅ Services seeded');

    // 4. Case Studies (3 deep-dive case studies)
    await CaseStudy.deleteMany({});
    await CaseStudy.create([
      {
        title: 'Scaling CloudScale B2B SaaS from $1.2M to $4.8M ARR via Programmatic SEO',
        slug: 'cloudscale-saas-growth',
        client: 'CloudScale Technologies',
        clientIndustry: 'Cloud Infrastructure & DevOps SaaS',
        timeframe: '9 Months',
        summary:
          'How an architectural technical overhaul, programmatic integration directory, and conversion page redesign drove +340% organic pipeline and lowered CAC by 64%.',
        challenge:
          'CloudScale had plateaued at $1.2M ARR with customer acquisition costs escalating on Google Search Ads. Their previous agency created thin blog posts that ranked for zero commercial keywords, and their website suffered from severe Core Web Vitals issues.',
        strategy:
          'We designed a three-pronged growth initiative: 1) Re-architected Next.js site to achieve 99 PageSpeed; 2) Engineered a programmatic database of 450+ tool integration landing pages targeting high-intent developer keywords; 3) Overhauled the demo signup funnel with multivariate testing.',
        execution: [
          'Resolved 1,400+ crawl and indexing anomalies across their documentation subdomain',
          'Deployed programmatic comparison & integration template architecture',
          'Implemented custom JSON-LD SoftwareApplication schema across all feature sets',
          'Restructured demo booking flow to reduce form friction from 8 fields to 3 fields',
        ],
        results: [
          '340% increase in monthly qualified enterprise demo bookings',
          'Organic search traffic expanded from 14,000 to 185,000 monthly visits',
          'Blended customer acquisition cost reduced from $185 to $66',
          'Direct attributable ARR scaled by $3.6M within 9 months',
        ],
        metrics: [
          { label: 'Monthly Organic Traffic', before: '14.2K', after: '185.6K', change: '+1,207%' },
          { label: 'Qualified Demo Bookings', before: '42/mo', after: '185/mo', change: '+340%' },
          { label: 'Customer Acquisition Cost', before: '$185', after: '$66', change: '-64.3%' },
          { label: 'Attributable ARR', before: '$1.2M', after: '$4.8M', change: '+300%' },
        ],
        coverImage:
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200&auto=format&fit=crop',
        testimonialQuote:
          'Alex is the rarest kind of marketer — deeply technical, completely transparent, and obsessed with revenue metrics rather than vanity impressions. He single-handedly transformed our customer acquisition engine.',
        testimonialAuthor: 'Marcus Vance, CEO & Co-Founder at CloudScale',
        featured: true,
        order: 1,
        seo: {
          metaTitle: 'CloudScale SaaS Case Study | $1.2M to $4.8M ARR SEO Growth',
          metaDescription: 'Discover how technical SEO and programmatic landing pages generated +340% demo bookings for B2B SaaS.',
          keywords: ['SaaS SEO case study', 'programmatic SEO', 'B2B growth case study'],
        },
      },
      {
        title: 'Revamping Lumina Skin D2C: 8.4x ROAS & 420% Organic Revenue Growth',
        slug: 'lumina-skin-d2c-growth',
        client: 'Lumina Skin Science',
        clientIndustry: 'Clean Dermatology & E-Commerce',
        timeframe: '6 Months',
        summary:
          'Rebuilding creative-led Meta ad funnels and optimizing product category SEO to scale monthly online store revenue from $65k to $340k.',
        challenge:
          'Lumina Skin was struggling with high ad fatigue and Apple iOS 14.5+ attribution loss. Their Meta ROAS had plummeted to 1.4x, and their Shopify store had virtually zero non-branded organic traffic.',
        strategy:
          'We rebuilt their entire acquisition funnel with server-side CAPI tracking, instituted a rapid iterative creative testing matrix with UGC creators, and optimized their skincare collection pages with authoritative dermatological schema and semantic buying guides.',
        execution: [
          'Engineered a weekly 10-hook creative testing system producing high-performing video ads',
          'Implemented Klaviyo automated email flows for post-purchase retention and replenishment',
          'Structured collection pages for high-volume problem-solution keywords (e.g., "retinol for sensitive skin")',
          'Optimized mobile checkout speed and added 1-click upsell logic',
        ],
        results: [
          'Meta Ad blended ROAS scaled from 1.4x to 4.8x across cold audiences',
          'Non-branded organic search traffic grew by 420%',
          'Average Order Value (AOV) increased from $54 to $88 via post-purchase funnels',
          'Monthly recurring revenue jumped from $65,000 to over $340,000',
        ],
        metrics: [
          { label: 'Blended Paid ROAS', before: '1.4x', after: '4.8x', change: '+242%' },
          { label: 'Monthly Store Revenue', before: '$65K', after: '$340K', change: '+423%' },
          { label: 'Organic Search Revenue', before: '$8.2K', after: '$62K', change: '+656%' },
          { label: 'Average Order Value', before: '$54', after: '$88', change: '+63%' },
        ],
        coverImage:
          'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
        testimonialQuote:
          'Working with Alex gave us agency-level speed with the precision and accountability of an internal executive. Our revenue quadrupled in 6 months.',
        testimonialAuthor: 'Elena Rostova, Founder & CMO at Lumina Skin',
        featured: true,
        order: 2,
        seo: {
          metaTitle: 'Lumina Skin D2C E-Commerce Case Study | Alex Rivera',
          metaDescription: 'See how paid performance ads and e-commerce SEO scaled direct-to-consumer store revenue by 420%.',
          keywords: ['e-commerce case study', 'ROAS scale case study', 'Shopify SEO'],
        },
      },
      {
        title: 'Apex Health Network: Dominating Local Search Across 14 Medical Clinics',
        slug: 'apex-health-local-seo',
        client: 'Apex Specialized Health',
        clientIndustry: 'Private Healthcare & Specialized Clinics',
        timeframe: '5 Months',
        summary:
          'How multi-location Google Business Profile optimization and localized medical landing pages drove +520% high-value patient appointments.',
        challenge:
          'A multi-facility medical network was losing market share to regional hospital networks. Their Google Maps listings were improperly consolidated, and patients were unable to easily find neighborhood specialized doctors.',
        strategy:
          'Executed a localized SEO rollout across 14 geographic territories, optimized Google Business Profiles for high-value treatment keywords, built dedicated doctor credential pages with Physician schema, and deployed targeted Local Services Ads.',
        execution: [
          'Consolidated and verified 14 Google Business Profiles with accurate geo-fencing',
          'Authored 45 localized service pages with verified physician medical reviews',
          'Streamlined online booking modal directly integrated into Google search results',
          'Established an automated SMS post-appointment Google review generation system',
        ],
        results: [
          'Ranked in top 3 Google Map pack for 88% of targeted regional medical keywords',
          'Direct online appointment bookings increased by 520%',
          'Generated over 650 verified 5-star Google reviews across clinic locations',
          'Cost per booked patient dropped from $142 to $38',
        ],
        metrics: [
          { label: 'Map Pack #1-3 Rankings', before: '12%', after: '88%', change: '+633%' },
          { label: 'Monthly Patient Bookings', before: '65', after: '403', change: '+520%' },
          { label: 'Verified 5-Star Reviews', before: '48', after: '650+', change: '+1,254%' },
          { label: 'Cost Per Acquired Patient', before: '$142', after: '$38', change: '-73.2%' },
        ],
        coverImage:
          'https://images.unsplash.com/photo-1504813184591-01572f98c85f?q=80&w=1200&auto=format&fit=crop',
        testimonialQuote:
          'Alex completely revolutionized our patient acquisition. We went from struggling to fill appointment slots to opening 2 new clinics to keep up with inbound demand.',
        testimonialAuthor: 'Dr. Arthur Sterling, Chief Medical Officer',
        featured: true,
        order: 3,
        seo: {
          metaTitle: 'Local SEO Case Study: 14 Clinic Medical Network Growth',
          metaDescription: 'Case study demonstrating how local SEO and Google Map pack optimization drove +520% booked appointments.',
          keywords: ['local SEO case study', 'medical marketing case study', 'Google Business Profile growth'],
        },
      },
    ]);
    console.log('✅ Case studies seeded');

    // 5. Testimonials
    await Testimonial.deleteMany({});
    await Testimonial.create([
      {
        name: 'David Chen',
        role: 'VP of Growth',
        company: 'HyperScale AI',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop',
        initials: 'DC',
        location: 'San Francisco, CA',
        rating: 5,
        quote:
          'Alex is the best technical growth consultant I have ever hired. In 4 months, he doubled our organic pipeline and fixed indexing issues our prior agency couldn’t diagnose for a year. He is direct, fast, and remarkably sharp.',
        metricHighlight: '+210% Organic Inbound Demos',
        serviceProvided: 'Technical SEO & Programmatic Pages',
        featured: true,
        order: 1,
      },
      {
        name: 'Sarah Jenkins',
        role: 'Founder & CEO',
        company: 'Nourish Botanicals',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&auto=format&fit=crop',
        initials: 'SJ',
        location: 'New York, NY',
        rating: 5,
        quote:
          'His paid media framework took our Meta ROAS from break-even to 5.2x in 90 days. What sets Alex apart is that you work directly with him — no juniors, no excuses, just relentless weekly execution.',
        metricHighlight: '5.2x Meta ROAS Scaled',
        serviceProvided: 'Performance Paid Ads & CRO',
        featured: true,
        order: 2,
      },
      {
        name: 'Michael Alvarez',
        role: 'Managing Partner',
        company: 'Alvarez & Partners Law',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop',
        initials: 'MA',
        location: 'Austin, TX',
        rating: 5,
        quote:
          'Alex put our firm in the top 3 Google Map pack across Austin and Dallas. Our high-value case inquiries tripled within 60 days. The ROI on his retainer has been beyond 10x.',
        metricHighlight: '+340% High-Intent Retainers',
        serviceProvided: 'Local SEO & Geo-Targeting',
        featured: true,
        order: 3,
      },
      {
        name: 'Emily Thornton',
        role: 'Head of Marketing',
        company: 'FinStack Software',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop',
        initials: 'ET',
        location: 'Boston, MA',
        rating: 5,
        quote:
          'Alex redesigned our landing page system in Next.js and restructured our copy. Conversion rate on our pricing page went from 2.1% to 6.8%. The guy is a pure revenue engine.',
        metricHighlight: '3.2x Conversion Rate Increase',
        serviceProvided: 'CRO & Web Development',
        featured: true,
        order: 4,
      },
      {
        name: 'Jonathan Reynolds',
        role: 'Chief Revenue Officer',
        company: 'Veloce Logistics',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop',
        initials: 'JR',
        location: 'Chicago, IL',
        rating: 5,
        quote:
          'If you are tired of agency account managers who hide behind buzzwords, hire Alex Rivera. His weekly reporting is crystal clear, and his strategies consistently produce enterprise revenue.',
        metricHighlight: '$2.4M Pipeline Generated',
        serviceProvided: 'Fractional Growth Advisory',
        featured: true,
        order: 5,
      },
    ]);
    console.log('✅ Testimonials seeded');

    // 6. Pricing Plans (3 tiers)
    await PricingPlan.deleteMany({});
    await PricingPlan.create([
      {
        name: 'Starter Growth',
        badge: 'Early Stage & Startups',
        priceMonthly: 2800,
        priceQuarterly: 2400,
        description: 'Ideal for early-stage companies and solo founders seeking focused SEO or Paid Ads acceleration.',
        features: [
          'Single Focus: Technical SEO OR Paid Ads Management',
          'Complete 120-point technical & competitor audit',
          'Monthly high-intent keyword & content roadmap',
          'Bi-weekly strategic sync calls (45 mins)',
          'Custom real-time Google Looker Studio dashboard',
          'Direct Slack channel support (48h response)',
        ],
        notIncluded: [
          'Full-funnel conversion rate optimization (CRO)',
          'Programmatic SEO landing page architecture',
          'Dedicated fractional CMO advisory',
        ],
        ctaText: 'Start with Starter Growth',
        ctaUrl: '/contact?plan=starter',
        popular: false,
        order: 1,
      },
      {
        name: 'Growth Accelerator',
        badge: 'Most Popular',
        priceMonthly: 4800,
        priceQuarterly: 4200,
        description: 'Our flagship full-stack growth program for scale-ups ready to dominate search and lower blended CAC.',
        features: [
          'Full-Stack Omnichannel: Technical SEO + Paid Ads + CRO',
          'Bespoke programmatic landing page architecture',
          'Next.js speed & Core Web Vitals optimization',
          'Weekly 1-on-1 sprint review calls',
          'Multivariate ad creative & landing page testing',
          'Direct WhatsApp & Priority Slack access (Same-day response)',
          'Dedicated custom attribution tracking & analytics setup',
        ],
        notIncluded: ['Full-time internal team management'],
        ctaText: 'Claim Accelerator Spot',
        ctaUrl: '/contact?plan=accelerator',
        popular: true,
        order: 2,
      },
      {
        name: 'Enterprise Domination',
        badge: 'High-Growth & Series A+',
        priceMonthly: 8500,
        priceQuarterly: 7500,
        description: 'Comprehensive fractional CMO partnership with full bespoke execution for market-leading enterprises.',
        features: [
          'Fractional CMO strategic leadership & GTM execution',
          'Multi-territory international & local SEO domination',
          'Custom Next.js web application & CRO engineering',
          'Unlimited ad spend management (Google, Meta, LinkedIn)',
          'Executive board-level weekly growth presentations',
          'Private 24/7 VIP WhatsApp direct hotline with Alex',
          'Quarterly on-site strategic planning sessions',
        ],
        notIncluded: [],
        ctaText: 'Schedule Executive Consultation',
        ctaUrl: '/contact?plan=enterprise',
        popular: false,
        order: 3,
      },
    ]);
    console.log('✅ Pricing plans seeded');

    // 7. Blog Posts (4 comprehensive marketing posts)
    await BlogPost.deleteMany({});
    await BlogPost.create([
      {
        title: 'The Modern Technical SEO Playbook for 2026: Cracking Core Web Vitals & AI Search',
        slug: 'modern-technical-seo-playbook-2026',
        category: 'SEO',
        excerpt:
          'Discover the exact technical audit checklist, crawl budget strategies, and semantic structured data architectures required to dominate Google and AI search engines.',
        content: `
## Why Technical SEO in 2026 is Completely Different

Search engines have evolved from keyword-matching algorithms into sophisticated neural semantic engines. With Google's continuous core updates and the rise of generative search overviews, standard meta tag tweaks are no longer enough.

To win top-tier organic rankings today, your site must excel across three foundational pillars:
1. **Sub-second Core Web Vitals performance (LCP < 1.2s, INP < 150ms)**
2. **Comprehensive semantic Schema graph architecture**
3. **Flawless crawl efficiency and JavaScript hydration**

---

### Pillar 1: Conquering the New Interaction to Next Paint (INP)

Interaction to Next Paint (INP) is now a decisive ranking factor. If your React or Next.js app has excessive main thread blocking time during user clicks, Google will deprioritize your URLs.

**Actionable steps to fix INP bottlenecks:**
- Avoid large monolithic bundle payloads by leveraging dynamic imports (\`next/dynamic\`).
- Offload non-critical third-party scripts (Hotjar, Google Tag Manager) using \`next/script\` with \`strategy="lazyOnload"\`.
- Profile rendering performance in Chrome DevTools under 4x CPU throttling to catch re-render lag.

---

### Pillar 2: Semantic Schema Markup & Knowledge Graphs

Search engines require explicit entity relationships to understand author expertise. By linking your articles to verified \`Person\` and \`Organization\` nodes, you establish authoritative topical leadership.

\`\`\`json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "The Modern Technical SEO Playbook for 2026",
  "author": {
    "@type": "Person",
    "name": "Alex Rivera",
    "jobTitle": "Senior Technical SEO Consultant"
  }
}
\`\`\`

---

### Summary Checklist for Growth Teams
- [x] Run deep Screaming Frog crawl simulating Googlebot Mobile
- [x] Audit server response time (TTFB < 200ms)
- [x] Validate all canonical tags and XML sitemaps
- [x] Implement structured data validation via Google Rich Results Test
        `,
        coverImage:
          'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1200&auto=format&fit=crop',
        author: {
          name: 'Alex Rivera',
          role: 'Senior Growth & SEO Consultant',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        },
        readTimeMinutes: 7,
        tags: ['Technical SEO', 'Core Web Vitals', 'Search Algorithms', 'Next.js'],
        status: 'published',
        publishedAt: new Date('2026-08-15'),
        seo: {
          metaTitle: 'Technical SEO Playbook 2026 | Alex Rivera',
          metaDescription: 'Master technical SEO, Core Web Vitals, and semantic schema architectures to dominate search rankings in 2026.',
          keywords: ['technical SEO 2026', 'Core Web Vitals guide', 'Schema markup tutorial', 'INP optimization'],
        },
      },
      {
        title: 'How We Cut B2B SaaS Customer Acquisition Cost by 64% with Programmatic SEO',
        slug: 'b2b-saas-programmatic-seo-cac-reduction',
        category: 'Strategy',
        excerpt:
          'A step-by-step breakdown of designing programmatic comparison matrices and tool integrations that convert high-intent tech buyers at scale.',
        content: `
## The Unsustainable Reality of $200+ Paid Clicks

When SaaS founders rely solely on Google Search Ads for keywords like *"best cloud migration software"*, they quickly find themselves bidding against venture-backed competitors paying $80–$250 per single click.

Programmatic SEO offers the sustainable counter-strategy: capturing hundreds of long-tail, high-intent searches simultaneously.

---

### Step 1: Mapping High-Intent Long-Tail Search Intent

Tech buyers rarely search only for generic terms. Instead, they search for:
- \`[Competitor A] vs [Competitor B]\`
- \`How to integrate [Tool] with [Framework]\`
- \`[Tool] alternatives for [Industry]\`

By building a structured database of 300+ integrations and competitor teardowns, you create dedicated landing pages that directly solve purchase queries.

---

### Step 2: Quality Control & Avoiding Thin Content Penalties

Google's Helpful Content System penalizes automated gibberish. Every programmatic page must include:
1. Unique verified feature comparison matrix
2. Authentic code samples or step-by-step setup guides
3. Interactive ROI calculation widget
4. Direct one-click free trial or demo CTA

---

### Key Takeaway
Programmatic SEO is not about spamming pages; it is about building programmatic **utility** that satisfies buyer intent instantly.
        `,
        coverImage:
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop',
        author: {
          name: 'Alex Rivera',
          role: 'Senior Growth & SEO Consultant',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        },
        readTimeMinutes: 6,
        tags: ['Programmatic SEO', 'SaaS Growth', 'CAC Reduction', 'B2B Marketing'],
        status: 'published',
        publishedAt: new Date('2026-08-20'),
        seo: {
          metaTitle: 'Cutting B2B SaaS CAC by 64% with Programmatic SEO',
          metaDescription: 'Learn how programmatic landing page architectures capture high-intent software buyers at a fraction of paid ad costs.',
          keywords: ['programmatic SEO case study', 'B2B SaaS CAC', 'SEO landing page strategy'],
        },
      },
      {
        title: '7 Landing Page CRO Mistakes That Are Silently Killing Your Conversion Rate',
        slug: 'landing-page-cro-mistakes-killing-conversions',
        category: 'CRO',
        excerpt:
          'Are your visitors bouncing without signing up? Here are the 7 most common conversion killers and how to fix them in 24 hours.',
        content: `
## Why High Traffic Means Nothing Without Conversion Architecture

Most marketing teams spend 95% of their budget driving traffic and only 5% optimizing the destination. If your landing page converts at 1.5% instead of 4.5%, you are tripling your customer acquisition cost for no reason.

---

### 1. The Vague Hero Headline
If a visitor cannot understand **what you do, who it is for, and why they should care** within 3 seconds, they will click the back button.

❌ *Bad:* "Revolutionizing the Future of Synergistic Workflow Solutions"  
✅ *Good:* "Automated SEO Audits for Shopify Stores: Boost Organic Revenue in 14 Days"

---

### 2. Multi-Step Form Friction
Every additional form field reduces conversion rate by 7% to 11%. If you don't need their fax number or company size upfront, remove it.

---

### 3. Lack of Verified Social Proof Above the Fold
Include micro-social proof immediately under your primary CTA button:
- ⭐️⭐️⭐️⭐️⭐️ *4.9/5 from 150+ verified founders*
- *"Helped scale $45M+ in tracked client revenue"*

---

### Summary
Test one variable at a time, optimize for mobile viewport scrolling, and focus on clear value over flashy gimmicks.
        `,
        coverImage:
          'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop',
        author: {
          name: 'Alex Rivera',
          role: 'Senior Growth & SEO Consultant',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        },
        readTimeMinutes: 5,
        tags: ['CRO', 'Landing Page Design', 'Conversion Optimization', 'A/B Testing'],
        status: 'published',
        publishedAt: new Date('2026-08-25'),
        seo: {
          metaTitle: '7 Landing Page CRO Mistakes Killing Your Conversions',
          metaDescription: 'Fix these 7 critical conversion rate optimization errors to immediately increase signups and sales.',
          keywords: ['CRO tips', 'landing page optimization', 'conversion rate improvements'],
        },
      },
      {
        title: 'Mastering Paid Ad Creative in the Post-iOS 14 Era: The Hook-Story-Offer Matrix',
        slug: 'paid-ad-creative-hook-story-offer-matrix',
        category: 'PPC',
        excerpt:
          'Algorithms now handle targeting. Creative is the new targeting. Here is our exact framework for creating ads that generate 4x+ ROAS.',
        content: `
## Why Creative is the Single Biggest Lever in Modern Paid Ads

With automated broad targeting on Meta Advantage+ and Google Performance Max, media buying tricks no longer provide an edge. The winners in 2026 are the brands with the most compelling ad creative.

---

### The 3-Part Creative Engine

1. **The 3-Second Visual Hook:** Stop the thumb scroll with pattern interruption (split screens, surprising statements, counter-intuitive data).
2. **The Relatable Problem Story:** Agitate the specific frustration your target customer experiences daily.
3. **The Irresistible Direct Offer:** Present a low-risk, high-value entry point (e.g., Free 20-Point Growth Audit, 14-day risk-free trial).

---

### Weekly Creative Iteration Cadence
Produce 3-5 variations of top-performing hooks every single Monday. Scale winning angles and aggressively prune underperformers.
        `,
        coverImage:
          'https://images.unsplash.com/photo-1533750516457-a7f992034fec?q=80&w=1200&auto=format&fit=crop',
        author: {
          name: 'Alex Rivera',
          role: 'Senior Growth & SEO Consultant',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
        },
        readTimeMinutes: 5,
        tags: ['PPC', 'Meta Ads', 'Paid Social', 'Creative Strategy'],
        status: 'published',
        publishedAt: new Date('2026-08-28'),
        seo: {
          metaTitle: 'Paid Ad Creative Strategy & High ROAS Framework | Alex Rivera',
          metaDescription: 'Learn the Hook-Story-Offer creative matrix to scale Meta and Google ad performance profitably.',
          keywords: ['Meta ad creative', 'PPC strategy', 'ROAS scale', 'paid social ads'],
        },
      },
    ]);
    console.log('✅ Blog posts seeded');

    // 8. FAQs (8 categorized questions)
    await FAQ.deleteMany({});
    await FAQ.create([
      {
        question: 'How is working with you different from hiring a traditional digital marketing agency?',
        answer:
          'When you hire a traditional agency, your account is typically sold by a senior executive and then handed off to junior account managers who juggle 15 other clients. With me, you get 100% direct senior consultant execution. Every strategy, audit, and campaign optimization is handled personally by me, with direct Slack and WhatsApp access.',
        category: 'Working Together',
        order: 1,
      },
      {
        question: 'How quickly can we expect to see tangible results from our SEO campaigns?',
        answer:
          'Technical fixes and Core Web Vitals optimizations often produce indexing and ranking improvements within 3 to 6 weeks. High-impact keyword ranking growth and substantial organic pipeline increases typically compound significantly between months 3 and 6.',
        category: 'SEO',
        order: 2,
      },
      {
        question: 'What is included in the Free 20-Point Growth & SEO Audit?',
        answer:
          'The Free Growth Audit is a comprehensive teardown of your current organic visibility, crawl errors, Core Web Vitals scores, competitor keyword gaps, and conversion funnel friction. You will receive an actionable Loom video walkthrough and a prioritized roadmap — completely free with zero high-pressure sales pitches.',
        category: 'Audits',
        order: 3,
      },
      {
        question: 'Do you require long-term lock-in contracts?',
        answer:
          'No. Most client engagements run on a flexible month-to-month retainer with a 30-day notice period. I believe in earning your business every single month through transparent reporting and measurable ROI.',
        category: 'Working Together',
        order: 4,
      },
      {
        question: 'What marketing budgets and tech stacks do you specialize in?',
        answer:
          'I specialize in B2B SaaS, E-Commerce, and high-ticket service companies with monthly growth budgets between $3,000 and $50,000+. On the technical side, I specialize in modern stacks including Next.js, React, WordPress, Webflow, Shopify, Google Ads, Meta Ads Manager, and Google Analytics 4.',
        category: 'General',
        order: 5,
      },
      {
        question: 'How do you handle reporting and communication?',
        answer:
          'You will have access to a custom real-time 24/7 Google Looker Studio dashboard tracking pipeline, organic keyword movements, and ROAS. In addition, we conduct bi-weekly or weekly sprint calls and maintain active daily communication via a private Slack channel or WhatsApp.',
        category: 'Working Together',
        order: 6,
      },
      {
        question: 'Can you help us build high-converting landing pages or redesign our website?',
        answer:
          'Yes! In addition to SEO and PPC, I build ultra-fast, conversion-optimized Next.js web applications and landing pages engineered specifically for high conversion rates and 95+ Core Web Vitals scores.',
        category: 'Web Dev & CRO',
        order: 7,
      },
      {
        question: 'How do we get started?',
        answer:
          'Simply fill out the free audit form on this page or book a strategy call. I will review your website and schedule a 30-minute discovery session to walk you through opportunities and determine if we are a great fit.',
        category: 'General',
        order: 8,
      },
    ]);
    console.log('✅ FAQs seeded');

    // 9. Sample Leads (3 leads for immediate admin dashboard preview)
    await Lead.deleteMany({});
    await Lead.create([
      {
        name: 'Alexander Wright',
        email: 'alexander@techflowsaas.io',
        phone: '+1 (415) 555-0199',
        websiteUrl: 'https://techflowsaas.io',
        serviceNeeded: 'Technical & Organic SEO Domination',
        monthlyBudget: '$5,000 - $10,000',
        message:
          'We just raised our Series A and need to scale our organic inbound demo bookings. Our previous agency was too slow. Want to explore a growth retainer starting next month.',
        status: 'new',
        source: 'Homepage Free Audit Form',
      },
      {
        name: 'Jessica Martinez',
        email: 'jessica@pureglowskincare.com',
        phone: '+1 (212) 555-0182',
        websiteUrl: 'https://pureglowskincare.com',
        serviceNeeded: 'Google & Meta Performance Ads',
        monthlyBudget: '$2,500 - $5,000',
        message:
          'Looking for a senior consultant to overhaul our Meta and Google Ads creative. Current ROAS is 1.8x, aiming to hit 4x+ for Q4 holiday season.',
        status: 'contacted',
        notes: 'Sent initial audit video on Aug 28. Follow-up meeting scheduled for Thursday.',
        source: 'Contact Page Direct',
      },
      {
        name: 'Robert Hastings',
        email: 'robert@hastingswealth.com',
        phone: '+1 (512) 555-0144',
        websiteUrl: 'https://hastingswealth.com',
        serviceNeeded: 'Conversion-Focused Web Development',
        monthlyBudget: '$10,000+',
        message:
          'Need a complete Next.js website rebuild and local SEO dominance across Austin and Dallas. Ready to kick off immediately.',
        status: 'in_progress',
        notes: 'Proposal sent for Enterprise Domination package.',
        source: 'WhatsApp Deep Link',
      },
    ]);
    console.log('✅ Sample leads seeded');

    console.log('🎉 Database seeding complete!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  }
};

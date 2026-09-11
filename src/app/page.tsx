import React from 'react';
import { api } from '@/lib/api';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { AboutBioSection } from '@/components/sections/AboutBioSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { ResultsMetrics } from '@/components/sections/ResultsMetrics';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { CaseStudiesShowcase } from '@/components/sections/CaseStudiesShowcase';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { PricingTable } from '@/components/sections/PricingTable';
import { ServiceAreaSection } from '@/components/sections/ServiceAreaSection';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { ContactSection } from '@/components/sections/ContactSection';
import { DualCtaBand } from '@/components/sections/DualCtaBand';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function HomePage() {
  const [
    settings,
    services,
    caseStudies,
    testimonials,
    pricingPlans,
    blogData,
    faqs,
  ] = await Promise.all([
    api.getSettings(),
    api.getServices(),
    api.getCaseStudies(),
    api.getTestimonials(),
    api.getPricingPlans(),
    api.getBlogPosts({ limit: 3 }),
    api.getFAQs(),
  ]);

  return (
    <div className="flex flex-col">
      {/* 1. Hero Section & Marquee Ticker */}
      <HeroSection settings={settings} />

      {/* 2. Services Grid (6 Cards) */}
      <ServicesGrid services={services} />

      {/* 3. About / Bio Section */}
      <AboutBioSection settings={settings} />

      {/* 4. Why Businesses Trust Us (Anirudh Advantage) */}
      <WhyChooseUs settings={settings} />

      {/* 5. Featured Case Studies */}
      <ResultsMetrics />

      {/* 6. Comparison Table (Better Than Agencies — Direct Expert Support) */}
      <ComparisonTable settings={settings} />

      {/* 7. 5-Step Process Timeline */}
      <ProcessTimeline />

      {/* 8. Real Growth, Real Clients Showcase */}
      <CaseStudiesShowcase caseStudies={caseStudies} />

      {/* 9. Verified Client Testimonials */}
      <TestimonialsCarousel testimonials={testimonials} settings={settings} />

      {/* 10. Transparent Pricing Packages */}
      <PricingTable plans={pricingPlans} />

      {/* 11. Service Areas (Lucknow & Kanpur) */}
      <ServiceAreaSection />

      {/* 12. Digital Marketing Blog Insights */}
      <BlogPreview posts={blogData.data} />

      {/* 13. FAQ Accordion & Quick WhatsApp Sidebar */}
      <FaqAccordion faqs={faqs} />

      {/* 14. Contact Section & Lead Capture Form */}
      <ContactSection settings={settings} services={services} />

      {/* 15. Floating WhatsApp, Conic Back-to-Top & Scroll Progress */}
      <DualCtaBand settings={settings} whatsappNumber={settings.whatsappNumber} />
    </div>
  );
}

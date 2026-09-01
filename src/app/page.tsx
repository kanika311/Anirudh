import React from 'react';
import { api } from '@/lib/api';
import { HeroSection } from '@/components/sections/HeroSection';
import { ServicesGrid } from '@/components/sections/ServicesGrid';
import { AboutBioSection } from '@/components/sections/AboutBioSection';
import { WhyChooseUs } from '@/components/sections/WhyChooseUs';
import { CaseStudiesShowcase } from '@/components/sections/CaseStudiesShowcase';
import { ComparisonTable } from '@/components/sections/ComparisonTable';
import { ProcessTimeline } from '@/components/sections/ProcessTimeline';
import { ResultsMetrics } from '@/components/sections/ResultsMetrics';
import { TestimonialsCarousel } from '@/components/sections/TestimonialsCarousel';
import { PricingTable } from '@/components/sections/PricingTable';
import { ServiceAreaSection } from '@/components/sections/ServiceAreaSection';
import { BlogPreview } from '@/components/sections/BlogPreview';
import { FaqAccordion } from '@/components/sections/FaqAccordion';
import { DualCtaBand } from '@/components/sections/DualCtaBand';
import { ContactSection } from '@/components/sections/ContactSection';

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
      {/* 1. Hero Section */}
      <HeroSection settings={settings} />

      {/* 2. Services Grid (6 Cards) */}
      <ServicesGrid services={services} />

      {/* 3. About / Bio Section */}
      <AboutBioSection settings={settings} />

      {/* 4. Why Choose Us */}
      <WhyChooseUs settings={settings} />

      {/* 5. Case Studies Showcase */}
      <CaseStudiesShowcase caseStudies={caseStudies} />

      {/* 6. Comparison Table (Me vs Agency) */}
      <ComparisonTable settings={settings} />

      {/* 7. 5-Step Process Timeline */}
      <ProcessTimeline />

      {/* 8. Results & Industry Snapshots */}
      <ResultsMetrics />

      {/* 9. Testimonials Carousel */}
      <TestimonialsCarousel testimonials={testimonials} settings={settings} />

      {/* 10. Pricing Table */}
      <PricingTable plans={pricingPlans} />

      {/* 11. Service Area & Local SEO */}
      <ServiceAreaSection />

      {/* 12. Blog Insights Preview */}
      <BlogPreview posts={blogData.data} />

      {/* 13. FAQ Accordion */}
      <FaqAccordion faqs={faqs} />

      {/* 14. Dual CTA Band */}
      <DualCtaBand settings={settings} whatsappNumber={settings.whatsappNumber} />

      {/* 15. Contact Section & Lead Capture Form */}
      <ContactSection settings={settings} services={services} />
    </div>
  );
}
